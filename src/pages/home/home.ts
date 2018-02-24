import { Component } from '@angular/core';
import { Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { PictureUtils } from '../../services/pictureUtils.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: FirebaseListObservable<any[]>;
  alumnos: Array<any>;
  fechaSeleccionada:string;
  aulaSeleccionada:string;
  materiaSeleccionada:string;
  divisionSeleccionada:string;

  mostrarListado:boolean=false;
  userAvatarPicture: Array<any> = new Array;//User picture array bcz we got random pic name
  constructor(public platform: Platform,public auth : AuthProvider,
    public alertCtrl : AlertController,
     public afDB: AngularFireDatabase, public actionSheetCtrl: ActionSheetController, private pictureUtils: PictureUtils) {
     this.refreshPicture(); 
     this.alumnos = new Array<any>();
     
  }
  cerrarSesion(){
    this.auth.logout();
}
listado(){
 this.items = this.afDB.list ('Fotos');

}
refreshPicture() {
    this.afDB.list('Fotos/', { preserveSnapshot: true }).subscribe((snapshots: any) => {
      snapshots.forEach((snapshot, index) => {
        this.userAvatarPicture[index] = snapshot.val();
        console.log(this.userAvatarPicture[index].foto);
      });
    });
  }

  ionViewDidLoad() {
 
  }
  modificar(legajo:string,nombre:string,apellido:string,p:boolean){

    console.log(p);
    var esta=p;
    var b:boolean;
    if (p){
     // console.log('jajaja');
   b=false;}
  else {
    //console.log('jejejeej');
    b=true;}
    console.log('b'+b);
    var postData = {
      nombre:nombre,
      apellido:apellido,
      legajo:legajo,
      presente:b
    };

    var updates = {};
    updates['Lista/'+this.divisionSeleccionada+'/'+this.materiaSeleccionada+'/'+this.aulaSeleccionada+'/'+this.fechaSeleccionada+'/'+legajo] = postData;
 
     firebase.database().ref().update(updates); 
    this.VerAlumnos(this.fechaSeleccionada,this.aulaSeleccionada,this.materiaSeleccionada,this.divisionSeleccionada); 
 
  }
  VerAlumnos(fecha:string,aula:string,materia:string,division:string){
    this.alumnos = new Array<any>();
    this.mostrarListado=true;
    this.fechaSeleccionada=fecha;
    this.aulaSeleccionada=aula;
    this.materiaSeleccionada=materia;
    this.divisionSeleccionada=division;
    //console.log(this.mostrarListado,fecha,aula,materia);
    //console.log('Lista/'+division+'/'+materia+'/'+aula+'/'+fecha+'/');
    this.afDB.list('Lista/'+division+'/'+materia+'/'+aula+'/'+fecha+'/', { preserveSnapshot: true }).subscribe((snapshots: any) => {
      snapshots.forEach((snapshot, index) => {
        this.alumnos[index] = snapshot.val();
        //console.log(this.userAvatarPicture[index].foto);
      });
    });
  
  } 


}
