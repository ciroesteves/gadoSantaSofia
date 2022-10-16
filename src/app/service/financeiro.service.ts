import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {
  private compradoresCollection: AngularFirestoreCollection;
  
  constructor(
    private db: AngularFirestore,
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

  async addFornecedor(fornecedor: any){
    return await this.compradoresCollection.add(fornecedor);
  }

  getFornecedor(id: string){
    return this.compradoresCollection.doc(id).valueChanges();
  }

  updateFornecedor(id: string, fornecedor: any){
    return this.compradoresCollection.doc(id).update(fornecedor);
  }

  deleteFornecedor(id: string){
    return this.compradoresCollection.doc(id).delete();
  }

}
