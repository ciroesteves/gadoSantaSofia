import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  {path: 'login', loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)},
  {path: 'gado', loadChildren: () => import('./pages/gado/menu/menu.module').then( m => m.MenuPageModule)},
  {path: 'gado/geral', loadChildren: () => import('./pages/gado/geral/geral.module').then( m => m.GeralPageModule)},
  {path: 'gado/cadastro', loadChildren: () => import('./pages/gado/cadastro/cadastro.module').then( m => m.CadastroPageModule)},
  {path: 'gado/detalhes/:id', loadChildren: () => import('./pages/gado/detalhes/detalhes.module').then( m => m.DetalhesPageModule)},
  {path: 'gado/edicao/:id', loadChildren: () => import('./pages/gado/edicao/edicao.module').then( m => m.EdicaoPageModule)},
  {path: 'gado/pesagem', loadChildren: () => import('./pages/gado/pesagem/pesagem.module').then( m => m.PesagemPageModule)},
  {path: 'gado/vacinacao', loadChildren: () => import('./pages/gado/vacinacao/vacinacao.module').then( m => m.VacinacaoPageModule)},
  {path: 'metricas', loadChildren: () => import('./pages/metricas/menu/menu.module').then( m => m.MenuPageModule)},
  {path: 'metricas/metricalotes', loadChildren: () => import('./pages/metricas/lotes/lotes.module').then( m => m.LotesPageModule)}, 
  {path: 'metricas/metricacustos', loadChildren: () => import('./pages/metricas/custos/custos.module').then( m => m.CustosPageModule)},  
  {path: 'financeiro', loadChildren: () => import('./pages/financeiro/menu/menu.module').then( m => m.MenuPageModule)},
  {path: 'financeiro/compradores/geral', loadChildren: () => import('./pages/financeiro/compradores/geral/geral.module').then( m => m.GeralPageModule)},
  {path: 'financeiro/compradores/cadastro', loadChildren: () => import('./pages/financeiro/compradores/cadastro/cadastro.module').then( m => m.CadastroPageModule)},
  {path: 'financeiro/compradores/edicao/:id', loadChildren: () => import('./pages/financeiro/compradores/edicao/edicao.module').then( m => m.EdicaoPageModule)},
  {path: 'financeiro/compradores/detalhes/:id', loadChildren: () => import('./pages/financeiro/compradores/detalhes/detalhes.module').then( m => m.DetalhesPageModule)},
  {path: 'financeiro/custos', loadChildren: () => import('./pages/financeiro/custo/cadastro/cadastro.module').then( m => m.CadastroPageModule)},
  {path: 'calculadora/individual', loadChildren: () => import('./pages/calculadora/venda-individual/venda-individual.module').then( m => m.VendaIndividualPageModule)},
  {path: 'calculadora/lotes', loadChildren: () => import('./pages/calculadora/venda-lotes/venda-lotes.module').then( m => m.VendaLotesPageModule)},
  {path: 'calculadora/alimentacao', loadChildren: () => import('./pages/calculadora/alimentacao-lotes/alimentacao-lotes.module').then( m => m.AlimentacaoLotesPageModule)},
  {path: 'calculadora', loadChildren: () => import('./pages/calculadora/menu-calculadora/menu-calculadora.module').then( m => m.MenuCalculadoraPageModule)},
  {path: 'calculadora/faixas', loadChildren: () => import('./pages/calculadora/venda-faixas/venda-faixas.module').then( m => m.VendaFaixasPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
