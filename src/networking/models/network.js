export const networks = {
    eth: {
      name: "Ethereum",
      code: "ETH",
      getTxUrl(txHash) {
          return txHash ? `https://etherscan.io/tx/${txHash}` : null;
      }
    },
    bsc: {
      name: "Binance Smart Chain",
      code: "BNB",
      getTxUrl(txHash) {
          return txHash ? `https://bscscan.com/tx/${txHash}` : null;
      }
    },
    cosmos: {
      name: "Cosmos",
      code: "ATOM",
      getTxUrl(txHash) {
          return txHash ? `https://www.mintscan.io/cosmos/txs/${txHash}` : null;
      }
    },
    osmosis: {
      name: "Osmosis",
      code: "OSMO",
      getTxUrl(txHash) {
          return txHash ? `https://www.mintscan.io/osmosis/txs/${txHash}` : null;
      }
    },
    persistence: {
      name: "Persistence",
      code: "XPRT",
      getTxUrl(txHash) {
          return txHash ? `https://www.mintscan.io/persistence/txs/${txHash}` : null;
      }
    },
    secret: {
      name: "Secret",
      code: "SCRT",
      getTxUrl(txHash) {
          return txHash ? `https://www.mintscan.io/secret/txs/${txHash}` : null;
      }
    },
    juno: {
      name: "Juno",
      code: "JUNO",
      getTxUrl(txHash) {
          return txHash ? `https://www.mintscan.io/juno/txs/${txHash}` : null;
      }
    },
  };
