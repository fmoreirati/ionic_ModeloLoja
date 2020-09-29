import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../services/usuario.service';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public user: Usuario;
  public admin: boolean = false;

  constructor(
    public usuarioService: UsuarioService,
    public auth: AngularFireAuth
  ) { }

  ionViewWillEnter() {
    this.verifyUser()
  }

  verifyUser() {
    this.usuarioService.auth.currentUser.then(
      res => {
        if (res) {
          this.user = new Usuario;
          this.user.nome = res.displayName;
          this.user.email = res.email;
          this.user.foto = res.photoURL;
          this.user.uid = res.uid;
        } else {
          this.user = null;
        }
        console.log(this.user);
      }
    )
  }



}
