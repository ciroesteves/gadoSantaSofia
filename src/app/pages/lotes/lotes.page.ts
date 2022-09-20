import { Component, OnInit } from '@angular/core';
import { OperacoesService } from 'src/app/service/operacoes.service';

@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.page.html',
  styleUrls: ['./lotes.page.scss'],
})
export class LotesPage implements OnInit {
  animaisSubscription: any;
  dataAtual: Date;
  animais: { numero: number; nome: string; raca: string; sexo: string; nascimento: Date; peso: number; lote: string; rascunho: string; pai: number; mae: number; foto: any; id: string; }[];
  countMacho: number;
  countFemea: number;
  countAte8: number;
  countAte16: number;
  countAte24: number;
  countAte36: number;
  countMaior36: number;
  countAte150: number;
  countAte300: number;
  countAte450: number;
  countAte600: number;
  countMaior600: number;
  countSemPeso: number;
  mediaPeso: number;
  mediaIdade: number;
  countTotal: number;
  totalPeso: number;
  teste: any;
  dataGraficoPeso: any[];
  labelGraficoPeso: any[];
  dataGraficoIdade: any[];
  labelGraficoIdade: any[];
  optionGraficoPeso: any;

  constructor(private operacoesService: OperacoesService
    ) {
      this.dataAtual = new Date();
      this.animaisSubscription = this.operacoesService.getAnimais().subscribe(data => {
        this.animais = data;
        this.countMacho = this.countFemea = 0;
        this.countAte8 = this.countAte16 = this.countAte24 = this.countAte36 = this.countMaior36 = 0;
        this.countAte150 = this.countAte300 = this.countAte450 = this.countAte600 = this.countMaior600 = 0;
        this.mediaPeso = this.countTotal = this.countSemPeso = this.totalPeso = this.mediaIdade =  0;
        this.animais.forEach(element => {

          // Gênero do animal
          if(element.sexo == 'Macho'){
            this.countMacho++;
          } else if(element.sexo == 'Fêmea'){
            this.countFemea++;
          }// Fim Gênero do animal
          // Idade animal
          if((Date.now()/1000) - element.nascimento['seconds'] < 21038400){
            this.countAte8++;
          } else if((Date.now()/1000) - element.nascimento['seconds'] < 42076800){
            this.countAte16++;
          } else if((Date.now()/1000) - element.nascimento['seconds'] < 63115200){
            this.countAte24++;
          } else if((Date.now()/1000) - element.nascimento['seconds'] < 94672800){
            this.countAte36++;
          } else if((Date.now()/1000) - element.nascimento['seconds'] >= 94672800){
            this.countMaior36++;
          } // Fim Idade animal
          // Peso animal
          if(element.peso < 150 && element.peso !=0){
            this.countAte150++; 
          } else if(element.peso < 300 && element.peso !=0){
            this.countAte300++;
          } else if(element.peso < 450 && element.peso !=0){
            this.countAte450++;
          } else if(element.peso < 600 && element.peso !=0){
            this.countAte600++;
          } else if(element.peso >= 600){
            this.countMaior600++;
          } else{
            this.countSemPeso++;
          } // Fim Peso animal
          // Indicadores gerais
          this.countTotal++;
          this.totalPeso += Math.round(element.peso);
          this.mediaIdade += (Date.now()/1000) - element.nascimento['seconds'];
        });
        this.totalPeso = this.totalPeso*1;
        this.mediaPeso = this.totalPeso / (this.countTotal-this.countSemPeso);
        this.mediaIdade = ((this.mediaIdade/(60*60*24*30)) / this.countTotal);
        this.mediaPeso = Math.round(this.mediaPeso);
        this.mediaIdade = Math.round(this.mediaIdade);
        // Fim Indicadores gerais
        // Gráficos Peso
        this.dataGraficoPeso = [{
          data: [this.countAte150, this.countAte300, this.countAte450, this.countAte600, this.countMaior600] , 
          label: 'Quantidade/ Faixa de Peso',
          backgroundColor: '#0000FF'	
        }];
        this.labelGraficoPeso = ['-150kg', '-300kg', '-450kg', '-600kg', '+600kg']
        // Fim Gráfico Peso
        // Gráfico Idade
        this.dataGraficoIdade = [{
          data: [this.countAte8, this.countAte16, this.countAte24, this.countAte36, this.countMaior36],
          label: 'Quantidade/ Faixa de Idade',
          backgroundColor: [
            '#0000FF',
            '#ff0000',
            '#FFFF00',
            '#00FF00',
            '#FF7F00'
        ]
        }];
        this.labelGraficoIdade = ['-8 meses', '-16 meses', '-24 meses', '-36 meses', '+36 meses'];
        // Fim Gráfico Idade
      })
      

  }

  ngOnInit() {
  }

}
