import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Api } from './api';
import { Pregunta } from '../model/pregunta';
import { Cuenta } from '../model/cuenta';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class User {
  _user: any
  token: string
  name: string
  preguntas: Pregunta[]
  cuentas: Cuenta[]

  constructor(public http: Http, public api: Api) {
  }

  login(accountInfo: any) {
    accountInfo = this.cargarHeadersAutorizations(accountInfo)
    let seq = this.api.post('authenticate', accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        
        if(res.success == true) {
          this.name = accountInfo.name
          this._loggedIn(res);
          this._setToken(res.token)
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  signup(accountInfo: any) {
    accountInfo = this.cargarHeadersAutorizations(accountInfo)
    let seq = this.api.post('signup', accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        if(res.status == 'success') {
          this._loggedIn(res);
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  actualizarCuentas(accountInfo: any) {
    accountInfo = this.cargarHeadersAutorizations(accountInfo)
    let seq = this.api.get('cuentas',{},  accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        
        if(res.success == true) {
          this.cuentas = <Cuenta[]>res.data
        } else {
          console.error('ERROR ACTUALIZANDO CUENTAS', res);
          return res.msg
        }
      }, err => {
        console.error('ERROR', err);
        return err.msg
      });

    return seq;
  }

  actualizarPreguntas(accountInfo: any) {
    accountInfo = this.cargarHeadersAutorizations(accountInfo)
    let seq = this.api.get('preguntas',{},  accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        
        if(res.success == true) {
          this.preguntas = <Pregunta[]>res.data
        } else {
          console.error('ERROR ACTUALIZANDO PREGUNTAS', res);
          return res.msg
        }
      }, err => {
        console.error('ERROR', err);
        return err.msg
      });

    return seq;
  }

  responderPregunta( accountInfo: any) {
    accountInfo = this.cargarHeadersAutorizations(accountInfo)
    let seq = this.api.post('responder', accountInfo).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        if(res.success == true) {
          this.preguntas.splice(0,1)
        } else {
        }
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  getPregunta() {
    if (this.preguntas)
      return this.preguntas[0]
    else
      return null
  }


  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }

  _setToken(token) {
    this.token = token
  }

  getToken( ) {
    return this.token
  }

  getName( ) {
    return this.name
  }

  cargarHeadersAutorizations(options) {
    if (!options) {
      options = new RequestOptions();
    }

    if (this.token) {
     var headers = new Headers();
     headers.append('Authorization', this.token);
     options.headers = headers 
    }

    return options
  }
}
