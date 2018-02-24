import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BotonesPage } from '../pages/botones/botones';
import { HomePage } from '../pages/home/home';
import { Home2Page } from '../pages/home2/home2';
import { LoginPage } from '../pages/login/login';
//import { GpsPage } from '../pages/gps/gps';
import { PagesGpsPage } from '../pages/pages-gps/pages-gps';
import { LectorQrPage } from '../pages/lector-qr/lector-qr';
import { TomarListaPage } from '../pages/tomar-lista/tomar-lista';
import { CrearEncuestaPage } from '../pages/crear-encuesta/crear-encuesta';
//import { LectorQrPage } from './lector-qr';
import { AuthProvider } from '../providers/auth/auth';
import { RealizarEncuestaPage } from '../pages/realizar-encuesta/realizar-encuesta';
import { DatePipe } from '@angular/common';



import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MiPerfilPage } from '../pages/mi-perfil/mi-perfil';
import { EstadisticasPage } from '../pages/estadisticas/estadisticas';
import { ModalAlumnoPage } from '../pages/modal-alumno/modal-alumno';
import { ModalProfesorPage } from '../pages/modal-profesor/modal-profesor';
import { ModalAdministrativoPage } from '../pages/modal-administrativo/modal-administrativo';

import { PictureUtils } from '../services/pictureUtils.service';
import { Encuesta } from '../services/encuesta.service';
import { PictureUtils2 } from '../services/pictureUtils2.service';
import { Camera } from '@ionic-native/camera';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
import { GraficoFaltasPage } from '../pages/grafico-faltas/grafico-faltas';
import { ListadoAlumnosPage } from '../pages/listado-alumnos/listado-alumnos';
import { ListadoPage } from '../pages/listado/listado';
import { EncuestasPage } from '../pages/encuestas/encuestas';
import { DescargaService } from '../services/descarga.service';
//import { LoginProvider } from '../providers/login/login';
import { KeysPipe } from '../pipes/keys/keys';
//import { Push } from '@ionic-native/push'
//csv




import {Http} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppComponent} from './app';


import {HttpClientModule, HttpClient} from '@angular/common/http';

import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

//import {HttpClientModule, HttpClient} from '@angular/http';
// Must export the config



export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const firebaseConfig = {
  
    apiKey: "AIzaSyAI6GG0LLsvrzPlu871VyAdDgbglonPelM",
    authDomain: "pps2017-75f93.firebaseapp.com",
    databaseURL: "https://pps2017-75f93.firebaseio.com",
    projectId: "pps2017-75f93",
    storageBucket: "pps2017-75f93.appspot.com",
    messagingSenderId: "96386419757"
  
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Home2Page,
    BotonesPage,
    LoginPage,
    LectorQrPage,
    TomarListaPage,
    MiPerfilPage,
    CrearEncuestaPage,
    RealizarEncuestaPage,
    ListadoAlumnosPage, 
    RealizarEncuestaPage,
    EstadisticasPage,
    ModalAlumnoPage,
    ModalAdministrativoPage,
    ModalProfesorPage,
    GraficoFaltasPage,
    ListadoPage,
    KeysPipe,
    EncuestasPage,
    PagesGpsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ChartsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    IonicModule.forRoot(MyApp),

    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage, 
    ModalAlumnoPage,
    LectorQrPage,
    Home2Page,
    BotonesPage,
    TomarListaPage,
    MiPerfilPage,
    CrearEncuestaPage,
    RealizarEncuestaPage,
    ListadoAlumnosPage,
    RealizarEncuestaPage,
    EstadisticasPage,
    ModalAdministrativoPage,
    ModalProfesorPage,
    GraficoFaltasPage,ListadoPage,EncuestasPage,
    PagesGpsPage
    
  ],
  providers: [
    PictureUtils,
    PictureUtils2,
    BarcodeScanner,
    Encuesta,
    Camera,
    GoogleMaps,    
    Geolocation,
    NativeGeocoder,
   // Push,
    DescargaService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },    
    AuthProvider,
    DatePipe
    
  ]
})
export class AppModule { }
