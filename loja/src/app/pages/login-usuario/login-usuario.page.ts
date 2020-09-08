import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.page.html',
  styleUrls: ['./login-usuario.page.scss'],
})
export class LoginUsuarioPage implements OnInit {

  public email:string ="";
  public pws:string = "";

  constructor(
    public usuarioService: UsuarioService,
    public router: Router,
    public msg: MessageService
  ) { }

  ngOnInit() {
  }

  onSubmit(form){
    this.login();
  }

  public login (){
    this.msg.presentLoading();
    this.usuarioService.auth.signInWithEmailAndPassword(this.email, this.pws).then(
      res => {
        this.msg.dismissLoading();
        this.router.navigate(['/']);
      },
      err => {
        this.msg.dismissLoading();
        this.msg.presentAlert("Erro: ", "Usuario ou senha invalidos!");
        console.error("Erro:", err);
      }
    )
  }

  public logout(){
    this.usuarioService.auth.signOut().then(
      () =>  this.router.navigate(['/'])
    )
  }

 
}
