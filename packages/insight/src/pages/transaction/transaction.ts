import { Component, Injectable } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import _ from 'lodash';
import { ApiProvider, ChainNetwork } from '../../providers/api/api';
import { CurrencyProvider } from '../../providers/currency/currency';
import { PriceProvider } from '../../providers/price/price';
import { RedirProvider } from '../../providers/redir/redir';
import { TxsProvider } from '../../providers/transactions/transactions';

@Injectable()
@IonicPage({
  name: 'transaction',
  segment: ':chain/:network/tx/:txId',
  defaultHistory: ['home']
})
@Component({
  selector: 'page-transaction',
  templateUrl: 'transaction.html'
})
export class TransactionPage {
  public loading = true;
  public tx: any = {};
  public vout: number;
  public fromVout: boolean;
  public confirmations: number;
  public errorMessage: string;
  public chainNetwork: ChainNetwork;
  public prevPage: string;
  private txId: string;
  private DEFAULT_RBF_SEQNUMBER = 0xffffffff;

  constructor(
    public navParams: NavParams,
    public currencyProvider: CurrencyProvider,
    public redirProvider: RedirProvider,
    private apiProvider: ApiProvider,
    private priceProvider: PriceProvider,
    private txProvider: TxsProvider
  ) {
    this.txId = navParams.get('txId');
    this.vout = navParams.get('vout');
    this.fromVout = navParams.get('fromVout') || undefined;

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

  public ionViewDidEnter(): void {
    this.txProvider.getTx(this.txId, this.chainNetwork).subscribe(
      response => {
        let tx;
        if (
          this.chainNetwork.chain === 'BTC' ||
          this.chainNetwork.chain === 'BCH' ||
          this.chainNetwork.chain === 'BIV'
        ) {
          tx = this.txProvider.toUtxoCoinsAppTx(response);
        }
        if (this.chainNetwork.chain === 'ETH') {
          tx = this.txProvider.toEthAppTx(response);
        }
        this.tx = tx;
        this.loading = false;
        this.txProvider
          .getCoins(this.tx.txid, this.chainNetwork)
          .subscribe(data => {
            this.tx.vin = data.inputs;
            this.tx.vout = data.outputs;
            this.tx.fee = this.txProvider.getFee(this.tx);
            this.tx.isRBF = _.some(data.inputs, input => {
              return (
                input.sequenceNumber &&
                input.sequenceNumber < this.DEFAULT_RBF_SEQNUMBER - 1
              );
            });
            this.tx.hasUnconfirmedInputs = _.some(data.inputs, input => {
              return input.mintHeight < 0;
            });
            this.tx.valueOut = data.outputs.reduce((a, b) => a + b.value, 0);
          });
        this.txProvider
          .getConfirmations(this.tx.blockheight, this.chainNetwork)
          .subscribe(confirmations => {
            if (confirmations === -3) {
              this.errorMessage =
                'This transaction is invalid and will never confirm, because some of its inputs are already spent.';
            }
            this.confirmations = confirmations;
          });
        // Be aware that the tx component is loading data into the tx object
      },
      err => {
        this.errorMessage = err;
        this.loading = false;
      }
    );
  }

  public goToBlock(e, blockHash: string): void {
    if (e.ctrlKey) {
      return;
    }
    this.redirProvider.redir('block-detail', {
      blockHash,
      chain: this.chainNetwork.chain,
      network: this.chainNetwork.network
    });
  }
}
