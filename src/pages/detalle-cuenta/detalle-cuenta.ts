import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Cuenta } from '../../model/cuenta';

/*
  Generated class for the DetalleCuenta page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detalle-cuenta',
  templateUrl: 'detalle-cuenta.html'
})
export class DetalleCuentaPage {

  cuenta: Cuenta
  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams) {
  	this.cuenta = navParams.get('cuenta');
  }

  dismiss() {
   this.viewCtrl.dismiss();
 }

}
