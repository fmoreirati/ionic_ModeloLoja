import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PefilUsuarioPage } from './pefil-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: PefilUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PefilUsuarioPageRoutingModule {}
