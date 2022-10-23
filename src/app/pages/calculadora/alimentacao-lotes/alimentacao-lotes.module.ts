import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlimentacaoLotesPageRoutingModule } from './alimentacao-lotes-routing.module';

import { AlimentacaoLotesPage } from './alimentacao-lotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlimentacaoLotesPageRoutingModule
  ],
  declarations: [AlimentacaoLotesPage]
})
export class AlimentacaoLotesPageModule {}
