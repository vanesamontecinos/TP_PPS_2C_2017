import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraficoFaltasPage } from './grafico-faltas';

@NgModule({
  declarations: [
    GraficoFaltasPage,
  ],
  imports: [
    IonicPageModule.forChild(GraficoFaltasPage),
  ],
})
export class GraficoFaltasPageModule {}
