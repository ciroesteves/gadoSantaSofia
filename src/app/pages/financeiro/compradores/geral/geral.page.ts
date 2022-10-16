import { FinanceiroService } from 'src/app/service/financeiro.service';
import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.page.html',
  styleUrls: ['./geral.page.scss'],
})
export class GeralPage implements OnInit {

  public fornecedores = new Array();

  private fornecedoresSubscription: Subscription;
  public dataAtual;

  constructor(
    private financeiroService: FinanceiroService,
    private loginService: AutenticacaoService,
  ) { 
    this.loginService.verificaLogged();
    this.dataAtual = new Date();
    this.fornecedoresSubscription = this.financeiroService.getCompradores().subscribe(data => {
      function compare( a, b ) {
        if ( a.tipo < b.tipo ){
          return -1;
        }
        if ( a.tipo > b.tipo ){
          return 1;
        }
        return 0;
      }
      data.sort( compare );
      this.fornecedores = data;
    })
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.fornecedoresSubscription.unsubscribe();
  }

}
