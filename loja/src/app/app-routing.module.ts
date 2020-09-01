import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-usuario/login-usuario.module').then( m => m.LoginUsuarioPageModule)
  },
  // {
  //   path: 'pefil-usuario',
  //   loadChildren: () => import('./pages/pefil-usuario/pefil-usuario.module').then( m => m.PefilUsuarioPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
