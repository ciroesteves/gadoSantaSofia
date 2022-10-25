import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendaFaixasPage } from './venda-faixas.page';

const routes: Routes = [
  {
    path: '',
    component: VendaFaixasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendaFaixasPageRoutingModule {}
