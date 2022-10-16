import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  {path: 'geral', loadChildren: () => import('./pages/gado/geral/geral.module').then( m => m.GeralPageModule)},
  {path: 'cadastro', loadChildren: () => import('./pages/gado/cadastro/cadastro.module').then( m => m.CadastroPageModule)},
  {path: 'detalhes/:id', loadChildren: () => import('./pages/gado/detalhes/detalhes.module').then( m => m.DetalhesPageModule)},
  {path: 'edicao/:id', loadChildren: () => import('./pages/gado/edicao/edicao.module').then( m => m.EdicaoPageModule)},
  {path: 'lotes', loadChildren: () => import('./pages/metricas/lotes/lotes.module').then( m => m.LotesPageModule)},
  {path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)},
  {path: 'menuGado', loadChildren: () => import('./pages/gado/menu/menu.module').then( m => m.MenuPageModule)},
  {path: 'menuMetrica', loadChildren: () => import('./pages/metricas/menu/menu.module').then( m => m.MenuPageModule)},
  {path: 'pesagem', loadChildren: () => import('./pages/gado/pesagem/pesagem.module').then( m => m.PesagemPageModule)},
  {path: 'vacinacao', loadChildren: () => import('./pages/gado/vacinacao/vacinacao.module').then( m => m.VacinacaoPageModule)},
  {
    path: 'geral',
    loadChildren: () => import('./pages/financeiro/compradores/geral/geral.module').then( m => m.GeralPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/financeiro/compradores/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'edicao',
    loadChildren: () => import('./pages/financeiro/compradores/edicao/edicao.module').then( m => m.EdicaoPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/financeiro/menu/menu.module').then( m => m.MenuPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
