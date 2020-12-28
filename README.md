# Bivcore

**Infrastructure to build Bitcoin Value and blockchain-based applications for the next generation of financial technology.**

## Getting Started

### Requirements

- OS: ubuntu
- Bivcoin Core
- Python Environment
- Trusted P2P Peer
- MongoDB Server >= v3.4
- make g++ gcc
- PM2 (Optional)

### Checkout the repo


```sh
git clone https://git.ekoios.vn/blockchain-japan/bitcoin-value/biv-bivcore
git checkout master
npm install
```

## Setup Guide

### 1. Setup Bitcore config

<details>
<summary>Example bitcore.config.json</summary>
<br>

```json
{
  "bitcoreNode": {
    "modules": ["./bitcoin-value"],
    "services": {
      "api": {
        "wallets": {
          "allowCreationBeforeCompleteSync": true
        }
      }
    },
    "chains": {
      "BIV": {
        "mainnet": {
          "chainSource": "p2p",
          "trustedPeers": [
            {
              "host": "127.0.0.1",
              "port": 8339
            }
          ],
          "rpc": {
            "host": "127.0.0.1",
            "port": 8338,
            "username": "admin",
            "password": "1"
          }
        }
      }
    }
  }
}
```

</details>

### 2. Setup Bitcoin Node

<details>
<summary>Example Bitcoin Value Mainnet Config</summary>

```sh
server=1
whitelist=127.0.0.1
addnode=10.2.40.127
txindex=1
zmqpubrawtx=tcp://127.0.0.1:29338
zmqpubhashblock=tcp://127.0.0.1:29338
rpcbind=::
rpcallowip=0.0.0.0/0
rpcport=8338
rpcuser=admin
rpcpassword=1
uacomment=bitcoinvalue
```

</details>

### 3. Install packages

<details>
<summary> 3.1. Bivcore-node </summary>
<br>

```bash
cd packages/bivcore-node
npm install
```

</details>

<details>
<summary> 3.2. Insight </summary>
<br>

```bash
cd packages/insight
npm install
```

</details>

### 4. Setup pm2 (Optional)

<details>
<summary> Example of app.json </summary>
<br>

```json
{
  "apps": [
    {
      "name": "biv-node",
      "script": "npm start",
      "cwd": "packages/bitcore-node",
      "watch": false
    },
    {
      "name": "biv-insight",
      "script": "CHAIN=BIV NETWORK=mainnet npm run ionic:serve",
      "cwd": "packages/insight",
      "watch": false
    },
  ]
}
```

</details>

### 5. Start bivcore

<br>

```
bivcore
```

or

```
pm2 start app.json
```

## Applications

- [Bivcore Node](packages/bitcore-node) - A full node with extended capabilities using Bivcoin Core
- [Bitcore Wallet](packages/bitcore-wallet) - A command-line based wallet client
- [Bitcore Wallet Client](packages/bitcore-wallet-client) - A client for the wallet service
- [Bitcore Wallet Service](packages/bitcore-wallet-service) - A multisig HD service for wallets
- [Insight](packages/insight) - A blockchain explorer web user interface

## Libraries

- [Bitcore Lib Value](packages/bitcore-lib-value) - A pure and powerful JavaScript Bitcoin Value library
- [Bitcore P2P Value](packages/bitcore-p2p-value) - The peer-to-peer networking protocol for BIV
- [Bitcore Mnemonic](packages/bitcore-mnemonic) - Implements mnemonic code for generating deterministic keys
- [Crypto Wallet Core](packages/crypto-wallet-core) - A coin-agnostic wallet library for creating transactions, signing, and address derivation

## Contributing

See [CONTRIBUTING.md](https://github.com/bitpay/bivcore/blob/master/Contributing.md) on the main bivcore repo for information about how to contribute.
