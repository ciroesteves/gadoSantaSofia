import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesagemPage } from './pesagem.page';

const routes: Routes = [
  {
    path: '',
    component: PesagemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PesagemPageRoutingModule {}
