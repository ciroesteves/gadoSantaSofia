import { OperacoesService } from 'src/app/service/operacoes.service';
import { Gado } from 'src/app/interfaces/gado';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  public gado: Gado = {
    numero: 0,
    nome: '',
    raca: '',
    sexo: '',
    nascimento: undefined,
    peso: 0,
    lote: '',
    rascunho: '',
    pai: 0,
    mae: 0,
    foto: ''
  };
  private loading: any;
  cadastroForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private service: OperacoesService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
  ) {
    
  }

  ngOnInit() {
    this.cadastroForm = this.builder.group({
      numero: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      nascimento: ['', [Validators.required]],
      lote: ['', [Validators.required]],
      raca: [''],
      foto: [''],
      rascunho: [''],
      peso: [''],
      sexo: ['', [Validators.required]],
      pai: [''],
      mae: [''],
    });
  }

  async uploadPhoto(event){
    await this.presentLoading();
    this.service.storeImage(event.target.files[0]).then(img => {
      this.cadastroForm.patchValue({
        foto: img
      });
    })
    await this.loading.dismiss();
  }

  async addAnimal(){
    const animais = this.cadastroForm.value;
    animais.nascimento = new Date(animais.nascimento);
    this.service.addAnimal(animais);
    this.cadastroForm.reset();
    this.navCtrl.navigateBack('/geral');
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }
}
