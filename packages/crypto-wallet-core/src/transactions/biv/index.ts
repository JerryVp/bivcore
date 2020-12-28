import { BTCTxProvider } from '../btc';

export class BIVTxProvider extends BTCTxProvider {
  lib = require('@sotatek-anhdao/bitcore-lib-value');
}
