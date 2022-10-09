import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';
import { OperacoesService } from 'src/app/service/operacoes.service';

@Component({
  selector: 'app-vacinacao',
  templateUrl: './vacinacao.page.html',
  styleUrls: ['./vacinacao.page.scss'],
})
export class VacinacaoPage implements OnInit {
  vacinacaoForm: FormGroup;
  vacinacao: any;

  constructor(
    private loginService: AutenticacaoService,
    private builder: FormBuilder,
    private service: OperacoesService,
    ) { 
      this.loginService.verificaLogged(); }

  ngOnInit() {
    this.vacinacaoForm = this.builder.group({
      numero: ['', [Validators.required]],
      vacina: ['', [Validators.required]],
      data: ['', [Validators.required]],
    });
  }

  addvacinacaoAnimal(){
    this.vacinacao = this.vacinacaoForm.value;
    this.vacinacao.data = new Date(this.vacinacao.data);
    this.service.addVacinacao(this.vacinacao.numero, this.vacinacao);
    this.vacinacaoForm.reset();
  }

  limparForm(){
    this.vacinacaoForm.reset();
  }

}
