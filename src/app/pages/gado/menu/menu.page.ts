import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    private loginService: AutenticacaoService,
    ) { 
      this.loginService.verificaLogged(); }

  ngOnInit() {
  }

}
