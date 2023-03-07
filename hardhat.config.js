require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()
require('@nomiclabs/hardhat-etherscan')
require('./tasks/block-number')
require('hardhat-gas-reporter')
require('solidity-coverage')

/** @type import('hardhat/config').HardhatUserConfig */

const {
  ALCHEMY_API_KEY,
  GOERLI_PRIVATE_KEY,
  ETHERSCAN_API_KEY,
  COIN_MARKET_CAP_API_KEY,
} = process.env

console.log(`https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`)

module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
      chainId: 5,
    },
  },
  solidity: '0.8.0',
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  gasReporter: {
    enabled: true,
    outputFile: 'gas-report.txt',
    nocolour: true,
    currency: 'INR',
    coinmarketcap: COIN_MARKET_CAP_API_KEY,
    token: 'MATIC',
  },
}
