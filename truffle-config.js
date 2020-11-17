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
        return new Web3.providers.HttpProvider('https://e0ak3iwzb9:j5TQxx5S7x6ydHE_mnBEQjEG4co03Hqerfru0hPyJmU@e0w8vemqcl-e0c7n7h8wc-rpc.de0-aws.kaleido.io'); //<1>
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
        return new Web3.providers.HttpProvider('https://e0ntae7woo:EZLW-XxO44RNi_t4Odu93igjCVZYbuo_RjuwdI0RkO4@e0w8vemqcl-e0jea6js1l-rpc.de0-aws.kaleido.io');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
    eleveur_parly_node: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('https://e0g33qalkr:P8jpK4uq5HO1ZgwZSNU-ZzNHGYjsacztlwzLh39rtgk@e0w8vemqcl-e0d5b8yfae-rpc.de0-aws.kaleido.io');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
    eleveur_bastia_node: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('https://e0ubbkazvx:yK8Syj0bGEP_uRPjSN2wHVsfcpsQsDe45rcSP6qRmq8@e0w8vemqcl-e0q4pk93ox-rpc.de0-aws.kaleido.io');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
    laiterie_beaufort_node: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('https://e0btt09xv7:Cwhn-hFg6ouoReZIxY2w-d8O6X9FvvnQd8qe0yQQpJc@e0w8vemqcl-e0xo0cgdmf-rpc.de0-aws.kaleido.io');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    }
    // end::quorum[]
  }
};
