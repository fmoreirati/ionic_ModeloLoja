import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginUsuarioPageRoutingModule } from './login-usuario-routing.module';

import { LoginUsuarioPage } from './login-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginUsuarioPageRoutingModule
  ],
  declarations: [LoginUsuarioPage]
})
export class LoginUsuarioPageModule {}
