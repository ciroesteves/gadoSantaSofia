import { Vacinacao } from './../interfaces/vacinacao';
import { Gado } from 'src/app/interfaces/gado';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map } from 'rxjs/operators';
import { Pesagem } from '../interfaces/pesagem';
import { AlertController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class OperacoesService {
  private animaisCollection: AngularFirestoreCollection<Gado>;
  location = 'uploads/';
  gado: Gado;

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private alertController: AlertController
  ) {
      this.animaisCollection = this.db.collection<Gado>('gado');
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

  async addAnimal(gado: Gado) {
    new Date(gado.nascimento);
    return this.animaisCollection.add(gado);
  }

  getAnimalId(id: string) {
    return this.animaisCollection.doc<Gado>(id).valueChanges();
  }

  updateAnimal(id: string, gado: Gado) {
    return this.animaisCollection.doc<Gado>(id).update(gado);
  }

  deleteAnimalId(id: string) {
    return this.animaisCollection.doc(id).delete();
  }

  async getanimalNumero(numero: number){
    return this.db.collection('gado').ref.where('numero', '==', numero).get();
  }

  async addPesagem(numero: number, pesagem: Pesagem){
    const animal = await this.getanimalNumero(numero);
    if (!animal.empty) {
      animal.forEach(doc => {
        return this.animaisCollection.doc(doc.id).collection('pesagem').doc(pesagem.data.toString()).set({data: pesagem.data, peso: pesagem.peso});
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
        return this.animaisCollection.doc<Gado>(doc.id).update({peso: peso});
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
}