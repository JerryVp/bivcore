import { Component, Injectable, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider, ChainNetwork } from '../../providers/api/api';
import { CurrencyProvider } from '../../providers/currency/currency';
import { FaucetProvider } from '../../providers/faucet/faucet';
import { PriceProvider } from '../../providers/price/price';
import { SearchProvider } from '../../providers/search/search';
import * as _ from 'lodash';

@Injectable()
@IonicPage({
  name: 'faucet',
  segment: ':chain/:network/faucet',
  defaultHistory: ['home']
})
@Component({
  selector: 'faucet',
  templateUrl: 'faucet.html'
})
export class FaucetPage {
  @ViewChild('addressFaucet') inputAddress;
  @ViewChild('amountFaucet') inputAmount;
  @ViewChild('faucetBtn') faucetBtn;

  public loading = true;
  public UPPER_BOUND_LIMIT = 5;
  public LOWER_BOUND_LIMIT = 0.1;
  public balance = 0;
  public availableFaucet = 0;
  public chainNetwork: ChainNetwork;
  public walletAddress: string;
  public address: string;
  public amount: string;
  public amountText: any;
  public ip: string;
  public limit = 10;

  public transactions: any = [];
  public errorMessage: string;

  constructor(
    public navParams: NavParams,
    private apiProvider: ApiProvider,
    private currencyProvider: CurrencyProvider,
    private faucetProvider: FaucetProvider,
    public toastCtrl: ToastController,
    private priceProvider: PriceProvider,
    public searchProvider: SearchProvider,
  ) {
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
    if (!process.env.FROM_WALLET_ADDRESS) {
      throw Error(`Some configs are missing. Please check it out, process.env.FROM_WALLET_ADDRESS=${process.env.FROM_WALLET_ADDRESS}`);
    }
    this.walletAddress = process.env.FROM_WALLET_ADDRESS;
  }

  public ionViewDidEnter(): void {
    this.faucetProvider.getWalletBalance(this.chainNetwork).subscribe(data => {
      this.balance = data.balance;
      this.availableFaucet =
        this.balance > 0
          ? this.balance / 1000 > this.UPPER_BOUND_LIMIT
            ? this.UPPER_BOUND_LIMIT
            : this.balance / 1000
          : 0;

      if (this.transactions && this.transactions.length === 0) {
        this.fetchFaucetTxInfo();
        this.loading = false;
      };

      fetch('https://geolocation-db.com/json/1a811210-241d-11eb-b7a9-293dae7a95e1').then((result) => {
        this.ip = result.toString();
      }, err => {
        this.wrongSearch('Adblock Detected: We have detected that you are using adblocking plugin in your browser.');
        return;
      })
    },
    err => {
      this.errorMessage = err;
      this.loading = false;
    });
  }

  public numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode != 46) {
      return false;
    }
    if (charCode === 46 && event.target.value.includes(event.key)) {
      return false;
    };
    return true;
  }

  public formatNumber(processAmountString) {
    const REGEX_NUMBER = new RegExp("^0+(?!$)");
    const matchString = processAmountString.match(REGEX_NUMBER);
    if (matchString) {
      processAmountString = processAmountString.toString().replace(matchString[0], '');
    }
    return processAmountString.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  public update(e) {
    this[e.target.name] = e.target.value;
    if (this.amount && e.target.value != '' && this.amount != '') {
      this.faucetBtn.nativeElement.disabled = false;
    }
  }

  public updateBIVAmount(e) {
    let start = e.target.selectionStart;
    let end = e.target.selectionEnd;
    console.log("start", start, end);
    const regex = new RegExp("[a-zA-Z]");
    if (regex.test(e.target.value)) {
      return;
    };
    let processAmountString = e.target.value.replaceAll(',', '');
    const commaNumber = (processAmountString.length - 1) / 3;
    if (Math.trunc(commaNumber) > 0 && processAmountString.length === this.amountText.replaceAll(',', '').length) {
      e.target.value = this.amountText;
      e.target.setSelectionRange(start, end);
      console.log("end 1", start, end);
      return;
    };
    if (Math.trunc(commaNumber) > 1 && e.target.value.endsWith('.') && !this.amountText.endsWith('.')) {
      start += 1;
      end += 1;
      e.target.setSelectionRange(start, end);
      console.log("end 2", start, end);
      return;
    }
    if (processAmountString.startsWith('.')) {
      e.target.value = '0' + processAmountString;
      this.amountText = e.target.value;
      this[e.target.name] = processAmountString;
      if (this.address) {
        this.faucetBtn.nativeElement.disabled = false;
      }
      e.target.setSelectionRange(start, end);
      return;
    }
    this[e.target.name] = processAmountString.endsWith('.') ? processAmountString.replace('.', '') : processAmountString;
    if (processAmountString.includes('.')) {
      let int = processAmountString.split('.')[0];
      int = this.formatNumber(int);
      if (int.length > e.target.value.split('.')[0].length) {
        start += 1;
        end += 1;
      } else if (int.length < e.target.value.split('.')[0].length) {
        start -= 1;
        end -= 1;
      }
      e.target.value = int + '.' + processAmountString.split('.')[1];
      this.amountText = e.target.value;
    } else {
      let int = this.formatNumber(processAmountString);
      if (int.length > e.target.value.length) {
        start += 1;
        end += 1;
      } else if (int.length < e.target.value.length) {
        start -= 1;
        end -= 1;
      }
      e.target.value = int;
      this.amountText = e.target.value;
    }
    if (this.address) {
      this.faucetBtn.nativeElement.disabled = false;
    }
    if (start < 0 && end < 0) {
      start += 1;
      end += 1;
    }
    e.target.setSelectionRange(start, end);
  }

  public fetchFaucetTxInfo() {
    this.faucetProvider
      .getFaucetHistory(this.chainNetwork)
      .subscribe(d => {
        this.transactions = d;
        this.loading = false;
      },
      err => {
        this.errorMessage = err;
        this.loading = false;
      }
    );
  }

  public faucetCoin() {
    this.faucetBtn.nativeElement.disabled = true;
    if (!this.address || !this.amount) {
      this.wrongSearch('Please enter your address and amount you want to faucet!');
      return;
    }
    const regex = new RegExp("[a-zA-Z]");
    if (!regex.test(this.address)) {
      this.wrongSearch('Address is invalid');
      return;
    };
    this.searchProvider
      .isInputValid(this.address, this.chainNetwork)
      .subscribe(inputDetails => {
        if (!inputDetails.isValid) {
          this.wrongSearch('Address is invalid');
          return;
        }
        if (this.address === this.walletAddress) {
          this.wrongSearch('You cannot withdraw to the faucet address');
          return;
        }

        if (parseFloat(this.amount) > this.availableFaucet) {
          this.wrongSearch(`The amount cannot be greater than ${this.availableFaucet}`);
          return;
        }
        if (parseFloat(this.amount) < this.LOWER_BOUND_LIMIT) {
          this.wrongSearch(`The amount must be at least ${this.LOWER_BOUND_LIMIT}`);
          return;
        }

        if (this.amount.split('.')[1] && this.amount.split('.')[1].toString().length > 8) {
          this.wrongSearch(`Amount is 12 numbers and 8 decimals long in maximum.`);
          return;
        }

        return this.faucetProvider
          .faucetCoin(this.address, this.amount, this.ip, this.chainNetwork)
          .subscribe(result => {
            if (result.error) {
              this.wrongSearch(result.error);
            } else {
              this.wrongSearch(`Faucet successfully with txid=${result.txid}`);
            }
            this.inputAddress.nativeElement.value = '';
            this.inputAmount.nativeElement.value = '';
            this.address = null;
            this.amount = null;
            this.faucetBtn.nativeElement.disabled = true;
          }, err => {
            this.wrongSearch(err);
          });
      });
  }

  private wrongSearch(message: string): void {
    this.loading = false;
    this.presentToast(message);
    setTimeout(() => {
    }, 150);
  }

  private presentToast(message): void {
    const toast: any = this.toastCtrl.create({
      message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
    setTimeout(() => {
      if (this.address && this.amount) {
        this.faucetBtn.nativeElement.disabled = false;
      }
    }, 3000);
  }

  public getConvertedNumber(n: string): number {
    return this.currencyProvider.getConvertedNumber(parseFloat(n) * 10**8, this.chainNetwork.chain);
  }
}