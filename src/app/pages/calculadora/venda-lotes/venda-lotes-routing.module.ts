import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendaLotesPage } from './venda-lotes.page';

const routes: Routes = [
  {
    path: '',
    component: VendaLotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendaLotesPageRoutingModule {}
