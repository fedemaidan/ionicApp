import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from './api';
import { User } from './user';
import 'rxjs/add/operator/map';

/*
  Generated class for the Mercadolibre provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MercadoLibre {

  constructor(public http: Http
  	, public api: Api
  	, public user: User) {
    
  }

  damePreguntas(accountInfo: any) {
    
    // let seq = this.api.post('preguntas', accountInfo).share();
    //completar luego
  }

  urlIniML(params: any) {
    var accountInfo = this.user.cargarHeadersAutorizations(null)
    let seq = this.api.get('iniciarConML', params, accountInfo).share();
    return seq;
  }

  logoutML() {
      return "https://www.mercadolibre.com/jms/mla/lgz/logout";
  }

}



