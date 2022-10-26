import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController, ModalController } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';
import { OperacoesService } from 'src/app/service/operacoes.service';

@Component({
  selector: 'app-pesagem',
  templateUrl: './pesagem.page.html',
  styleUrls: ['./pesagem.page.scss'],
})
export class PesagemPage implements OnInit {
  private loading: any;
  pesagemForm: FormGroup;
  pesagem: any;
  animaisSubscription: Subscription;
  animais = new Array();

  constructor(
    private builder: FormBuilder,
    private service: OperacoesService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private loginService: AutenticacaoService,
    private operacoesService: OperacoesService
  ) { 
    this.loginService.verificaLogged();
    this.animaisSubscription = this.operacoesService.getAnimais().subscribe(data => {
      function compare( value ) {
        if ( value.peso == 0 || value.peso == null || value.peso == undefined){
          return value
        }
      }
      function ordena( a, b ) {
        if ( a.numero < b.numero ){
          return -1;
        }
        if ( a.numero > b.numero ){
          return 1;
        }
        return 0;
      }
      data = data.filter( compare );
      data = data.sort( ordena );
      this.animais = data;
    })
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

  limparForm(){
    this.pesagemForm.reset();
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

}
