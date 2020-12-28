import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiProvider, ChainNetwork } from '../../providers/api/api';
import { CurrencyProvider } from '../../providers/currency/currency';

export interface ApiWalletBalance {
  balance: number;
}

@Injectable()
export class FaucetProvider {
  constructor(
    public httpClient: HttpClient,
    public currency: CurrencyProvider,
    private apiProvider: ApiProvider
  ) {}

  public getWalletBalance(chainNetwork: ChainNetwork): Observable<ApiWalletBalance> {
    return this.httpClient.get<ApiWalletBalance>(
      `${this.apiProvider.getUrl(chainNetwork)}/wallet`
    )
  }

  public getFaucetHistory(chainNetwork: ChainNetwork) {
    return this.httpClient.get<any>(
      `${this.apiProvider.getUrl(chainNetwork)}/faucet`
    )
  }

  public faucetCoin(
    addrStr: String,
    amount: String,
    ip: String,
    chainNetwork: ChainNetwork
  ) {
    const body = {
      amount,
      ip
    }
    return this.httpClient.post<any>(
      `${this.apiProvider.getUrl(chainNetwork)}/address/${addrStr}/faucet`, body
    );
  }
}
