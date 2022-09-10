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

  constructor(private operacoesService: OperacoesService
    ) {
      let idade;
      this.dataAtual = new Date();
      this.animaisSubscription = this.operacoesService.getAnimais().subscribe(data => {
        this.animais = data;
        this.countMacho = this.countFemea = 0;
        this.countAte8 = this.countAte16 = this.countAte24 = this.countAte36 = this.countMaior36 = 0;
        this.countAte150 = this.countAte300 = this.countAte450 = this.countAte600 = this.countMaior600 = 0;
        this.mediaPeso = this.countTotal = this.countSemPeso = this.totalPeso = this.mediaIdade =  0;
        this.animais.forEach(element => {
          if(element.sexo == 'Macho'){
            this.countMacho++;
          } else if(element.sexo == 'Fêmea'){
            this.countFemea++;
          }
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
          }
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
          }
          this.countTotal++;
          this.totalPeso += element.peso;
          this.mediaIdade += (Date.now()/1000) - element.nascimento['seconds'];
        });
        this.totalPeso = this.totalPeso*1;
        this.mediaPeso = this.totalPeso / (this.countTotal-this.countSemPeso);
        this.mediaIdade = (this.mediaIdade/(60*60*24*30) / this.countTotal);
        this.mediaPeso = Math.round(this.mediaPeso);
        this.mediaIdade = Math.round(this.mediaIdade);
      })      
  }

  ngOnInit() {
  }

}
