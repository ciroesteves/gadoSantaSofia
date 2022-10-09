import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {
  isLoggedIn

  constructor(
    private nav: NavController,
    private auth: AngularFireAuth,
    private toast: ToastController,
  ) {
    this.isLoggedIn = this.auth.authState;
   }

  verificaLogged(){
    this.auth.authState.subscribe(data => {
      if (!(data && data.email && data.uid)){
        this.logout();
      }
    });
  }
  
  login(user){
    this.auth.signInWithEmailAndPassword(user.email, user.password)
    .then(() => this.nav.navigateForward('home'))
    .catch(() => this.showError());
  }
  
  logout(){
    this.auth.signOut().then(() => {
      this.nav.navigateBack('login');
    });
  }
  
  private async showError(){
    const ctrl = await this.toast.create({
      message: 'Dados de acesso incorretos',
      duration: 3000
  })
  ctrl.present()
  }
}