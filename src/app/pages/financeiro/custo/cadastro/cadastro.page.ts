import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';
import { FinanceiroService } from 'src/app/service/financeiro.service';
import { OperacoesService } from 'src/app/service/operacoes.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  private loading: any;
  custoForm: FormGroup;
  public fornecedores = new Array();

  constructor(
    private builder: FormBuilder,
    private loginService: AutenticacaoService,
    private financeiroService: FinanceiroService
  ) { 
    this.loginService.verificaLogged();
    this.financeiroService.getCompradores().subscribe(data => {
      this.fornecedores = data;
    });
  }

  ngOnInit() {
    this.custoForm = this.builder.group({
      fornecedor: [''],
      tipo: ['', [Validators.required]],
      data: ['', [Validators.required]],
      valor: ['', [Validators.required]],
    });
  }

  addCusto(){
    const custo = this.custoForm.value;
    custo.data = new Date(custo.data);
    this.financeiroService.addcustoFornecedor(custo.fornecedor, custo);
    this.custoForm.reset();
  }

  limparForm(){
    this.custoForm.reset();
  }

}
