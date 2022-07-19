import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  {path: 'geral', loadChildren: () => import('./pages/geral/geral.module').then( m => m.GeralPageModule)},
  {path: 'cadastro', loadChildren: () => import('./pages/cadastro/cadastro.module').then( m => m.CadastroPageModule)},
  {path: 'detalhes', loadChildren: () => import('./pages/detalhes/detalhes.module').then( m => m.DetalhesPageModule)},
  {path: 'edicao', loadChildren: () => import('./pages/edicao/edicao.module').then( m => m.EdicaoPageModule)},
  {path: 'lotes', loadChildren: () => import('./pages/lotes/lotes.module').then( m => m.LotesPageModule)},
  {path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
