import { OperacoesService } from './../../service/operacoes.service';
import { Gado } from 'src/app/interfaces/gado';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-geral',
  templateUrl: './geral.page.html',
  styleUrls: ['./geral.page.scss'],
})
export class GeralPage implements OnInit {
  public animais = new Array<Gado>();
  private animaisSubscription: Subscription;

  constructor(
    private operacoesService: OperacoesService,
    private modalCtrl: ModalController
  ) {
    this.animaisSubscription = this.operacoesService.getAnimais().subscribe(data => {
      this.animais = data;
    })
    
  }

  ngOnInit() {
    
  }

  ngOnDestroy(){
    this.animaisSubscription.unsubscribe();
  }
}