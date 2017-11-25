
import { Component } from '@angular/core';
import { Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { PictureUtils2 } from '../../services/pictureUtils2.service';
import { Observable } from 'rxjs/Observable';

import { AngularFireAuth } from 'angularfire2/auth';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Subscription } from 'rxjs/Subscription';
import { LoginPage } from '../login/login';
import { RealizarEncuestaPage } from '../realizar-encuesta/realizar-encuesta';
import { EstadisticasPage } from '../estadisticas/estadisticas';

@Component({
  selector: 'page-lector-qr',
  templateUrl: 'lector-qr.html',
})
export class LectorQrPage {

  codigo:string="";
  mostrarInfo=true;
  aula:string;
  materia:string;
  info:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,public auth:AuthProvider, public alertCtrl : AlertController,) {
      this.mostrarInfo=false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LectorQrPage');
  }
async leerCodigo(){
  let codigo='';
  const result = await this.barcodeScanner.scan({showTorchButton: true});
  codigo = await result.text;
  this.realizarAccion(codigo);}
  //this.scannedCodes.push(this.scannedCode);

  realizarAccion(code:string){
  if (code=="8c95def646b6127282ed50454b73240300dccabc​"){
  { if(this.auth.getUser()=="profesor@profesor.com"){
    let alert = this.alertCtrl.create({
      title: 'ERROR!',
      subTitle: 'Usted es profesor, no tiene autorizacion para leer el codigo!',
      buttons: ['OK']
  });
  alert.present();

  }
  if(this.auth.getUser()=="alumno@alumno.com"){
    this.mostrarInfo=true;
    this.aula="Aula 305";
    this.materia="Matematica discreta";
    this.info= "Profesor: Pepito  proximo parcial: 8/12/2017";
  }
}}
if (code=="ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172​"){
  { if(this.auth.getUser()=="alumno@alumno.com"){
    let alert = this.alertCtrl.create({
      title: 'ERROR!',
      subTitle: 'Usted es alumno, no tiene autorizacion para leer el codigo!',
      buttons: ['OK']
  });
  alert.present();

  }
  if(this.auth.getUser()=="profesor@profesor.com"){
    this.mostrarInfo=true;
    this.aula="Aula 305";
    this.materia="Metodologia";
    this.info= "Cantidad de alumnos 56 , proximo parcial: 8/12/2017";
  }
}}
if (code=="2786f4877b9091dcad7f35751bfcf5d5ea712b2f"){
  { if(this.auth.getUser()=="alumno@alumno.com"){
    let alert = this.alertCtrl.create({
      title: 'QR ENCUESTA!',
      subTitle: 'Bienvenido a la seccion encuestas!',
      buttons: ['OK']
  });
  alert.present();
  this.navCtrl.push(RealizarEncuestaPage);

  }
  if(this.auth.getUser()=="profesor@profesor.com"){
    let alert = this.alertCtrl.create({
      title: 'QR ENCUESTA!',
      subTitle: 'Estadisticas de las encuestas!',
      buttons: ['OK']
  });
  alert.present();
  this.navCtrl.push(EstadisticasPage);
  }
}}

}
}
