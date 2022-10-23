import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';
import { FinanceiroService } from 'src/app/service/financeiro.service';

@Component({
  selector: 'app-edicao',
  templateUrl: './edicao.page.html',
  styleUrls: ['./edicao.page.scss'],
})
export class EdicaoPage implements OnInit {
  private fornecedorId: string = null;
  public fornecedor: any;
  private loading: any;
  private fornecedoresSubscription: Subscription;
  edicaoForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private loginService: AutenticacaoService,
    private financeiroService: FinanceiroService
  ) { 
    this.loginService.verificaLogged();
    this.fornecedorId = this.activatedRoute.snapshot.params['id'];

    if (this.fornecedorId){
      this.carregarFornecedor();
    } else{
      this.navCtrl.navigateBack('/compradores/geral');
    }
  }

  ngOnInit() {
    this.edicaoForm = this.builder.group({
      nome: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      telefone: [''],
      lembrete: [''],
      endereco: [''],
      bairro: [''],
      cidade: [''],
      uf: [''],
      cpf: [''],
    });
   }

   carregarFornecedor() {
    this.fornecedoresSubscription = this.financeiroService.getFornecedor(this.fornecedorId).subscribe(data => {
      this.fornecedor = data;
      this.edicaoForm.patchValue({
        nome: this.fornecedor.nome,
        tipo: this.fornecedor.tipo,
        telefone: this.fornecedor.telefone,
        lembrete: this.fornecedor.lembrete,
        endereco: this.fornecedor.endereco,
        bairro: this.fornecedor.bairro,
        cidade: this.fornecedor.cidade,
        uf: this.fornecedor.uf,
        cpf: this.fornecedor.cpf,
      });
    });
  }


  async editFornecedor() {
    const fornecedor = this.edicaoForm.value;
    await this.presentLoading();
    await this.financeiroService.updateFornecedor(this.fornecedorId, fornecedor);
    await this.loading.dismiss();
    this.navCtrl.navigateBack('/compradores/geral');
   
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }
}
