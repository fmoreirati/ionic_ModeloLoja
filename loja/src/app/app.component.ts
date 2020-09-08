import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuarioService } from './services/usuario.service';
import { verify } from 'crypto';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private usuarioService: UsuarioService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public user = null;
  public admin = null;

  ngOnInit() {
    this.verifUser();
  }

  ionViewWillEnter() {
    this.verifUser()
  }

  verifUser() {
    this.usuarioService.auth.user.subscribe(
      //this.usuarioService.auth.currentUser.then(
      res => {
        this.user = true;
        console.log(res);
      },
      () => this.user = false
    )
  }
}
