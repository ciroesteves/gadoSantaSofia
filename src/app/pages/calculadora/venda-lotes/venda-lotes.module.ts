import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendaLotesPageRoutingModule } from './venda-lotes-routing.module';

import { VendaLotesPage } from './venda-lotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendaLotesPageRoutingModule
  ],
  declarations: [VendaLotesPage]
})
export class VendaLotesPageModule {}
