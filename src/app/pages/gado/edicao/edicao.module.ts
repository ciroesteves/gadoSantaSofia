import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdicaoPageRoutingModule } from './edicao-routing.module';

import { EdicaoPage } from './edicao.page';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    EdicaoPageRoutingModule
  ],
  declarations: [EdicaoPage]
})
export class EdicaoPageModule {}
