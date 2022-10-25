import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendaFaixasPageRoutingModule } from './venda-faixas-routing.module';

import { VendaFaixasPage } from './venda-faixas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendaFaixasPageRoutingModule
  ],
  declarations: [VendaFaixasPage]
})
export class VendaFaixasPageModule {}
