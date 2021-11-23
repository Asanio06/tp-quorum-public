// tag::quorum[]
var Web3 = require('web3');
// end::quorum[]

module.exports = {
  compilers: {
    solc: {
      version: '0.5.0'
    }
  },
  networks: {
    // tag::ganache[]
    ganache: {
      network_id: "*",
      gasPrice: 0,
      port: 7545,
      host: "localhost"
    },
    tenderly: {
      network_id: "*",
      gasPrice: 0,
      port: 9545,
      host: "localhost"
    },
    // end::ganache[]
    // tag::cooperative[]
    cooperative: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('https://e0ntm4hhnh:rMY7LcF1sO43cF7Jl-E4eNuN7mVsYEeuwz2rd4pNuys@e0hydn7pns-e0us4a4eb0-rpc.de0-aws.kaleido.io/'); //<1>
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
    // end::cooperative[]
    // tag::quorum[]
    eleveur_hauteluce_node: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('https://e0ntm4hhnh:rMY7LcF1sO43cF7Jl-E4eNuN7mVsYEeuwz2rd4pNuys@e0hydn7pns-e0sp21yihx-rpc.de0-aws.kaleido.io/');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
    eleveur_parly_node: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('https://e0ntm4hhnh:rMY7LcF1sO43cF7Jl-E4eNuN7mVsYEeuwz2rd4pNuys@e0hydn7pns-e0lyrv84rf-rpc.de0-aws.kaleido.io/');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
    eleveur_bastia_node: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('https://e0ntm4hhnh:rMY7LcF1sO43cF7Jl-E4eNuN7mVsYEeuwz2rd4pNuys@e0hydn7pns-e0u5e4es3n-rpc.de0-aws.kaleido.io/');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
    laiterie_beaufort_node: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('https://e0ntm4hhnh:rMY7LcF1sO43cF7Jl-E4eNuN7mVsYEeuwz2rd4pNuys@e0hydn7pns-e0yfeomisk-rpc.de0-aws.kaleido.io/');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    }
    // end::quorum[]
  }
};
