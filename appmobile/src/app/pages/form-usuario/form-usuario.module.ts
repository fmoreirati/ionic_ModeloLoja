import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormUsuarioPageRoutingModule } from './form-usuario-routing.module';

import { FormUsuarioPage } from './form-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormUsuarioPageRoutingModule
  ],
  declarations: [FormUsuarioPage]
})
export class FormUsuarioPageModule {}
