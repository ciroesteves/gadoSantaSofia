import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuCalculadoraPageRoutingModule } from './menu-calculadora-routing.module';

import { MenuCalculadoraPage } from './menu-calculadora.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuCalculadoraPageRoutingModule
  ],
  declarations: [MenuCalculadoraPage]
})
export class MenuCalculadoraPageModule {}
