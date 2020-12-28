import express = require('express');
const router = express.Router({ mergeParams: true });
import { ChainStateProvider } from '../../providers/chain-state';

function streamCoins(req, res) {
  let { address, chain, network } = req.params;
  let { unspent, limit = 10, since, coins } = req.query;
  let payload = {
    chain,
    network,
    address,
    req,
    res,
    args: { ...req.query, unspent, limit, since, coins }
  };
  ChainStateProvider.streamAddressTransactions(payload);
}

router.get('/:address', function(req, res) {
  let { address, chain, network } = req.params;
  let { unspent, limit = 10, since } = req.query;
  let payload = {
    chain,
    network,
    address,
    req,
    res,
    args: { unspent, limit, since }
  };
  ChainStateProvider.streamAddressUtxos(payload);
});

router.get('/:address/txs', streamCoins);
router.get('/:address/txs/count', function(req, res) {
  let { address, chain, network } = req.params;
  let { unspent, since, coins } = req.query;
  let payload = {
    chain,
    network,
    address,
    req,
    res,
    args: { ...req.query, unspent, since, coins }
  };
  ChainStateProvider.streamAddressTransactions(payload);
});
router.get('/:address/coins', streamCoins);

router.get('/:address/balance', async function(req, res) {
  let { address, chain, network } = req.params;
  try {
    let result = await ChainStateProvider.getBalanceForAddress({
      chain,
      network,
      address,
      args: req.query
    });
    return res.send(result || { confirmed: 0, unconfirmed: 0, unconfirmed_change: 0, balance: 0 });
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post('/:address/faucet', async function(req, res) {
  try {
    let { address, chain, network } = req.params;
    let { amount, ip } = req.body;
    let result = await ChainStateProvider.faucetCoin({ chain, network, address, ip, amount });
    if (result.error) {
      return res.send(result);
    }
    return res.send({ txid: result });
  } catch (err) {
    console.log(err);
    return res.send({ error: err.message });
  }
});

module.exports = {
  router,
  path: '/address'
};
