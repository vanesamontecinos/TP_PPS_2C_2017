
import { Component } from '@angular/core';
import { Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { Encuesta } from '../../services/encuesta.service';
import { Observable } from 'rxjs/Observable';
import { BotonesPage } from '../botones/botones';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as firebase from 'firebase';

@Component({
  selector: 'page-encuestas',
  templateUrl: 'encuestas.html',
})
export class EncuestasPage {
  unaLista: Array<any> = new Array;
  preguntaSeleccionada:string;
  tituloSeleccionado:string;
  opcionSeleccionada:string;
  mostrarEncuesta:boolean;
  mostrarTodas:boolean;
  respuesta:string;
  Unalista:FirebaseListObservable<any>;
  fecha:Date;
  fechastring:string;
  date:string;
  respuestaTexto:string='';
  id:string;
  mostrarForm:boolean;
  unafecha:string;
 // laencuesta:Encuesta;
  form: FormGroup;


  constructor(public navCtrl: NavController, public datePipeCtrl: DatePipe,public navParams: NavParams,
    public platform: Platform,public auth : AuthProvider,
    public alertCtrl : AlertController,
     public afDB: AngularFireDatabase, 
     public actionSheetCtrl: ActionSheetController,private fb: FormBuilder,
      private pictureUtils: Encuesta){
      this.ObtenerLista();
      this.mostrarEncuesta=false;
      this.mostrarTodas=true;
      this.fecha =new Date();
      console.log(this.fecha);
      console.log(this.fecha.getMonth());
      this.fechastring=this.fecha.getFullYear()+'-'+this.fecha.getMonth()+'-'+this.fecha.getDate();
      console.log(this.fechastring);
       this.date = this.datePipeCtrl.transform(Date.now(), 'yyyy-MM-dd');
      console.log(this.date);
     // this.laencuesta=new Encuesta();
      this.form = this.fb.group({
            fecha: ["", [Validators.required]],
            
              titulo: ["", [Validators.required]],
              pregunta: ["", [Validators.required]]
                       
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RealizarEncuestaPage');
  }
  ObtenerLista() {
    this.afDB.list('encuestas/', { preserveSnapshot: true }).subscribe((snapshots: any) => {
      snapshots.forEach((snapshot, index) => {
        this.unaLista[index] = snapshot.val();
      });
    });
  }



  Seleccionar(titulo:string,pregunta:string,opcion:string,key:string,fecha:string){
this.tituloSeleccionado=titulo;
console.log(pregunta);
console.log(titulo);
this.preguntaSeleccionada=pregunta;
this.opcionSeleccionada=opcion;
this.id=key;
this.unafecha=fecha;
this.mostrarTodas=false;
this.mostrarForm=true;
this.mostrarEncuesta=true;

  }

  eliminar(titulo:string,pregunta:string,opcion:string,key:string,fecha:string){
    this.tituloSeleccionado=titulo;
    console.log(pregunta);
    console.log(titulo);
    this.preguntaSeleccionada=pregunta;
    this.opcionSeleccionada=opcion;
    this.id=key;
    this.unafecha=fecha;
    this.mostrarTodas=false;
    this.mostrarForm=true;
    this.mostrarEncuesta=true;
    var postData = {
      titulo:titulo,
      pregunta:pregunta,
      fecha:fecha,
      opcion:opcion,
      key:this.id,
      activa:false,
      eliminada:true
      
    };

    var updates = {};
    updates['/encuestas/' + this.id] = postData;
   // updates['/respuestaEncuestas/' + newPostKey] = postData;
  
     firebase.database().ref().update(updates);
     
    let alert = this.alertCtrl.create({
      title: 'Felicitaciones!',
      subTitle: 'La encuesta ha sido eliminada con exito!',
      buttons: ['OK']
  });
  alert.present();
    console.log(this.form);
    this.navCtrl.push(BotonesPage);
  }

  GuardarCambios(){
   
    var postData = {titulo:this.form.value.titulo,
      pregunta:this.form.value.pregunta,
      fecha:this.form.value.fecha,
      opcion:this.opcionSeleccionada,
      key:this.id,
      activa:true,
      eliminada:false    
    };
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/encuestas/' + this.id] = postData;
   firebase.database().ref().update(updates);
     

    let alert = this.alertCtrl.create({
      title: 'Felicitaciones',
      subTitle: 'La encuesta ha sido modificada con exito!',
      buttons: ['OK']
  });
  alert.present();
    console.log(this.form);
    this.navCtrl.push(BotonesPage);


  }

}
