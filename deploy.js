const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'mnemonic', // replace with your own mnemonic
  'https://sepolia.infura.io/v3/apiKey' // replace with your own infura api key
);

const web3 = new Web3(provider);

const deploy = async () => {
  accounts = await web3.eth.getAccounts();

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['Hi there!']
    })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};

deploy();
