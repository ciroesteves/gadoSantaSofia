import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';

@Component({
  selector: 'app-vacinacao',
  templateUrl: './vacinacao.page.html',
  styleUrls: ['./vacinacao.page.scss'],
})
export class VacinacaoPage implements OnInit {

  constructor(private loginService: AutenticacaoService,
    ) { 
      this.loginService.verificaLogged(); }

  ngOnInit() {
  }

}
