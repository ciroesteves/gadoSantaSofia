import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendaIndividualPage } from './venda-individual.page';

const routes: Routes = [
  {
    path: '',
    component: VendaIndividualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendaIndividualPageRoutingModule {}
