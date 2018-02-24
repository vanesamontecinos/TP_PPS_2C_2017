
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController  } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Usuario } from '../../clases/usuario';
import firebase from "firebase";

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  LatLng,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { ToastController } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult,
  NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
  import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  miUbicacion:any;
  user= { email : '', password : ''};
  private provider = {
    mail: '',
    nombre:'',
    foto:'',
    loggedin:false
  }
  LatLng: any;
  
  pais:string;
  idioms: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public auth1 : AuthProvider,
    public alertCtrl : AlertController,
    public auth:AngularFireAuth,
    private geolocation: Geolocation,
    public nativeGeocoder: NativeGeocoder,
    private translateService: TranslateService,
  public toaster: ToastController ) {
  
    this.idioms = [
      {
        value: 'es',
        label: 'Español'
      },
      {
        value: 'en',
        label: 'Ingles'
      },
      {
        value: 'fr',
        label: 'Frances'
      },
      {
        value: 'ru',
        label: 'Ruso'
      },
      {
        value: 'pt',
        label: 'Portugués'
      },
      {
        value: 'al',
        label: 'Aleman'
      }
    ];
     
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
   this.ObtenerUbicacion();

}
choose(lang) {
  this.translateService.use(lang);
}
ObtenerUbicacion(){

  
      this.geolocation.getCurrentPosition().then((geposition: Geoposition) => {
        //console.log(geposition);
    
      this.nativeGeocoder.reverseGeocode(geposition.coords.latitude, geposition.coords.longitude)
      .then((result: NativeGeocoderReverseResult) => {
      this.miUbicacion= result[0].countryName+","+result[0].administrativeArea+","+result[0].locality+","+result[0].thoroughfare+","+result[0].subThoroughfare;
      this.pais= result[0].countryName;
      //alert(this.pais);
      switch (this.pais) {
        case "Argentina":
        this.translateService.use('es');
            break;
        case "Rusia":
            this.translateService.use('ru');
                break;
        case "Francia":
                this.translateService.use('fr');
                    break; 
                    case "Brasil":
                    this.translateService.use('pt');
                        break;                
      }

       let country =this.toaster.create({
      message:'Estas en ' +result[0].countryName,
      duration:6000
    });
    country.present();
    
    }
    )
      .catch((error: any) => console.log(error));
  });
    
  
  
    }
  

  signin(){
    this.auth1.registerUser(this.user.email,this.user.password)
    .then((user) => {
      // El usuario se ha creado correctamente
    })
    .catch(err=>{
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: err.message,
        buttons: ['Aceptar']
      });
      alert.present();
    })

  }

  login() 
  {
    console.log("algo");
      this.auth1.loginUser(this.user.email,this.user.password ).then((user) => {
        console.log("algo2"); }
      )
       .catch(err=>{
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: err.message,
          buttons: ['Aceptar']
        });
        alert.present();
      })
    }
   
    administrador(){
      this.user.email='admin@admin.com';
      this.user.password='111111';
    }
    administrativo(){
      this.user.email='administrativo@administrativo.com';
      this.user.password='123456';
    }
    profesor(){
      this.user.email='profesor@profesor.com';
      this.user.password='123456';
    }
    alumno(){
      this.user.email='alumno@alumno.com';
      this.user.password='123456';
    }

}