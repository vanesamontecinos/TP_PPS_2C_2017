import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BotonesPage } from './botones';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    BotonesPage,
  ],
  imports: [
    IonicPageModule.forChild(BotonesPage),
    TranslateModule.forChild()
  ],
})
export class BotonesPageModule {}
