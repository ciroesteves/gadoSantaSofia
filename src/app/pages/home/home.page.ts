import { AutenticacaoService } from './../../service/autenticacao.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private loginService: AutenticacaoService,
  ) { 
    this.loginService.verificaLogged();
  }

  ngOnInit() {
  }

  logout(){
    this.loginService.logout();
  }

}
