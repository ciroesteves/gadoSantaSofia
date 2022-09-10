import { Gado } from './../interfaces/gado';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperacoesService {
  private animaisCollection: AngularFirestoreCollection<Gado>;
  location = 'uploads/';

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
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

  getLotesAnimais(parametro: string, faixa: number) {
    return this.animaisCollection.doc<Gado>(parametro).valueChanges();
  }

  addAnimal(gado: Gado) {
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
}