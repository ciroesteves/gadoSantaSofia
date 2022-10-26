import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/service/autenticacao.service';
import { OperacoesService } from 'src/app/service/operacoes.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-vacinacao',
  templateUrl: './vacinacao.page.html',
  styleUrls: ['./vacinacao.page.scss'],
})
export class VacinacaoPage implements OnInit {
  vacinacaoForm: FormGroup;
  vacinacao: any;
  private animaisSubscription: Subscription;
  private raivas = new Array();

  constructor(
    private loginService: AutenticacaoService,
    private builder: FormBuilder,
    private service: OperacoesService,
    private modalCtrl: ModalController
  ) {
    this.loginService.verificaLogged();
    function buscarVivo(value) {
      if(value.status == 'vivo'){
        return value
      }
    }
    function buscarRaiva(value) {
      if(value.id == 'Raiva'){
        return value
      }
    }
    this.animaisSubscription = this.service.getAnimais().subscribe(data => {
      data.map(data2 => {
        this.service.getVacinacaoId(data2.id).subscribe(data3 => {
          this.raivas = data3.map(data4 => {
            return data4;
          })
          console.log(this.raivas.filter(buscarRaiva))
        })
      })
    })
  }

  ngOnInit() {
    this.vacinacaoForm = this.builder.group({
      numero: ['', [Validators.required]],
      vacina: ['', [Validators.required]],
      data: ['', [Validators.required]],
    });
  }

  addvacinacaoAnimal() {
    this.vacinacao = this.vacinacaoForm.value;
    this.vacinacao.data = new Date(this.vacinacao.data);
    this.service.addVacinacao(this.vacinacao.numero, this.vacinacao);
    this.vacinacaoForm.reset();
  }

  limparForm() {
    this.vacinacaoForm.reset();
  }

  cancel() {
    this.modalCtrl.dismiss();
  }

}
