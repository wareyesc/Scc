import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { HomePage } from '../home/home';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  validations_form:FormGroup;
  fuerza: Array<string>;
  rangos: Array<string>;
  private nombres: FormGroup;

  constructor(public http: HttpClient,public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder) {}

  addRegister(data){
    var nomb=this.validations_form.value.nombres;
    var identifi=this.validations_form.value.ident;
    var apell=this.validations_form.value.apellidos;
    var cor=this.validations_form.value.correo;
    // VALIDACION DE ID NOMBRE FUERZA PUBLICA PARA ENVIAR JSON INI
    if(this.validations_form.value.fuerzap=="Policia"){
        this.validations_form.value.fuerzap="1";
    } else if(this.validations_form.value.fuerzap=="Armada"){
      this.validations_form.value.fuerzap="2";
    } else if(this.validations_form.value.fuerzap=="Ejército"){
      this.validations_form.value.fuerzap="3";
    } else if(this.validations_form.value.fuerzap=="Fuerza Aérea"){
      this.validations_form.value.fuerzap="4";
    } 
    var fuerza_publica=this.validations_form.value.fuerzap;
    // VALIDACION DE ID NOMBRE FUERZA PUBLICA PARA ENVIAR JSON FIN
    // VALIDACION DE ID RANGO FUERZA PUBLICA PARA ENVIAR JSON FIN
    if(this.validations_form.value.rango=="Subteniente"){
      this.validations_form.value.rango="1";
    } else if(this.validations_form.value.rango=="Teniente"){
      this.validations_form.value.rango="2";
    } else if(this.validations_form.value.rango=="Capitan"){
      this.validations_form.value.rango="3";
    } else if(this.validations_form.value.rango=="Mayor"){
      this.validations_form.value.rango="4";
    } else if(this.validations_form.value.rango="Teniente Coronel"){
      this.validations_form.value.rango="5";
    } else if(this.validations_form.value.rango="Coronel"){
      this.validations_form.value.rango="6";
    } else if(this.validations_form.value.rango="Brigadier General"){
      this.validations_form.value.rango="7";
    } else if(this.validations_form.value.rango="Mayor General"){
      this.validations_form.value.rango="8";
    } else if(this.validations_form.value.rango= "General"){
      this.validations_form.value.rango="9";
    }
    // VALIDACION DE ID RANGO FUERZA PUBLICA PARA ENVIAR JSON FIN
    var rangoFuerza=this.validations_form.value.rango;
    
   
   console.log(rangoFuerza);
    
    data={identificacion: identifi, nombres:nomb, apellidos:apell, 
    correo_electronico:cor, contraseña:"m", cod_n_f_publica:fuerza_publica, cod_rango: rangoFuerza, cod_tipo_usuario:"2"};
    //var postToSend2= JSON.stringify(postToSend);
    //console.log(postToSend2);
    var post=JSON.stringify(data);
    console.log(post);
    return new Promise((resolve, reject) => {
      this.http.post("http://54.224.238.170:8080/usuarios/fuerzapublica/", data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  ionViewWillLoad() {
    this.fuerza = [
     "Seleccionar",
      "Policia",
      "Ejército",
      "Armada",
      "Fuerza Aérea"
    ];
    this.rangos = [
      "Seleccionar",
      "Subteniente",
      "Teniente",
      "Capitan",
      "Mayor",
      "Teniente Coronel",
      "Coronel",
      "Brigadier General",
      "Mayor General",
      "General"
    ];

    this.validations_form = this.formBuilder.group({
      nombres: new FormControl('', Validators.compose([
        Validators.maxLength(25),
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required
      ])),
      ident: new FormControl('', Validators.compose([
        Validators.maxLength(12),
        Validators.minLength(7),
        Validators.pattern(''),
        Validators.required
      ])),
      apellidos: new FormControl('', Validators.compose([
        Validators.maxLength(15),
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*'),
        Validators.required
      ])),
      id: new FormControl('', Validators.compose([
        Validators.maxLength(5),
        Validators.minLength(5),
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])),
      correo: new FormControl('', Validators.compose([
        Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})'),
        Validators.required
      ])),
      fuerzap: new FormControl(this.fuerza[0], Validators.required),
      rango: new FormControl(this.rangos[0], Validators.required),
  });
}

validation_messages = {
  'nombres': [
    { type: 'required', message: 'Ingrese su nombre.' },
    { type: 'minlength', message: 'Su nombre debe tener al menos tres caracteres.' },
    { type: 'maxlength', message: 'Su nombre no puede contener más de 25 caracteres' },
    { type: 'pattern', message: 'Su nombre solo debe contener letras' }
  ],
  'ident': [
    { type: 'required', message: 'Ingrese su número de cedula.' },
    { type: 'minlength', message: 'Su identificación debe tener al menos siete números.' },
    { type: 'maxlength', message: 'Su identificación no debe contener más de doce números.' },
    { type: 'pattern', message: 'Su identificación solo debe contener números' }
  ],

'apellidos': [
  { type: 'required', message: 'Ingrese su apellido.' },
  { type: 'minlength', message: 'Su apellido debe tener al menos tres caracteres.' },
  { type: 'maxlength', message: 'Su apellido no puede contener más de 15 caracteres' },
  { type: 'pattern', message: 'Su apellido solo debe contener letras' }
], 
'id': [
  { type: 'required', message: 'Ingrese su código de identificación de su fuerza publica.' },
  { type: 'minlength', message: 'Su código debe tener al menos cinco caracteres.' },
  { type: 'maxlength', message: 'Su código no puede contener más de cinco caracteres' },
  { type: 'pattern', message: 'Su código debe contener letras y números' }
],
'correo': [
  { type: 'required', message: 'Su correo es requerido.' },
  { type: 'pattern', message: 'Ingrese un correo valido.' }
],
};
onSubmit(values){
  this.navCtrl.push(HomePage);
}
}
