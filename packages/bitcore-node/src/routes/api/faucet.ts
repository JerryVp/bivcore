import { Router } from 'express';
import { ChainStateProvider } from '../../providers/chain-state';
const router = Router({ mergeParams: true });

router.get('/', async function(req, res) {
  try {
    let { chain, network } = req.params;
    let result = await ChainStateProvider.getFaucetHistory({ chain, network });
    return res.send(result);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = {
  router,
  path: '/faucet'
};
