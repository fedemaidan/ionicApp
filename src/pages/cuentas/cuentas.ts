import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';
import { Cuenta } from '../../model/cuenta';
import { InAppBrowser } from 'ionic-native';
import { User } from '../../providers/user';
import { MercadoLibre } from '../../providers/mercadolibre';
import { ModalController } from 'ionic-angular';
import { DetalleCuentaPage } from '../detalle-cuenta/detalle-cuenta';
import { PreguntasPage } from '../preguntas/preguntas';

import 'rxjs/add/operator/map';
 
@Component({
  selector: 'cuentas-home',
  templateUrl: 'cuentas.html'
})
export class CuentasPage implements OnInit {
 
  posts: any
  cuentas: Cuenta[]

  constructor(public user: User,
              public mercadolibre: MercadoLibre,
              public navCtrl: NavController,
              public toastCtrl: ToastController,
              public modalCtrl: ModalController,
              public platform: Platform) {}

  ngOnInit() {
    this.user.actualizarCuentas({})
  }

  verDetalleCuenta(cuenta) {
    let cuentaDetalleModal = this.modalCtrl.create(DetalleCuentaPage, {cuenta: cuenta});
    cuentaDetalleModal.present();
  }

  agregarNuevaCuenta() {
    var url
    let browser
    var accountInfo = { user: this.user.getName()}

    this.mercadolibre.urlIniML(accountInfo).map(
      res => res.json()).subscribe(data => {
        var logout = this.mercadolibre.logoutML();
        browser = new InAppBrowser(logout, '_self');
        setTimeout( () => {
          url = data.url;
          browser = new InAppBrowser(url, '_system');  
        }, 1000)
    })
  } 

  verPreguntas() {
    this.navCtrl.push(PreguntasPage);
  }
}