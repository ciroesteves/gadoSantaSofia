import { FinanceiroService } from './../../../service/financeiro.service';
import { OperacoesService } from 'src/app/service/operacoes.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  public gado: any;
  private loading: any;
  cadastroForm: FormGroup;
  public vendedores = new Array();

  constructor(
    private builder: FormBuilder,
    private service: OperacoesService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private loginService: AutenticacaoService,
    private financeiroService: FinanceiroService
  ) { 
    this.loginService.verificaLogged();
    this.financeiroService.getCompradores().subscribe(data => {
      this.vendedores = data;
    });
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
      sexo: ['', [Validators.required]],
      pai: [''],
      mae: [''],
      vendedor: [''],
      valor: [''],
      dataCompra: ['']
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
    if(animais.dataCompra != '' && animais.dataCompra != null){
      animais.dataCompra = new Date(animais.dataCompra);
    }
    animais.peso = 0;
    animais.status = 'vivo';
    this.service.addAnimal(animais);
    this.cadastroForm.reset();
    this.navCtrl.navigateBack('/gado/geral');
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }
}
