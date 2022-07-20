import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Gado } from 'src/app/interfaces/gado';
import { OperacoesService } from 'src/app/service/operacoes.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  private gadoId: string = null;
  public gado: Gado = {
    numero: 0,
    nome: '',
    raca: '',
    sexo: '',
    nascimento: undefined,
    peso: 0,
    lote: '',
    rascunho: '',
    pai: 0,
    mae: 0,
    foto: ''
  };
  private loading: any;
  private productSubscription: Subscription;
  detalheForm: FormGroup;
  public nasc;

  constructor(
    private operacoesService: OperacoesService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
  ) {
    this.gadoId = this.activatedRoute.snapshot.params['id'];

    if (this.gadoId){
      this.carregarAnimal();
    } else{
      this.navCtrl.navigateBack('/geral');
    }
  }

  ngOnInit() {
    
   }

  carregarAnimal() {
    this.productSubscription = this.operacoesService.getAnimalId(this.gadoId).subscribe(data => {
      this.gado = data;
      this.nasc = this.gado.nascimento;
      this.nasc = new Date(this.nasc.seconds * 1000);
      this.nasc = this.formatDate(this.nasc);
    });
  }

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }
}
