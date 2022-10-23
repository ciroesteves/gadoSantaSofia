import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';
import { OperacoesService } from 'src/app/service/operacoes.service';
import { FinanceiroService } from 'src/app/service/financeiro.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  private productSubscription: Subscription;
  private compradorSubscription: Subscription;
  private pesosSubscription: Subscription;
  private vacinasSubscription: Subscription;
  private morteForm: FormGroup;
  private vendaForm: FormGroup;
  private detalheForm: FormGroup;
  private gadoId: string = null;
  private gado: any = {
    peso: 0,
  }
  private vendedor: any;
  private loading: any;
  private nasc;
  private dataCompra;
  private nomeVendedor;
  private pesos = new Array();
  private vacinas = new Array();
  private compradores = new Array();

  constructor(
    private financeiro: FinanceiroService,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private operacoesService: OperacoesService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private loginService: AutenticacaoService,
    private builder: FormBuilder,
  ) {
    this.loginService.verificaLogged();
    this.gadoId = this.activatedRoute.snapshot.params['id'];

    if (this.gadoId){
      this.carregarAnimal();
    } else{
      this.navCtrl.navigateBack('/geral');
    }

    this.financeiro.getCompradores().subscribe(data3 => {
      this.compradores = data3;
    });  
  }

  ngOnInit() {
    this.morteForm = this.builder.group({
      motivo: ['', [Validators.required]],
      detalhes: ['', [Validators.required]],
      data: ['', [Validators.required]],
    });
    this.vendaForm = this.builder.group({
      comprador: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.min(0)]],
      data: ['', [Validators.required]],
      notaTransporte: ['', [Validators.required]],
      notaVenda: ['', [Validators.required]],
    });
   }

  carregarAnimal() {
    this.productSubscription = this.operacoesService.getAnimalId(this.gadoId).subscribe(data => {
      this.gado = data;
      this.nasc = this.gado.nascimento;
      this.nasc = new Date(this.nasc.seconds * 1000);
      this.nasc = this.formatDate(this.nasc);
      this.dataCompra = this.gado.dataCompra;
      if(this.dataCompra && this.dataCompra != null && this.dataCompra != ''){
        this.dataCompra = new Date(this.dataCompra.seconds * 1000);
        this.dataCompra = this.formatDate(this.dataCompra);
      }
      if(this.gado.vendedor && this.gado.vendedor != ''){
        this.compradorSubscription = this.financeiro.getFornecedor(this.gado.vendedor).subscribe(data4 => {
          this.vendedor = data4;
          this.nomeVendedor = this.vendedor.nome;
        });
      }   
    });
    if(this.gado.peso != 0 || this.gado.peso != null || this.gado.peso){
      this.pesosSubscription = this.operacoesService.getPesagemId(this.gadoId).subscribe(data2 => {
        function compare( a, b ) {
          if ( a.data < b.data ){
            return -1;
          }
          if ( a.data > b.data ){
            return 1;
          }
          return 0;
        }
        data2.sort( compare );
        this.pesos = data2;
      })
    }
    this.vacinasSubscription = this.operacoesService.getVacinacaoId(this.gadoId).subscribe(data3 => {
      function compare( a, b ) {
        if ( a.data > b.data ){
          return -1;
        }
        if ( a.data < b.data ){
          return 1;
        }
        return 0;
      }
      data3.sort( compare );
      this.vacinas = data3;
    })
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

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  deletarAnimal(){
    this.confirmacaoDelecao();
  }

  async confirmacaoDelecao(){
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      subHeader: 'Animal: ' + this.gado.nome,
      message: 'Clique em OK para excluir definitivamente',
      buttons: [{
        text: 'OK',
        role: 'confirm',
        handler: () => {  
          this.operacoesService.deleteAnimalId(this.gadoId);
          this.navCtrl.navigateBack('/geral')
        } 
      },
     {
      text: 'Cancelar',
      role: 'cancel',
      }],
    })
    await alert.present();
    return 
  }

  async comunicarMorteAnimal(){
    const alert = await this.alertController.create({
      header: 'Confirmar Status: Morte',
      subHeader: 'Animal: ' + this.gado.nome + ' - ' + this.gado.nome,
      message: 'Clique em OK para comunicar o falecimento do animal',
      buttons: [{
        text: 'OK',
        role: 'confirm',
        handler: () => { 
          const morte = this.morteForm.value;
          morte.data = new Date(morte.data); 
          this.operacoesService.addDadosMorte(this.gadoId, morte);
          this.cancel();
          this.navCtrl.navigateBack('/geral');
        } 
      },
     {
      text: 'Cancelar',
      role: 'cancel',
      }],
    })
    await alert.present();
    return 
  }

  async venderAnimal(){
    const alert = await this.alertController.create({
      header: 'Confirmar Status: Vendido',
      subHeader: 'Animal: ' + this.gado.nome + ' - ' + this.gado.nome,
      message: 'Clique em OK para cadastrar a venda do animal',
      buttons: [{
        text: 'OK',
        role: 'confirm',
        handler: () => { 
          const venda = this.vendaForm.value;
          venda.data = new Date(venda.data); 
          this.operacoesService.addDadosVenda(this.gadoId, venda);
          this.cancel();
          this.navCtrl.navigateBack('/geral');
        } 
      },
     {
      text: 'Cancelar',
      role: 'cancel',
      }],
    })
    await alert.present();
    return 
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

}
