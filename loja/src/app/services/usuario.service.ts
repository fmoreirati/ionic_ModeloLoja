import { Injectable, Output } from '@angular/core';
import { Usuario } from '../model/usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private collection = "usuarios";

  constructor(
    private firedb: AngularFirestore,
    public auth: AngularFireAuth
  ) { }

  public add(usuario: Usuario) {
    return this.auth.createUserWithEmailAndPassword(usuario.email, usuario.pws).then(
      res => {
        return this.firedb.collection(this.collection).doc(res.user.uid).set(
          {
            nome: usuario.nome,
            email: usuario.email,
            //pws: usuario.pws,
            ativo: usuario.ativo
          }).catch(
            () => this.auth.currentUser.then(
             current => current.delete()
            )
          )
      }
    )
  }

  public get(key){
    return this.firedb.collection(this.collection).doc<Usuario>(key).valueChanges();
  }


}
