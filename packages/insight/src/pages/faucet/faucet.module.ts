import { NgModule } from '@angular/core';
import { QRCodeModule } from 'angular2-qrcode';
import { IonicPageModule } from 'ionic-angular';
import { ErrorComponentModule } from '../../components/error/error.module';
import { FooterComponentModule } from '../../components/footer/footer.module';
import { HeadNavComponentModule } from '../../components/head-nav/head-nav.module';
import { LoaderComponentModule } from '../../components/loader/loader.module';
import { TransactionListComponentModule } from '../../components/transaction-list/transaction-list.module';
import { CopyToClipboardModule } from '../../directives/copy-to-clipboard/copy-to-clipboard.module';
import { FaucetPage } from './faucet';

@NgModule({
  declarations: [FaucetPage],
  imports: [
    IonicPageModule.forChild(FaucetPage),
    FooterComponentModule,
    HeadNavComponentModule,
    LoaderComponentModule,
    ErrorComponentModule,
    CopyToClipboardModule,
    TransactionListComponentModule,
    QRCodeModule
  ],
  exports: [FaucetPage]
})
export class FaucetPageModule {}
