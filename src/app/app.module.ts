import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CuentasPage } from '../pages/cuentas/cuentas';
import { DetalleCuentaPage } from '../pages/detalle-cuenta/detalle-cuenta';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { PreguntasPage } from '../pages/preguntas/preguntas';
import { User } from '../providers/user';
import { Api } from '../providers/api';
import { MercadoLibre } from '../providers/mercadolibre';

@NgModule({
  declarations: [
    MyApp,
    CuentasPage,
    LoginPage,
    SignupPage,
    DetalleCuentaPage,
    PreguntasPage
    ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CuentasPage,
    LoginPage,
    SignupPage,
    DetalleCuentaPage,
    PreguntasPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, User, Api, MercadoLibre]
})
export class AppModule {}
