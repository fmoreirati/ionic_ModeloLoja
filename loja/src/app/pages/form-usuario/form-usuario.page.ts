import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.page.html',
  styleUrls: ['./form-usuario.page.scss'],
})
export class FormUsuarioPage implements OnInit {

  public usuario: Usuario = new Usuario;

  constructor(
    private usuarioService:UsuarioService,
  ) { }

  ngOnInit() {
  }

  onSubmit(form) {
    //console.log(this.usuario);
    if(form.valid){
      this.usuarioService.add(this.usuario).then(
        res=>{
          console.log("Cadastrado!\n", res);          
        },
        err=>{
          console.log("Erro:\n", err);
        }
      )
    }
  }
}
