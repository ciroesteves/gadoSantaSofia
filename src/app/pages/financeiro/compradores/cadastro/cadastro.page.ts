import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';
import { FinanceiroService } from 'src/app/service/financeiro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  public comprador: any;
  cadastroForm: FormGroup;
  public vendedores = new Array();

  constructor(
    private builder: FormBuilder,
    private navCtrl: NavController,
    private loginService: AutenticacaoService,
    private financeiroService: FinanceiroService
  ) { 
    this.loginService.verificaLogged();
  }

  ngOnInit() {
    this.cadastroForm = this.builder.group({
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

  async addFornecedor(){
    const fornecedor = this.cadastroForm.value;
    this.financeiroService.addFornecedor(fornecedor);
    this.cadastroForm.reset();
    this.navCtrl.navigateBack('/compradores/geral');
  }
}