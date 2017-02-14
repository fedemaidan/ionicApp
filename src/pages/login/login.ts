import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers/user';
import { PreguntasPage } from '../preguntas/preguntas';
import { SignupPage } from '../signup/signup';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {name: string, password: string} = {
    name: 'mariano',
    password: 'mariano'
  };
  
  constructor(public navCtrl: NavController,
              public user: User,
              public toastCtrl: ToastController) {

  }

  doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      if (resp.json().success == true)
    	  this.navCtrl.push(PreguntasPage);
      else
        {
          let toast = this.toastCtrl.create({
            message: resp.json().msg,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  registrarse() {
    this.navCtrl.push(SignupPage);
  }
}
