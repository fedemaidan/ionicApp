import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { User } from '../providers/user';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform,
              user: User
            ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      user.actualizarPreguntas({})
      user.actualizarCuentas({})
      setInterval( () => { 
              user.actualizarPreguntas({})
              user.actualizarCuentas({})
            }, 30000)
    });


  }
}
