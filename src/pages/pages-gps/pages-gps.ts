import { Component } from '@angular/core';
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
import { IonicPage,NavController, NavParams,AlertController, ToastController } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult,
  NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
  import { TranslateService } from '@ngx-translate/core';
//$IMPORTSTATEMENT

/**
 * Generated class for the PagesGpsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//$IONICPAGE
@Component({
  selector: 'page-pages-gps',
  templateUrl: 'pages-gps.html',
})
export class PagesGpsPage {
  map: GoogleMap;
  LatLng: any;
  miUbicacion:any;
  pais:string;
  idioms: any[] = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private googleMaps: GoogleMaps,
    private geolocation: Geolocation,
    public nativeGeocoder: NativeGeocoder,
    private translateService: TranslateService,
  public toaster: ToastController) 
   {
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
      }
    ];
     // this.loadMap();
  }



  ionViewDidLoad() {
    
   this.ObtenerUbicacion();
    //this.loadMap();
  // this.loadGoogleMap();

  }

  ObtenerUbicacion(){


    this.geolocation.getCurrentPosition().then((geposition: Geoposition) => {
      console.log(geposition);
      // resp.coords.latitude
      // resp.coords.longitude
    this.loadMap(geposition); 

    /*this.nativeGeocoder.reverseGeocode(52.5072095, 13.1452818)
    .then((result: NativeGeocoderReverseResult) => alert(JSON.stringify(result)))
    .catch((error: any) => console.log(error));

    this.nativeGeocoder.reverseGeocode(52.5072095, 13.1452818)
    .then((result: NativeGeocoderReverseResult) => 
    alert("The address is: \n\n" + JSON.stringify(result[0]))
  
  )
    .catch((error: any) => console.log(error));*/
  
    this.nativeGeocoder.reverseGeocode(geposition.coords.latitude, geposition.coords.longitude)
    .then((result: NativeGeocoderReverseResult) => 
    this.miUbicacion= result[0].countryName+","+result[0].administrativeArea+","+result[0].locality+","+result[0].thoroughfare+","+result[0].subThoroughfare
    
  )
    .catch((error: any) => console.log(error));



    this.nativeGeocoder.reverseGeocode(geposition.coords.latitude, geposition.coords.longitude)
    .then((result: NativeGeocoderReverseResult) => 
    { this.pais= result[0].countryName;
     // alert(this.pais);
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
      }

       let country =this.toaster.create({
      message:'Estas en ' +result[0].countryName,
      duration:9000
    });
    country.present();
  })
   
   this.nativeGeocoder.forwardGeocode('Berlin')
    .then((coordinates: NativeGeocoderForwardResult) => console.log('The coordinates are latitude=' + coordinates[0].latitude + ' and longitude=' + coordinates[0].longitude))
    .catch((error: any) => console.log(error));

    }).catch((error) => {
       console.log('Error getting location', error);
       //alert('error');
       //alert(error);
     });
     


  }



  loadMap(position){
    let element: HTMLElement= document.getElementById('map');
    let map : GoogleMap=this.googleMaps.create(element);
    let latlng= new LatLng(position.coords.latitude,position.coords.longitude);
    map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      let position: CameraPosition<any>={
        target: latlng,
        zoom:15,
        tilt:30
      };
      map.moveCamera(position);

      let markerOptions:MarkerOptions ={
      position:latlng,
      title:'Aqui estoy!'
    };

    let marker= map.addMarker(markerOptions)
    .then((marker:Marker)=>{
      marker.showInfoWindow();
    });
    })
  }
/*
  loadGoogleMap(){
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create('map_canvas', mapOptions);    
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: 43.0741904,
              lng: -89.3809802
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                  
              });
          });

      });
  }


  loadMap() {
    
        let mapOptions: GoogleMapOptions = {
          camera: {
            target: {
              lat: 43.0741904,
              lng: -89.3809802
            },
            zoom: 18,
            tilt: 30
          }
        };
    
        this.map = GoogleMaps.create('map_canvas', mapOptions);
    
        // Wait the MAP_READY before using any methods.
        this.map.one(GoogleMapsEvent.MAP_READY)
          .then(() => {
            console.log('Map is ready!');
    
            // Now you can use all methods safely.
            this.map.addMarker({
                title: 'Ionic',
                icon: 'blue',
                animation: 'DROP',
                position: {
                  lat: 43.0741904,
                  lng: -89.3809802
                }
              })
              .then(marker => {
                marker.on(GoogleMapsEvent.MARKER_CLICK)
                  .subscribe(() => {
                    alert('clicked');
                  });
              });
    
          });
      }
  loadMap1(){
    
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: {
            lat: 43.0741904, // default location
            lng: -89.3809802 // default location
          },
          zoom: 18,
          tilt: 30
        }
      };
    
      this.map = GoogleMaps.create('map_canvas', mapOptions);
    
      // Wait the MAP_READY before using any methods.
      this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        // Now you can use all methods safely.
        this.getPosition();
      })
      .catch(error =>{
        console.log(error);
      });
    
    }
    getPosition(): void{
      this.map.getMyLocation()
      .then(response => {
        this.map.moveCamera({
          target: response.latLng
        });
        this.map.addMarker({
          title: 'My Position',
          icon: 'blue',
          animation: 'DROP',
          position: response.latLng
        });
      })
      .catch(error =>{
        console.log(error);
      });
    }*/
}
