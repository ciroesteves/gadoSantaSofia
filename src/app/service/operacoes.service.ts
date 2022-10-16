import { Pesagem } from './../interfaces/pesagem';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class OperacoesService {
  private animaisCollection: AngularFirestoreCollection;
  location = 'uploads/';

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private alertController: AlertController
  ) {
      this.animaisCollection = this.db.collection('gado');
     }

  imageName(){
    const newTime = Math.floor(Date.now() / 1000);
    return String(Math.floor(Math.random() * 20) + newTime);
  }

  async storeImage(imageData: any) {
    const imageName = this.imageName();
    return new Promise((resolve, reject) => {
      const pictureRef = this.storage.ref(this.location + imageName);
      pictureRef.put(imageData).then(function () {
        pictureRef.getDownloadURL().subscribe((url: any) => {
          resolve(url);
        });
      });
    })
  }

  getAnimais(){
    return this.animaisCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  async addAnimal(gado: any) {
    const animal = await this.getanimalNumero(gado.numero);
    if (animal.empty) {
      new Date(gado.nascimento);
      const alert = await this.alertController.create({
        header: 'Sucesso',
        subHeader: 'Animal: ' + gado.numero,
        message: 'Animal cadastrado com sucesso!',
        buttons: ['OK'],
      });
      await alert.present()
      return this.animaisCollection.add(gado);
    } else {
      const alert = await this.alertController.create({
        header: 'Erro',
        subHeader: 'Animal: ' + gado.numero,
        message: 'Animal ativo existente!',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }
  }

  getAnimalId(id: string) {
    return this.animaisCollection.doc(id).valueChanges();
  }

  updateAnimal(id: string, gado: any) {
    return this.animaisCollection.doc(id).update(gado);
  }
  

  deleteAnimalId(id: string) {
    return this.animaisCollection.doc(id).delete();
  }

  async getanimalNumero(numero: number){
    return this.db.collection('gado').ref.where('numero', '==', numero).where('status', '==', 'vivo').get();
  }

  async addPesagem(numero: number, pesagem: Pesagem){
    const animal = await this.getanimalNumero(numero);
    if (!animal.empty) {
      animal.forEach(doc => {
        return this.animaisCollection.doc(doc.id).collection('pesagem').doc().set({data: pesagem.data, peso: pesagem.peso});
      });
      const alert = await this.alertController.create({
        header: 'Sucesso',
        subHeader: 'Animal: ' + numero,
        message: 'Cadastro realizado',
        buttons: ['OK'],
      });
  
      await alert.present();
      return;
    } else{
      const alert = await this.alertController.create({
        header: 'Erro',
        subHeader: 'Animal: ' + numero,
        message: 'Animal não encontrado',
        buttons: ['OK'],
      });
  
      await alert.present();
      return;
    }
  }

  async addCampoPeso(numero: number, peso: number){
    const animal = await this.getanimalNumero(numero);
    if (!animal.empty) {
      animal.forEach(doc => {
        return this.animaisCollection.doc(doc.id).update({peso: peso});
      });
    }
  }

  async addVacinacao(numero: number, vacinacao: any){
    const animal = await this.getanimalNumero(numero);
    if (!animal.empty) {
      animal.forEach(doc => {
        return this.animaisCollection.doc(doc.id).collection('vacinacao').doc(vacinacao.vacina).set({data: vacinacao.data}); 
      });
      const alert = await this.alertController.create({
        header: 'Sucesso',
        subHeader: 'Animal: ' + numero,
        message: 'Cadastro realizado',
        buttons: ['OK'],
      });
  
      await alert.present();
      return;
    } else{
      const alert = await this.alertController.create({
        header: 'Erro',
        subHeader: 'Animal: ' + numero,
        message: 'Animal não encontrado',
        buttons: ['OK'],
      });
  
      await alert.present();
      return;
    }
  }

  getPesagemId(id: string){
    return this.db.collection('gado').doc(id).collection('pesagem').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
          return { id, ...data };       
        });
      })
    )
  }

  getVacinacaoId(id: string){
    return this.db.collection('gado').doc(id).collection('vacinacao').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  addstatus(id: string, statusAnimal: string){
    return this.db.collection('gado').doc(id).update({status: statusAnimal});
  }

  addDadosMorte(id: string, formMorte: any){
    this.addstatus(id, 'morto');
    return this.animaisCollection.doc(id).collection('morte').doc().set(formMorte);
  }

  addDadosVenda(id: string, formVenda: any){
    this.addstatus(id, 'vendido');
    return this.animaisCollection.doc(id).collection('venda').doc().set(formVenda);
  }

  async getAnimaisVendedor(id: string){
    const animais = await this.animaisCollection.ref.where('vendedor', '==', id).get();
    if(animais.size > 0){
      const alert = await this.alertController.create({
        header: 'Erro',
        subHeader: 'Falha na exclusão',
        message: 'Fornecedor vinculado a negociações',
        buttons: ['OK'],
      });
  
      await alert.present();
      return animais.size;
    }else {
      const alert = await this.alertController.create({
        header: 'Sucesso',
        subHeader: 'Exclusão finalizada',
        message: 'Fornecedor foi excluído definitivamente',
        buttons: ['OK'],
      });
  
      await alert.present();
      return animais.size;
    }
  }
}