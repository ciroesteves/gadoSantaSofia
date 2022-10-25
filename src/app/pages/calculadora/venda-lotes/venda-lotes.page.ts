import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IonSlides } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';
import { OperacoesService } from 'src/app/service/operacoes.service';

@Component({
  selector: 'app-venda-lotes',
  templateUrl: './venda-lotes.page.html',
  styleUrls: ['./venda-lotes.page.scss'],
})
export class VendaLotesPage implements OnInit {
  simuladorForm1: FormGroup;
  simuladorForm2: FormGroup;
  precoVista: number;
  precoPrazo: number;
  @ViewChild('slides', { static: true }) slider: IonSlides;  
  segment = 0;  

  constructor(
    private builder: FormBuilder,
    private operacoesService: OperacoesService,
    private loginService: AutenticacaoService,
  ) { 
    this.loginService.verificaLogged();
  }

  ngOnInit() {
    this.simuladorForm1 = this.builder.group({
      lote: ['', [Validators.required]],
      preco: ['', [Validators.required]],
      rendimento: ['', [Validators.required]],
      precoFemea: ['', [Validators.required]],
      rendimentoFemea: ['', [Validators.required]],
    });
    this.simuladorForm2 = this.builder.group({
      lote: ['', [Validators.required]],
      preco: ['', [Validators.required]],
      precoFemea: ['', [Validators.required]],
    });
  }


  async calcularPrecoVendaTipo1(){
    this.precoVista = this.precoPrazo = 0;
    const venda = this.simuladorForm1.value;
    const animais = await this.operacoesService.getAnimaisLote(venda.lote);
    animais.forEach(data => {
      this.operacoesService.getAnimalId(data.id).subscribe(data2 => {
        if(data2.sexo == "Macho"){
          const resultado = (venda.preco * ( ( data2.peso * ( venda.rendimento / 100) ) / 15));
          if(resultado > 0){
            this.precoVista += resultado;
            this.precoPrazo += resultado*1.02;
          }
        } else {
          const resultado = (venda.precoFemea * ( ( data2.peso * ( venda.rendimentoFemea / 100) ) / 15));
          if(resultado > 0){
            this.precoVista += resultado;
            this.precoPrazo += resultado*1.02;
          }
        }
      });
    })
  }

  async calcularPrecoVendaTipo2(){
    this.precoVista = this.precoPrazo = 0;
    const venda = this.simuladorForm2.value;
    const animais = await this.operacoesService.getAnimaisLote(venda.lote);
    animais.forEach(data => {
      this.operacoesService.getAnimalId(data.id).subscribe(data2 => {
        if(data2.sexo == "Macho"){
          this.precoVista += venda.preco;
          this.precoPrazo += venda.preco*1.02;
        } else {
          this.precoVista += venda.precoFemea;
          this.precoPrazo += venda.precoFemea*1.02;
        }
      });
    })
  }

  async segmentChanged(ev: any) {  
    await this.slider.slideTo(this.segment);  
  }  

  async slideChanged() {  
    this.segment = await this.slider.getActiveIndex();  
  }  

  limparForm(){
    this.simuladorForm1.reset();
    this.simuladorForm2.reset();
  }

}

