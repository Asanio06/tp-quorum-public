const credentials = require('../Helpers/Authentication')
const contracts = require('../Helpers/Contracts')
const Blockchain = require('../Helpers/BlockchainHelpers')
const ethers = require('ethers')

const FILTER_FROM_BLOCK = 0

const getCheeses = async (participant) => {
  return []
}

const makeCheese = async (participant, quantity, milkDeliveries) => {
  try {
    // fetch Ethereum address of the participant
    const userAccountFrom = credentials.getPublicAddressFromName(participant)
    console.log(`Transactions will be sent from '${participant}' having address '${userAccountFrom}'`)

    // setup smart-contracts usage
    let addressBook = await contracts.getAddressBook(participant)
    let DairyProduction = await contracts.setupDairyProduction(participant, userAccountFrom)

    // fetch private TX address of 'Coopérative'
    const cooperativePrivateAddress = await addressBook.getQuorumAddress('Coopérative')

    console.log(`Deploying DairyProduction smart-contract...`)
    let cheese = await DairyProduction.new(addressBook.address, { privateFor: [cooperativePrivateAddress] })
    console.log(`DairyProduction contract deployed at ${cheese.address}`)

    console.log(`Sending makeCheese() transaction (quantity: ${quantity}, milk deliveries: ${milkDeliveries})...`)
    const result = await cheese.makeCheese(quantity, milkDeliveries, { privateFor: [cooperativePrivateAddress] })

    console.log('Finished!')
    return {contract: cheese.address, makeCheese: result}
  } catch (e) {
    console.log(e)
    return {error: e}
  }
}

module.exports = {
  getCheeses,
  makeCheese
}
