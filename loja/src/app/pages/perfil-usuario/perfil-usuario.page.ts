import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {

  public key: any;
  public usuario: Usuario;
  public preview = null;

  constructor(
    private usuarioService: UsuarioService,
    private activatedRouter: ActivatedRoute,
    private camera: Camera
  ) { }

  ngOnInit() {
    this.key = this.activatedRouter.snapshot.paramMap.get("id");
    if (this.key) {
      this.usuarioService.get(this.key).subscribe(
        res => {
          this.usuario = new Usuario;
          this.usuario = res
          this.usuario.foto ? this.preview = this.usuario.foto : this.preview = null;
        }
      )
    }


  }

  alterarFoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.preview = base64Image;
    }, (err) => {
      this.preview = null;
      console.log(err);
      
    });
  }

}
