import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlimentacaoLotesPage } from './alimentacao-lotes.page';

const routes: Routes = [
  {
    path: '',
    component: AlimentacaoLotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlimentacaoLotesPageRoutingModule {}
