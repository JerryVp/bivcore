import { BaseModule } from '..';
import { BIVStateProvider } from '../../providers/chain-state/biv/biv';
import { BitcoinP2PWorker } from '../bitcoin/p2p';
import { VerificationPeer } from '../bitcoin/VerificationPeer';

export default class BIVModule extends BaseModule {
  constructor(services: BaseModule['bivcoreServices']) {
    super(services);
    services.Libs.register('BIV', '@sotatek-anhdao/bitcore-lib-value', '@sotatek-anhdao/bitcore-p2p-value');
    services.P2P.register('BIV', BitcoinP2PWorker);
    services.CSP.registerService('BIV', new BIVStateProvider());
    services.Verification.register('BIV', VerificationPeer);
  }
}
