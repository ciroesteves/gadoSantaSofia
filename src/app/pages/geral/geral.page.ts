import { OperacoesService } from './../../service/operacoes.service';
import { Gado } from 'src/app/interfaces/gado';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import _ from 'lodash';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.page.html',
  styleUrls: ['./geral.page.scss'],
})
export class GeralPage implements OnInit {
  public animais = new Array<Gado>();
  public gados = new Array<Gado>();

  private animaisSubscription: Subscription;
  public dataAtual;
  public count = 0;
  barraPesquisa: string;
  constructor(
    private operacoesService: OperacoesService
  ) {
    this.barraPesquisa = '';
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
      this.gados = data;
    })
  }

  filtroAnimal(pesquisa: any){
    let val = pesquisa.target.value;
    if(val && val.trim() != ''){
      this.animais.filter((animal) => {
        return (animal.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.animais = this.gados;
    }
  }

  ngOnInit() {
    
  }

  ngOnDestroy(){
    this.animaisSubscription.unsubscribe();
  }
}