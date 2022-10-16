
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { GeralPage } from './geral.page';

const routes: Routes = [
  {
    path: '',
    component: GeralPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class GeralPageRoutingModule {}
