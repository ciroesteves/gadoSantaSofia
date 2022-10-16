import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {
  private compradoresCollection: AngularFirestoreCollection;
  
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private alertController: AlertController
  ) {
      this.compradoresCollection = this.db.collection('compradores');
  }

  getCompradores(){
    return this.compradoresCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
          return { id, ...data };
        });
      })/////
    )
  }

  getCompradorNome(id: string){
    return this.compradoresCollection.doc(id).valueChanges();
  }
}
