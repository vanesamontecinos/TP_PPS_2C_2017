import { Component, ViewChild } from '@angular/core';
import { Content,Platform, ActionSheetController, ToastController, IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable,FirebaseListObservable} from 'angularfire2/database';
import { Encuesta } from "../../app/clases/encuesta";
//import { NgxChartsModule } from '@swimlane/ngx-charts';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Observable} from 'rxjs/Observable';


/**
 * Generated class for the GraficoFaltasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-grafico-faltas',
  templateUrl: 'grafico-faltas.html',
})
export class GraficoFaltasPage {
  listavacia=[];
  lista2 =[];
  algo =[];
  otralista:Array<any>=new Array;
  mostrarGraficos:boolean=false;
  public ChartOptions1:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scaleShowValues: true,
    scaleValuePaddingX: 10,
    scaleValuePaddingY: 10/*
    animation: {
      onComplete: function () {
          var chartInstance = this.chart,
          ctx = chartInstance.ctx;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';
          this.data.datasets.forEach(function (dataset, i) {
              var meta = chartInstance.controller.getDatasetMeta(i);
              meta.data.forEach(function (bar, index) {
                  var data = dataset.data[index];
                  ctx.fillText(data, bar._model.x, bar._model.y - 5);
              });
          });
      }
    }*/
  };
  public ChartOptions2:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scaleShowValues: true,
    scaleValuePaddingX: 10,
    scaleValuePaddingY: 10};

  public ChartType1:string = 'bar';
  public ChartType2:string = 'pie';
  public ChartLegend:boolean = true;
  public ChartData1:any[];
  public ChartData2:any[];
  public ChartLabels1:string[];
  public ChartLabels2:string[];



  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl : AlertController,
    public actionSheetCtrl: ActionSheetController,
    public afDB: AngularFireDatabase) {
      this.mostrarGraficos=false;
      //this.Seleccionar();
      this.afDB.list('/TotalFaltas/').subscribe(e=>{
        e.forEach(res=>{
        })
        this.listavacia.forEach(element => {
           });
      }); 
      
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GraficoFaltasPage');
  }


  Seleccionar(dato:string){
 
    let presente:number=0;
    let ausente:number=0;
    let R:number=0;
    let M:number=0;
    let Si:number=0;
    let No:number=0;
    let PS:number=0;
  

    this.afDB.list('/TotalFaltas/'+dato+'/PPS/').subscribe(e=>{
      e.forEach(res=>{
         this.listavacia.push(res);
      
         console.log('res'+this.listavacia.length);  
      })
      this.listavacia.forEach(element => {
        console.log(element.presente);
        
       if (element.presente==true)
       {  presente++; }
       else{
        ausente++;
       }
         });
         console.log('mb'+presente+'b'+ausente);
          this.CargarDatos(presente,ausente);
     
    });

     this.mostrarGraficos=true;


     }


     CargarDatos(P:number,A:number){
      console.log(P+A);
      
     this.ChartData1 = [
      {data: [P], label: 'Presentes'},
      {data: [A], label: 'Ausentes'}]
      this.ChartData2 = [
        {data: [P,A]
        , borderColor: ['#000000'], borderWidth: [10]},  ];
        this.ChartLabels2 = ['Presentes','Ausentes'];
    
    }
    public chartClicked(e:any):void {
      console.log(e);
    }
    
    public chartHovered(e:any):void {
      console.log(e);
    }
    
}
