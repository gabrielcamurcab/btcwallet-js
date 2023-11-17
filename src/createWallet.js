const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// definir a rede
// bitcoin - rede principal
// testnet - rede de testes
const network = bitcoin.networks.testnet;

// derivação de carteiras HD
const path = `m/49'/1'/0'/0`;

// geração de mnemonic
let mnemonic = bip39.generateMnemonic();

// criação de seed
const seed = bip39.mnemonicToSeedSync(mnemonic);

// criação da raiz da carteira
let root = bip32.fromSeed(seed, network);

// criação de conta - par pvtkey e pubkey
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

// geração de endereço
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address;

console.log("Carteira gerada com sucesso!");
console.log("Endereço: ", btcAddress);
console.log("Chave privada: ", node.toWIF());
console.log("Seed: ", mnemonic);