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
        return new Web3.providers.HttpProvider('https://e0a6uqn6vu:DaaQaatwsUviPZaFZWG77GrFmDbWKch8Luo7e7EhGYU@e0blh9lwnn-e0dzr7l227-rpc.de0-aws.kaleido.io/'); //<1>
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
        return new Web3.providers.HttpProvider('https://e0a6uqn6vu:DaaQaatwsUviPZaFZWG77GrFmDbWKch8Luo7e7EhGYU@e0blh9lwnn-e0t2n4mhl5-rpc.de0-aws.kaleido.io/');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
    eleveur_parly_node: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('https://e0a6uqn6vu:DaaQaatwsUviPZaFZWG77GrFmDbWKch8Luo7e7EhGYU@e0blh9lwnn-e0wf3iowgh-rpc.de0-aws.kaleido.io/');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
    eleveur_bastia_node: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('https://e0a6uqn6vu:DaaQaatwsUviPZaFZWG77GrFmDbWKch8Luo7e7EhGYU@e0blh9lwnn-e0qgych2dq-rpc.de0-aws.kaleido.io/');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    },
    laiterie_beaufort_node: {
      provider: () => {
        // replace with your own credentials!
        return new Web3.providers.HttpProvider('https://e0a6uqn6vu:DaaQaatwsUviPZaFZWG77GrFmDbWKch8Luo7e7EhGYU@e0blh9lwnn-e0n5dt4j3h-rpc.de0-aws.kaleido.io/');
      },
      network_id: "*", // Match any network id
      gasPrice: 0,
      gas: 4500000,
      type: "quorum"
    }
    // end::quorum[]
  }
};
