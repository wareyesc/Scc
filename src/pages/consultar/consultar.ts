import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';




/**
 * Generated class for the ConsultarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultar',
  templateUrl: 'consultar.html',
})
export class ConsultarPage {

  public CiudadanoQuery;
  private todo : FormGroup;
  private ListCiudadanos: any;
  public variable1: string;
  public variable2:string;
  public variable3:string;
  public items: any;
  public list:any;
  result: BarcodeScanResult;

  constructor(private formBuilder: FormBuilder ,public http: HttpClient, public navCtrl: NavController, public navParams: NavParams, public barcodeScanner: BarcodeScanner) {
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      
    });
    this.variable1;
    
  }
 
/**
  scan(){

    const options: BarcodeScannerOptions = {
        
      prompt : "Scan your barcode ",
      formats : "PDF_417",
      orientation : "landscape",
      showTorchButton : true,
      resultDisplayDuration : 15000,
      torchOn: true
    }

    this.barcodeScanner.scan(options).then(barcodeData => {
      console.log('Barcode data', barcodeData);
     }).catch(err => {
         console.log('Error', err);
     });
  }
 */
  async scanBsrcode(){
    try{

      const options: BarcodeScannerOptions = {
        
        prompt : "Escanea tu cédula ",
        formats : "PDF_417",
        orientation : "landscape",
        showTorchButton : true,
        resultDisplayDuration : 7000,
        torchOn: true
      }
      this.result = await this.barcodeScanner.scan(options);
    }
    catch(error){
      console.error(error);
    }
  }



  logChange(event) {
    console.log(event);
  }

  getUsers() {
    return new Promise(resolve => {
      let numIdentificacion=this.todo.value.title;
      
      this.http.get<UserResponse>('http://54.224.238.170:8090/registraduria/ciudadanos/' + numIdentificacion).subscribe(data => {
       //console.log(data.nombres);
        this.variable1 = JSON.stringify(data);
        this.variable2=JSON.stringify(data);
        this.variable3=JSON.stringify(data);
        let nom = this.variable1.slice(12);
        let nom2 = this.variable2;
        let nom3 = this.variable3;
        var nomAltered1=nom.replace(/(["])\W.*/g,"");
        var nomAltered2=nom2.replace(/"nombres"(.*)s":"/g, "");
        var nommAltered2= nomAltered2.replace(/","fecha_de_nacimiento"(.*)/g, "").slice(1);
        var nomAltered3=nom3.replace(/"nombres"(.*)l":/g, "");
        var nommAltered3=nomAltered3.replace(/,(.*)/g,"").slice(1);
        //nomAltered2.slice(0,-3);
        //console.log("VAR 2"+" "+this.variable2);
       // console.log(nomAltered1);
        //console.log(nommAltered2);
        console.log(nommAltered3);
        if(nommAltered3=="1"){
         nommAltered3="Estado judicial: Requerido";
        }
        else{
         nommAltered3="Estado judicial: No Requerido";
        }
        
        
       
        this.list=[
          {nombres:"Nombres:"+" "+nomAltered1},
          {apellidos:"Apellidos:"+" " + nommAltered2},
          {estado: nommAltered3 }
        ]
        //console.log(this.list);
        
        //this.ListCiudadanos=data;
        //console.log("datos"+this.ListCiudadanos);
        resolve(data);
        this.items=[
         {title:"sebastian"}
        ]
       // console.log(this.items);

      }, err => {
        console.log(err);
      });
    });
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConsultarPage');
  }

}

interface UserResponse {
  nombres: string;
  apellidos: string;
  fecha_de_nacimiento: string;
  lugar_de_nacimiento:string;
  fecha_de_expedicion: string;
  lugar_de_expedicion: string;
  estatura: string;
  rh:string;
  grupo_sanguineo:string;
  cod_estado_judicial:string;
}

