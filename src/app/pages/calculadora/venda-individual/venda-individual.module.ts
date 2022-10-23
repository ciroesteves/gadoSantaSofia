import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendaIndividualPageRoutingModule } from './venda-individual-routing.module';

import { VendaIndividualPage } from './venda-individual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendaIndividualPageRoutingModule
  ],
  declarations: [VendaIndividualPage]
})
export class VendaIndividualPageModule {}
