import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { User } from '../../providers/user';

/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: {name: string, password: string} = {
    name: 'Nombre',
    password: 'password'
  };

  constructor(public navCtrl: NavController,
              public user: User,
              public toastCtrl: ToastController) {}

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
      this.navCtrl.push(LoginPage);
    }, (err) => {
	
      let toast = this.toastCtrl.create({
        message: err.msg,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
