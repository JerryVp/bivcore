import { Component, Injectable } from '@angular/core';
import { Events, IonicPage, NavParams } from 'ionic-angular';
import { AddressProvider } from '../../providers/address/address';
import { ApiProvider, ChainNetwork } from '../../providers/api/api';
import { CurrencyProvider } from '../../providers/currency/currency';
import { PriceProvider } from '../../providers/price/price';
import { TxsProvider } from '../../providers/transactions/transactions';

@Injectable()
@IonicPage({
  name: 'address',
  segment: ':chain/:network/address/:addrStr',
  defaultHistory: ['home']
})
@Component({
  selector: 'page-address',
  templateUrl: 'address.html'
})
export class AddressPage {
  public loading = true;
  public address: any = {};
  public noTransactions = 0;
  public errorMessage: string;
  public chainNetwork: ChainNetwork;

  private addrStr: string;

  constructor(
    public navParams: NavParams,
    public currencyProvider: CurrencyProvider,
    public txProvider: TxsProvider,
    private apiProvider: ApiProvider,
    private addrProvider: AddressProvider,
    private priceProvider: PriceProvider
  ) {
    this.addrStr = navParams.get('addrStr');

    const chain: string = navParams.get('chain');
    const network: string = navParams.get('network');

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

  public ionViewWillLoad(): void {
    this.addrProvider
      .getAddressActivityCoins(this.addrStr, this.chainNetwork)
      .subscribe(txidCoins => {
        this.noTransactions = txidCoins.txids.length;
      })

    this.addrProvider
      .getAddressBalance(this.addrStr, this.chainNetwork)
      .subscribe(
        data => {
          this.address = {
            balance: data.balance || 0,
            confirmed: data.confirmed || 0,
            unconfirmed: data.unconfirmed,
            unconfirmed_in: data.unconfirmed_in,
            unconfirmed_out: data.unconfirmed_out,
            addrStr: this.addrStr
          };
          this.loading = false;
        },
        err => {
          this.errorMessage = err;
          this.loading = false;
        }
      );
  }

  public getConvertedNumber(n: number): number {
    return this.currencyProvider.getConvertedNumber(n, this.chainNetwork.chain);
  }
}
