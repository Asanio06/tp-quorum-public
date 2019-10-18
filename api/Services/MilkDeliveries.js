const credentials = require('../Helpers/Authentication')
const contracts = require('../Helpers/Contracts')
const Blockchain = require('../Helpers/BlockchainHelpers')
const ethers = require('ethers')

const FILTER_FROM_BLOCK = 204350

const extractDeliveryApproval = async (participant, milkDeliveryID) => {
  let userAccountFrom = credentials.getPublicAddressFromName(participant)
  // console.log(`Transactions will be sent from '${participant}' having address '${userAccountFrom}'`)
  let MilkDelivery = await contracts.setupMilkDelivery(participant, userAccountFrom)
  let milkDelivery = await MilkDelivery.at(milkDeliveryID)
  const deliveryApproval = await milkDelivery.checkDeliveryApproval()
  // console.log(`Milk delivery received by dairy? ${deliveryApproval}`)
  return deliveryApproval
}

const extractConsumedStatus = async (participant, milkDeliveryID) => {
  let userAccountFrom = credentials.getPublicAddressFromName(participant)
  // console.log(`Transactions will be sent from '${participant}' having address '${userAccountFrom}'`)
  let MilkDelivery = await contracts.setupMilkDelivery(participant, userAccountFrom)
  let milkDelivery = await MilkDelivery.at(milkDeliveryID)
  const consumed = await milkDelivery.consumed()
  // console.log(`Milk delivery consumed? ${consumed}`)
  return consumed
}

const getMilkDeliveries = async (participant) => {
  try {
    console.log(`Searching for milk deliveries for '${participant}'`)
    const web3 = new ethers.providers.Web3Provider(await contracts.setupWeb3(participant))

    const milkDeliveredABI = ['event MilkDelivered(address indexed milkDeliveryAddress, address indexed milkProducer, address dairyAddress, uint32 liters, uint32 price)']
    const milkDeliveredInterface = new ethers.utils.Interface(milkDeliveredABI)

    const filter = {
      fromBlock: FILTER_FROM_BLOCK,
      toBlock: 'latest',
      topics: [ethers.utils.id('MilkDelivered(address,address,address,uint32,uint32)')]
    }
    let logs = await web3.getLogs(filter)

    let results = logs
      .map(log => {
        const blockNumber = log.blockNumber
        // parse log data
        let parsedLog = milkDeliveredInterface.parseLog(log)
        // console.log(log)
        // console.log(parsedLog)
        if (parsedLog === null) {
          console.error(`Unexpected empty log on block ${blockNumber}!`)
          return []
        }
        let milkProducer = credentials.getNameFromPublicAddress(parsedLog.values.milkProducer)
        let dairyName = credentials.getNameFromPublicAddress(parsedLog.values.dairyAddress)
        // console.log(milkProducer)
        return {
          'id': parsedLog.values.milkDeliveryAddress,
          'block': blockNumber,
          'from': milkProducer,
          'to': dairyName,
          'quantity': parsedLog.values.liters,
          'price': parsedLog.values.price
        }
      })

    for (let index = 0; index < results.length; index++) {
      const r = results[index]
      if (typeof r.id === 'undefined') {
        console.error(`[${index + 1}/${results.length}] Missing milk delivery ID. Ignoring...`)
        results.splice(index, 1)
        continue
      }
      console.debug(`[${index + 1}/${results.length}] Fetching details of '${r.id}' milk delivery...`)
      // extract block date from block number
      r.timestamp = await Blockchain.extractBlockDate(web3, r.block)
      // extract delivery approval status
      r.deliveryApproval = await extractDeliveryApproval(participant, r.id)
      // extract consumed status
      r.consumed = await extractConsumedStatus(participant, r.id)
      // pause for a while in order to avoid 'rate limit' errors from Kaleido
      await Blockchain.sleep(1000)
    }

    // console.log(results)
    return results
  } catch (e) {
    console.log(e)
    return {error: e}
  }
}

const createMilkDelivery = async (participant, quantity, price, dairy) => {
  try {
    // fetch Ethereum address of the participant
    const userAccountFrom = credentials.getPublicAddressFromName(participant)
    console.log(`Transactions will be sent from '${participant}' having address '${userAccountFrom}'`)

    // setup smart-contracts usage
    let addressBook = await contracts.getAddressBook(participant)
    let MilkDelivery = await contracts.setupMilkDelivery(participant, userAccountFrom)

    const dairyPublicAddress = credentials.getPublicAddressFromName(dairy)
    const dairyPrivateAddress = await addressBook.getQuorumAddress(dairy)
    const cooperativePrivateAddress = await addressBook.getQuorumAddress('Coopérative')
    console.log(`Resolved private Quorum address of '${dairy}' to '${dairyPrivateAddress}'`)

    console.log(`Deploying MilkDelivery smart-contract...`)
    let milkDelivery = await MilkDelivery.new(dairyPublicAddress, { privateFor: [dairyPrivateAddress, cooperativePrivateAddress] })
    console.log(`MilkDelivery contract deployed at ${milkDelivery.address}`)

    console.log(`Sending milk delivery transaction (quantity: ${quantity}, price: ${price})...`)
    const result = await milkDelivery.sendMilk(quantity, price, { privateFor: [dairyPrivateAddress, cooperativePrivateAddress] })

    console.log('Finished!')
    return {contract: milkDelivery.address, sendMilk: result}
  } catch (e) {
    console.log(e)
    return {error: e}
  }
}

const validateMilkDelivery = async (participant, milkDeliveryID) => {
  try {
    const userAccountFrom = credentials.getPublicAddressFromName(participant)
    let MilkDelivery = await contracts.setupMilkDelivery(participant, userAccountFrom)

    console.log(`Getting deployed version of MilkDelivery at address: '${milkDeliveryID}'...`)
    let milkDelivery = await MilkDelivery.at(milkDeliveryID)

    // fetch Quorum private address of the coopérative
    let addressBook = await contracts.getAddressBook(participant)
    const cooperativePrivateAddress = await addressBook.getQuorumAddress('Coopérative')

    // fetch Quorum private address of the milk producer
    let milkProducerPublicAddress = await milkDelivery.milkProducerAddress()
    console.log(`Milk producer public address: '${milkProducerPublicAddress}'`)
    const milkProducerPrivateAddress = await addressBook.getQuorumAddressFromName(milkProducerPublicAddress, {gas: 0xffffffff})
    console.log(`Milk producer private address: '${milkProducerPrivateAddress}'`)

    console.log('Validating milk delivery...')
    try {
      // milkProducerPrivateAddress
      await milkDelivery.validateDelivery({ privateFor: [milkProducerPrivateAddress, cooperativePrivateAddress] })
      console.log('Finished!')
      return {}
    } catch (e) {
      console.log(e)
      throw e
    }
  } catch (e) {
    console.log(e)
    return {error: e}
  }
}

module.exports = {
  getMilkDeliveries,
  createMilkDelivery,
  validateMilkDelivery
}
