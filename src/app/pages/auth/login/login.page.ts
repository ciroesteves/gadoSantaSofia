import { AutenticacaoService } from 'src/app/service/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private service: AutenticacaoService,
    private nav: NavController
  ) { }

  ngOnInit() {
    this.isUserLoggedIn();

    this.loginForm = this.builder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]]
    });
  }

  isUserLoggedIn(){
    this.service.isLoggedIn.subscribe(user => {
      if(user){
        this.nav.navigateForward('home');
      }
    });
  }

  login(){
    const user = this.loginForm.value;
    this.service.login(user);
    this.loginForm.reset();
  }
}

