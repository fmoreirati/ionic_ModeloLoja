import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PefilUsuarioPageRoutingModule } from './pefil-usuario-routing.module';

import { PefilUsuarioPage } from './pefil-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PefilUsuarioPageRoutingModule
  ],
  declarations: [PefilUsuarioPage]
})
export class PefilUsuarioPageModule {}
