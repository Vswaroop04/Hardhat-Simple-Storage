require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */

const { ALCHEMY_API_KEY, GOERLI_PRIVATE_KEY } = process.env

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
}
