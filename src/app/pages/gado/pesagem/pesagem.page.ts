import { Pesagem } from './../../../interfaces/pesagem';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';
import { OperacoesService } from 'src/app/service/operacoes.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-pesagem',
  templateUrl: './pesagem.page.html',
  styleUrls: ['./pesagem.page.scss'],
})
export class PesagemPage implements OnInit {
  private loading: any;
  pesagemForm: FormGroup;
  pesagem: any;
  numeroForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private service: OperacoesService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private loginService: AutenticacaoService,
  ) { 
    this.loginService.verificaLogged();
  }

  ngOnInit() {
    this.pesagemForm = this.builder.group({
      numero: ['', [Validators.required]],
      peso: ['', [Validators.required]],
      data: ['', [Validators.required]],
    });
  }

  async addPesoAnimal(){
    this.pesagem = this.pesagemForm.value;
    this.pesagem.data = new Date(this.pesagem.data);
    this.service.addPesagem(this.pesagem.numero, this.pesagem);
    this.service.addCampoPeso(this.pesagem.numero, this.pesagem.peso);
    this.pesagemForm.reset();
  }

}
