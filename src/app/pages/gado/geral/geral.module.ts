import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeralPageRoutingModule } from './geral-routing.module';

import { GeralPage } from './geral.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeralPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [GeralPage]
})
export class GeralPageModule {}
