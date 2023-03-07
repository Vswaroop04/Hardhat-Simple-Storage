const { ethers, run, network } = require('hardhat')
require('@nomiclabs/hardhat-etherscan')

async function main() {
  const SimpleStorage = await ethers.getContractFactory('SimpleStorage')

  console.log('Deploying SimpleStorage...')
  const simpleStorage = await SimpleStorage.deploy()
  await simpleStorage.deployed()

  console.log('SimpleStorage deployed to:', simpleStorage.address)
  console.log(process.env.ETHERSCAN_API_KEY)
  console.log(network.config.chainId)
  if (process.env.ETHERSCAN_API_KEY && network.config.chainId === 5) {
    await simpleStorage.deployTransaction.wait(5)
    await verify(simpleStorage.address, [])
  }

  const value = simpleStorage.retrieve()
  console.log('Value:', value)

  console.log('Setting value to 5...')
  const transresponse = await simpleStorage.store(5)
  transresponse.wait(1)
  const setvalue = simpleStorage.retrieve()
  console.log(`Value set to ${setvalue}`)
}

async function verify(contractaddress, args) {
  console.log('Verifying Contract ....')
  try {
    await run('verify:verify', {
      address: contractaddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Contract already verified')
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
