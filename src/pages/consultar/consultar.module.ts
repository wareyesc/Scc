import { IonicPageModule } from 'ionic-angular';
import { ConsultarPage } from './consultar';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    ConsultarPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultarPage),
    HttpClient
  ],
})
export class ConsultarPageModule {}


