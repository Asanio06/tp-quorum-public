const credentials = require('../Helpers/Authentication')
const contracts = require('../Helpers/Contracts')
const Blockchain = require('../Helpers/BlockchainHelpers')
const ethers = require('ethers')

const FILTER_FROM_BLOCK = 204350

const getCheeses = async (participant) => {
  return []
}

const makeCheese = async (participant, quantity, milkDeliveries) => {
}

module.exports = {
  getCheeses,
  makeCheese
}
