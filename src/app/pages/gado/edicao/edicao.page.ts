import { FinanceiroService } from 'src/app/service/financeiro.service';
import { OperacoesService } from 'src/app/service/operacoes.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.page.html',
  styleUrls: ['./edicao.page.scss'],
})
export class EdicaoPage implements OnInit {
  private gadoId: string = null;
  public gado: any;
  private loading: any;
  private productSubscription: Subscription;
  edicaoForm: FormGroup;
  public nasc;
  public dataCompra;
  vendedores = new Array();

  constructor(
    private builder: FormBuilder,
    private operacoesService: OperacoesService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private loginService: AutenticacaoService,
    private financeiroService: FinanceiroService
  ) { 
    this.loginService.verificaLogged();
    this.gadoId = this.activatedRoute.snapshot.params['id'];

    if (this.gadoId){
      this.carregarAnimal();
      this.financeiroService.getCompradores().subscribe(data => {
        this.vendedores = data;
      });
    } else{
      this.navCtrl.navigateBack('/geral');
    }
  }

  ngOnInit() {
    this.edicaoForm = this.builder.group({
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

  carregarAnimal() {
    this.productSubscription = this.operacoesService.getAnimalId(this.gadoId).subscribe(data => {
      this.gado = data;
      this.nasc = this.gado.nascimento;
      this.nasc = new Date(this.nasc.seconds * 1000);
      this.nasc = this.formatDate(this.nasc);
      if(this.gado.dataCompra != '' && this.gado.dataCompra != null && this.gado.dataCompra != ''){
        this.dataCompra = this.gado.dataCompra;
        this.dataCompra = new Date(this.dataCompra.seconds * 1000);
        this.dataCompra = this.formatDate(this.dataCompra);
      }     
      this.edicaoForm.patchValue({
      numero: this.gado.numero,
      nome: this.gado.nome,
      nascimento: this.nasc,
      lote: this.gado.lote,
      raca: this.gado.raca,
      foto: this.gado.foto,
      rascunho: this.gado.rascunho,
      sexo: this.gado.sexo,
      pai: this.gado.pai,
      mae: this.gado.mae,
      vendedor: this.gado.vendedor,
      valor: this.gado.valor,
      dataCompra: this.dataCompra
      });
    });
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}


  async uploadPhoto(event){
    await this.presentLoading();
    this.operacoesService.storeImage(event.target.files[0]).then(img => {
      this.edicaoForm.patchValue({
        foto: img
      });
    })
    await this.loading.dismiss();
  }

  async editAnimal() {
    const animais = this.edicaoForm.value;
    animais.nascimento = new Date(animais.nascimento);
    animais.nascimento.setDate(animais.nascimento.getDate() + 1)
    if(animais.dataCompra){
      animais.dataCompra = new Date(animais.dataCompra);
      animais.dataCompra.setDate(animais.dataCompra.getDate() + 1)
    } else {
      animais.dataCompra = '';
    }
    await this.presentLoading();
    await this.operacoesService.updateAnimal(this.gadoId, animais);
    await this.loading.dismiss();
    this.navCtrl.navigateBack('/geral');
   
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }
}
