import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';
import { OperacoesService } from 'src/app/service/operacoes.service';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-venda-individual',
  templateUrl: './venda-individual.page.html',
  styleUrls: ['./venda-individual.page.scss'],
})
export class VendaIndividualPage implements OnInit {
  simuladorForm1: FormGroup;
  simuladorForm2: FormGroup;
  @ViewChild('slides', { static: true }) slider: IonSlides;  
  segment = 0;  
  private precoVista = 0;
  private precoPrazo = 0;

  constructor(
    private builder: FormBuilder,
    private operacoesService: OperacoesService,
    private loginService: AutenticacaoService,
  ) { 
    this.loginService.verificaLogged();
  }

  ngOnInit() {
    this.simuladorForm1 = this.builder.group({
      numero: ['', [Validators.required]],
      preco: ['', [Validators.required]],
      rendimento: ['', [Validators.required]],
    });
    this.simuladorForm2 = this.builder.group({
      peso: ['', [Validators.required]],
      preco: ['', [Validators.required]],
      rendimento: ['', [Validators.required]],
    });
  }


  async calcularPrecoVendaTipo1(){
    const venda = this.simuladorForm1.value;
    const animal = await this.operacoesService.getanimalNumero(venda.numero);
    animal.forEach(data => {
      this.operacoesService.getAnimalId(data.id).subscribe(data2 => {
        const resultado = (venda.preco * ( ( data2.peso * ( venda.rendimento / 100) ) / 15));
        this.precoVista = resultado;
        this.precoPrazo = resultado*1.02;
      });
    })
  }

  calcularPrecoVendaTipo2(){
    const venda = this.simuladorForm2.value;
    const resultado = (venda.preco * ( ( venda.peso * ( venda.rendimento / 100) ) / 15));
    this.precoVista = resultado;
    this.precoPrazo = resultado*1.02;
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
