import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuCalculadoraPage } from './menu-calculadora.page';

const routes: Routes = [
  {
    path: '',
    component: MenuCalculadoraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuCalculadoraPageRoutingModule {}
