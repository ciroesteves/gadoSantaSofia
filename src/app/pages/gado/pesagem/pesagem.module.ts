import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PesagemPageRoutingModule } from './pesagem-routing.module';

import { PesagemPage } from './pesagem.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PesagemPageRoutingModule
  ],
  declarations: [PesagemPage]
})
export class PesagemPageModule {}
