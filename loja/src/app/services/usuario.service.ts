import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private collection = "usuarios";

  constructor(
    private firedb: AngularFirestore
  ) { }

  public add(usuario: Usuario) {
    return this.firedb.collection(this.collection).add(
      {
        nome: usuario.nome,
        email: usuario.email,
        pws: usuario.pws,
       ativo: usuario.ativo      
      }
    );
  }
}
