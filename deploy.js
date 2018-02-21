const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'test',
    'https://rinkeby.infura.io/6ztB38B0qhuJuFgKmEnt'
);

const web3 = new Web3(provider);

const INITIAL_MESSAGE = 'Hi there?! Why not?';

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ data: bytecode, arguments: [INITIAL_MESSAGE] })
      .send({ from: accounts[0], gas: '1000000'});

    console.log(result.options.address);
};

deploy();