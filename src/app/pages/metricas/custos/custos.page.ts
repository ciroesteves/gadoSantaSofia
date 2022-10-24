import { OperacoesService } from 'src/app/service/operacoes.service';
import { FinanceiroService } from 'src/app/service/financeiro.service';
import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';

@Component({
  selector: 'app-custos',
  templateUrl: './custos.page.html',
  styleUrls: ['./custos.page.scss'],
})
export class CustosPage implements OnInit {
  private financasSubscription: any;
  private financas = new Array();
  private lucros = new Array();
  private custoTotal = 0;
  private custoComp = 0;
  private custoVet = 0;
  private custoMan = 0;
  private custoMed = 0
  private custoAli = 0;
  private custoBasico = 0;
  private lucroBruto = 0;
  dataGraficoCustoxTipo: { data: number[]; label: string; backgroundColor: string[]; color: string; }[];
  labelGraficoCustoxTipo: string[];

  constructor(
    private financeiroService: FinanceiroService,
    private loginService: AutenticacaoService,
    private operacoesService: OperacoesService
  ) { 
    this.loginService.verificaLogged();
    this.carregarCustoTotal();
    this.carregarLucroBruto();
  }

  ngOnInit() {
  }

  async carregarLucroBruto(){
    const animaisVendidos = await this.operacoesService.getAnimaisVendidos();
    animaisVendidos.forEach(a => {
      this.operacoesService.getVendaAnimal(a.id).subscribe(data => {
        this.lucros = data;
        this.lucros.forEach(data2 => {
          let dataNova = new Date(data2.data.seconds*1000);
          let dataAtual = new Date();
          if(data2.data.toDate().getFullYear() == dataAtual.getFullYear()){
            this.lucroBruto += data2.valor;
          }
        })
      })
    })
  }

  carregarCustoTotal(){
    this.financasSubscription = this.financeiroService.getCompradores().subscribe(data => {
      this.financas = data;
      this.financas.forEach(data2 => {
        this.financeiroService.getCustosFornecedor(data2.id).subscribe(data3 => {
          this.financas = data3;   
          this.financas.forEach(data4 => {
            let dataNova = new Date(data4.data.seconds*1000);
            let dataAtual = new Date();
            if(data4.data.toDate().getFullYear() == dataAtual.getFullYear()){
              this.custoTotal += data4.valor;
              if(data4.tipo == "Veterinário"){
                this.custoVet += data4.valor;
              } else if(data4.tipo == "Alimentação") {
                this.custoAli += data4.valor;
              } else if(data4.tipo == "Medicação") {
                this.custoMed += data4.valor;
              } else if(data4.tipo == "Manutenção") {
                this.custoMan += data4.valor;
              } else if(data4.tipo == "Custo Básico") {
                this.custoBasico += data4.valor;
              }
            }
            this.dataGraficoCustoxTipo = [{
              data: [this.custoComp, this.custoVet, this.custoAli, this.custoMed, this.custoMan, this.custoBasico], 
              label: 'Quantidade/ Faixa de Peso',
              backgroundColor: [
                '#0000FF',
                '#ff0000',
                '#FFFF00',
                '#00FF00',
                '#FF7F00',
                '#9400D3'
              ],
              color: 'white'
            }];
            this.labelGraficoCustoxTipo = ['Animal', 'Veterinário', 'Alimentação', 'Medicação', 'Manutenção', 'Básico']
          })
        })
      })
    });
  }

}
