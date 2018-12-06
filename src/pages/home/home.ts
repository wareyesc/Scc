import { Component, NgModule } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { ConsultarPage } from '../consultar/consultar';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@NgModule({
  declarations: [
    ConsultarPage,
  ],
  imports: [
    HttpClientModule
  ],
})
export class HomePage {

  username:string;
  password:string;
  private todo : FormGroup;


  constructor(private formBuilder: FormBuilder ,public http: Http,public navCtrl: NavController, public alertCtrl: AlertController) {
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      title2: ['', Validators.required]
      
    });
  }

  

  Newlogin() {
    return new Promise(resolve => {
      let numIdentificacion=this.todo.value.title;
      let contraseña=this.todo.value.title2;
      var variable;
      var variableContraseña;
      let nom1;
      let nom;
      let nomCedu;
      let nomContraseña;
      this.http.get('http://54.224.238.170:9090/usuario/autenticacion/'+numIdentificacion).subscribe(data => {  
      variable=JSON.stringify(data);
      variableContraseña=JSON.stringify(data);
      nom=variable.replace(/"_body(.*)identificacion/g,"").slice(4);
      nomCedu=nom.replace(/"(.*)/g,"").slice(0,-2);
      nom1=variableContraseña.replace(/"_body(.*)contraseña/g,"").slice(6);
      nomContraseña=nom1.replace(/"(.*)/g, "").slice(0,-1);
      console.log(nomContraseña);
      resolve(data);
      if(numIdentificacion == nomCedu && contraseña==nomContraseña){
        const alert = this.alertCtrl.create({
          title: 'Acceso correcto',
          subTitle: 'Bienvenido',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.push(ConsultarPage);
    
    
    } else{
       const alert2 = this.alertCtrl.create({
    title: 'Datos Incorrectos',
    subTitle: 'Ingrese las credenciales correctas',
    buttons: ['OK']
  });
  alert2.present();
    }
      }, err => {
        console.log(err);
      });
    });
  }

login(){

if(this.username == "admin" && this.password == "admin"){

    const alert = this.alertCtrl.create({
      title: 'Acceso correcto',
      subTitle: 'Bienvenido',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push(ConsultarPage);


}
else{

  const alert2 = this.alertCtrl.create({
    title: 'Datos Incorrectos',
    subTitle: 'Ingrese las credenciales correctas',
    buttons: ['OK']
  });
  alert2.present();

}
}

goRegister(){
  this.navCtrl.push(RegistroPage);
}

}
