import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  public key: any = null;
  public usuario: Usuario = new Usuario;
  public preview:string;

  constructor(
    private usuarioService: UsuarioService,
    private activatedRouter: ActivatedRoute,
    private camera: Camera,
    private router: Router,
    private sanitizer: DomSanitizer,
    private msg:MessageService
  ) { }

  ngOnInit() {
    this.verfifyUser();
  }

  async alterarFoto() {
    const options: CameraOptions = {
      quality: 50,
      //destinationType: this.camera.DestinationType.FILE_URI,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    await this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.preview = base64Image;
      this.preview = this.sanitizer.bypassSecurityTrustResourceUrl(base64Image) ? base64Image : null;
      console.log(this.preview);
      if (this.preview) {
         this.usuarioService.updatePhoto(this.preview, this.key).then(
          res => {
            console.log(res);
          },
          err => {
            console.error(err);
          }
        )
      }
    }, (err) => {
      this.preview = null;
      console.log(err);
    });
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
              if (resUser.photoURL) {
                this.usuario.foto = resUser.photoURL;
              }
              this.preview = this.usuario.foto ? this.usuario.foto : this.preview = null;

              console.log(this.usuario)
            }
          )
        }
      },
      () => this.router.navigate(['/'])
    );

  }

  removerUser(){
    this.usuarioService.remover(this.key).then(
      res => {
        this.router.navigate(["/"]);
        this.msg.presentAlert("Aviso", "Usuario Removido!");
      },
      err =>{
         this.msg.presentAlert("Aviso", "Usuario não foi removido!")
         console.log(err)
      }
    )
  }

}
