import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendaIndividualPageRoutingModule } from './venda-individual-routing.module';

import { VendaIndividualPage } from './venda-individual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendaIndividualPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VendaIndividualPage]
})
export class VendaIndividualPageModule {}
