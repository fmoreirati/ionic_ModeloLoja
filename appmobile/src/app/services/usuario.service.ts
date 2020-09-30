import { Injectable, Output, Sanitizer } from '@angular/core';
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
            foto: usuario.foto = "",
            ativo: usuario.ativo
          }).catch(
            () => this.auth.currentUser.then(
              current => current.delete()
            )
          )
      }
    )
  }

  public get(key) {
    return this.firedb.collection(this.collection).doc<Usuario>(key).valueChanges();
  }

  updatePhoto(novaFoto: string, key: string) {
    return this.firedb.collection(this.collection).doc(key).update(
      {
        foto: novaFoto
      }
    );
  }

  update(usuario:Usuario, key: string) {
    return this.firedb.collection(this.collection).doc<Usuario>(key).update(usuario);
  }


  remover(key: string) {
    return this.firedb.collection(this.collection).doc<Usuario>(key).delete().then(
      res => this.auth.user.subscribe(
        resUser=> resUser.delete()
      )
    );
  }
}
