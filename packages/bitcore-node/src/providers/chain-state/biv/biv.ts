import { BTCStateProvider } from '../btc/btc';

export class BIVStateProvider extends BTCStateProvider {
  constructor(chain: string = 'BIV') {
    super(chain);
  }
}
