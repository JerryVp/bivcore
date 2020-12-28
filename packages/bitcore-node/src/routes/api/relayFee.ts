import { Request, Response } from 'express';
import { ChainStateProvider } from '../../providers/chain-state';
import { CacheTimes } from '../middleware';
import { CacheMiddleware } from '../middleware';
const router = require('express').Router({ mergeParams: true });
const relayFeeCache = {};

router.get('/', CacheMiddleware(CacheTimes.Second), async (req: Request, res: Response) => {
  let { chain, network } = req.params;
  const cachedRelayFee = relayFeeCache[`${chain}:${network}`];
  if (cachedRelayFee && cachedRelayFee.date > Date.now() - 10 * 1000) {
    return res.json(cachedRelayFee.relayFee);
  }
  try {
    let networkInfo = await ChainStateProvider.getNetworkInfo({ chain, network });
    if (!networkInfo) {
      return res.status(404).send('not available right now');
    }
    const relayFee = networkInfo.relayfee;
    relayFeeCache[`${chain}:${network}`] = { relayFee, date: Date.now() };
    return res.json(relayFee);
  } catch (err) {
    return res.status(500).send('Error getting relay fee from RPC');
  }
});

module.exports = {
  router,
  path: '/relayfee'
};
