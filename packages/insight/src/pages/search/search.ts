import { Component, Injectable } from '@angular/core';
import { Events, IonicPage, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import { ApiProvider, ChainNetwork } from '../../providers/api/api';
import { CurrencyProvider } from '../../providers/currency/currency';
import { PriceProvider } from '../../providers/price/price';
import { RedirProvider } from '../../providers/redir/redir';


@Injectable()
@IonicPage({
  name: 'search',
  segment: ':chain/:network/search'
})
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  public chain: string;
  public chainNetwork: ChainNetwork;
  public network: string;
  public availableNetworks;
  public matches;
  constructor(
    public navParams: NavParams,
    private apiProvider: ApiProvider,
    public events: Events,
    public currencyProvider: CurrencyProvider,
    public priceProvider: PriceProvider,
    public redirProvider: RedirProvider
  ) {
    const chain: string =
      this.navParams.get('chain') || this.apiProvider.getConfig().chain;
    const network: string =
      this.navParams.get('network') || this.apiProvider.getConfig().network;
    this.matches = this.navParams.get('matches');

    this.chainNetwork = {
      chain,
      network
    };

    this.apiProvider.changeNetwork(this.chainNetwork);
    if (!localStorage.getItem('currency')) {
      this.currencyProvider.setCurrency(this.chainNetwork);
      this.priceProvider.setCurrency(this.chainNetwork.chain.toUpperCase());
    } else {
      this.currencyProvider.setCurrency(this.chainNetwork, localStorage.getItem('currency'));
      this.priceProvider.setCurrency(localStorage.getItem('currency'));
    };
  }

  public goToBlock(e, block: any): void {
    if (e.ctrlKey) {
      return;
    }
    this.redirProvider.redir('block-detail', {
      blockHash: block.hash,
      chain: block.chain,
      network: block.network
    });
  }

  public goToTx(e, tx): void {
    if (e.ctrlKey) {
      return;
    }
    this.redirProvider.redir('transaction', {
      txId: tx.txid,
      chain: tx.chain,
      network: tx.network
    });
  }

  public goToAddress(e, addr): void {
    if (e.ctrlKey) {
      return;
    }
    this.redirProvider.redir('address', {
      addrStr: addr.address,
      chain: addr.chain,
      network: addr.network
    });
  }
}
