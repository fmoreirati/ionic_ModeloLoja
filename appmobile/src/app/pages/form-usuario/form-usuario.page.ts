import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { MessageService } from 'src/app/services/message.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.page.html',
  styleUrls: ['./form-usuario.page.scss'],
})
export class FormUsuarioPage implements OnInit {

  public usuario: Usuario = new Usuario;
  public conf = "";
  private action = "";
  public key = "";

  constructor(
    private usuarioService: UsuarioService,
    private msg: MessageService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.action = this.activatedRouter.snapshot.paramMap.get("param");
    if (this.action == "atualizar") {
      this.verfifyUser();
    } else {
      this.usuario = new Usuario;
    }
  }

  onSubmit(form) {
    //console.log(this.usuario);
    if (form.valid) {
      if (this.key) {
        this.usuarioService.update(this.usuario, this.key).then(
          res => {
            console.log("Atualizado!\n", res);
            this.msg.presentAlert("Aviso", "Usuário atualizado!");
            this.router.navigate(["/tabs/perfilUser"]);
          },
          err => {
            console.log("Erro:\n", err);
            this.msg.presentAlert("Aviso", "Usuário não foi cadastrado!");
          })

      } else {
        this.usuarioService.add(this.usuario).then(
          res => {
            console.log("Cadastrado!\n", res);
            this.msg.presentAlert("Aviso", "Usuário cadastrado!");
            this.router.navigate(["/"]);
          },
          err => {
            console.log("Erro:\n", err);
            this.msg.presentAlert("Aviso", "Usuário não foi cadastrado!");
          }
        )
      }
    }
  }

  verfifyUser() {
    //this.key = this.activatedRouter.snapshot.paramMap.get("id");
    this.usuarioService.auth.user.subscribe(
      resUser => {
        if (resUser) {
          this.key = resUser.uid;
          this.usuarioService.get(this.key).subscribe(
            res => {
              this.usuario = res
              console.log(this.usuario)
            }
          )
        }
      },
      () => this.router.navigate(['/'])
    );


  }

}
