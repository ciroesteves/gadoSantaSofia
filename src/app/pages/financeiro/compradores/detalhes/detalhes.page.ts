import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';
import { FinanceiroService } from 'src/app/service/financeiro.service';
import { OperacoesService } from 'src/app/service/operacoes.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  private fornecedorId: string = null;
  public fornecedor: any = {
    nome: '',
    tipo: '',
    telefone: '',
    cpf: '',
    lembrete: '',
    endereco: '',
    bairro: '',
    cidade: '',
    uf: '',
  };
  private fornecedoresSubscription: Subscription;

  constructor(
    private financeiroService: FinanceiroService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loginService: AutenticacaoService,
    private alertController: AlertController,
    private operacoesService: OperacoesService,
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
  }
  
  carregarFornecedor() {
    this.fornecedoresSubscription = this.financeiroService.getFornecedor(this.fornecedorId).subscribe(data => {
      this.fornecedor = data;     
    });
  }

  deletarFornecedor(){
    this.confirmacaoDelecao();
  }

  async confirmacaoDelecao(){
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      subHeader: 'Animal: ' + this.fornecedor.nome,
      message: 'Clique em OK para excluir definitivamente',
      buttons: [{
        text: 'OK',
        role: 'confirm',
        handler: async () => {  
          const contador = this.operacoesService.getAnimaisVendedor(this.fornecedorId);
          const valor = await Promise.resolve(contador)
          if(valor == 0){
            this.financeiroService.deleteFornecedor(this.fornecedorId);
            this.navCtrl.navigateBack('/compradores/geral');
          }
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
}
