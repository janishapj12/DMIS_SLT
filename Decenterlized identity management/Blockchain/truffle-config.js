module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Ganache GUI host
      port: 8545,            // Ganache GUI default port
      network_id: "1759381865560",       // Match any network ID
      gas: 6721975,          // Gas limit (safe default for Ganache)
      gasPrice: 20000000000, // 20 gwei
    },
  },

  // Configure Solidity compiler
  compilers: {
    solc: {
      version: "0.8.20",  // Use 0.8.x (must match your contract)
      settings: {
        optimizer: {
          enabled: true,  // Enable optimization for smaller bytecode
          runs: 200,
        },
      },
    },
  },

  db: {
    enabled: false,
  },
};
