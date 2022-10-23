import { OperacoesService } from 'src/app/service/operacoes.service';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.page.html',
  styleUrls: ['./geral.page.scss'],
})
export class GeralPage implements OnInit {
  public animais = new Array();
  private animaisSubscription: Subscription;
  public dataAtual;

  constructor(
    private operacoesService: OperacoesService,
    private loginService: AutenticacaoService,
  ) { 
    this.loginService.verificaLogged();
    this.dataAtual = new Date();
    this.animaisSubscription = this.operacoesService.getAnimais().subscribe(data => {
      function compare( a, b ) {
        if ( a.numero < b.numero ){
          return -1;
        }
        if ( a.numero > b.numero ){
          return 1;
        }
        return 0;
      }
      data.sort( compare );
      this.animais = data;
    })
  }

  ngOnInit() {}

  ngOnDestroy(){
    this.animaisSubscription.unsubscribe();
  }
}