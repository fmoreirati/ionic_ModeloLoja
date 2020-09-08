import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  async presentAlert(tipo: string, texto: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: tipo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }


  async presentLoading(texto = "Aguarde..") {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: texto,
      //duration: 1000
    });
    await loading.present();
  }


  async dismissLoading() {
    await this.loadingController.dismiss();
    console.log('Loading dismissed!');
  }
}
