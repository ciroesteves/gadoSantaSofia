import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

import { IonicModule } from '@ionic/angular';

import { CustosPageRoutingModule } from './custos-routing.module';

import { CustosPage } from './custos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustosPageRoutingModule,
    NgChartsModule
  ],
  declarations: [CustosPage]
})
export class CustosPageModule {}
