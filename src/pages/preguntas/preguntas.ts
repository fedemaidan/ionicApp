import { Component } from '@angular/core';
import { NavController, ToastController, Platform } from 'ionic-angular';
import { Pregunta } from '../../model/pregunta';
import { User } from '../../providers/user';
import { CuentasPage } from '../cuentas/cuentas';
import { InAppBrowser } from 'ionic-native';


@Component({
  selector: 'page-preguntas',
  templateUrl: 'preguntas.html'
})
export class PreguntasPage {

  respuesta: string

  constructor(public user: User,
  			 public navCtrl: NavController,
  			 public toastCtrl: ToastController,) {}

  ngOnInit() {
    this.user.actualizarPreguntas({});
    
  }

  verPublicacion(pregunta) {
    new InAppBrowser(pregunta.item.permalink, '_system');
  }

  enviar() {
    var pregunta = this.user.getPregunta()
    this.user.responderPregunta( {
                                    user_id_ml: pregunta.seller_id, 
                                    question_id: pregunta.question_id, 
                                    text: this.respuesta 
                                  })
    .map(resp => resp.json())
    .subscribe((respuesta) => {
       this.respuesta = ""
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: err.message,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });    
  }

  saltear() {
    
  }

  stock() {

  }

  ubicacion() {

  }

  envio() {

  }

  verCuentas() {
  	this.navCtrl.push(CuentasPage);
  }
}
