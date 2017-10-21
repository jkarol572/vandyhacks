import { Component } from '@angular/core';

import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Signup } from '../signup/signup';
import { Home } from '../home/home';


import { AuthService } from '../../providers/auth-service';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import * as firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  email: string;
  password: string;


  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, private af: AngularFire, private _auth: AuthService, public toastCtrl: ToastController) {

  }

  ionViewDidEnter() {
  }


  goToRegister() {
    this.navCtrl.push(Signup);
  }

  loginForm() {
    if (this.email && this.password) {
      let loading = this.loadingCtrl.create({
        spinner: 'ios',
        content: 'Logging you in....'
      });
      loading.present();
      this._auth.signInWithEmail(this.email, this.password).then((response) => {
        this._auth.setEmail(response.auth.email);

        let usern: any = firebase.auth().currentUser;

        this.navCtrl.setRoot(Home);

        loading.dismiss();
      }).catch((error) => {
        this.toastCtrl.create({
          message: error.message,
          duration: 2000
        }).present();
        loading.dismiss();

      });
    } else {
      this.toastCtrl.create({
        message: "Please do not leave you email or password blank.",
        duration: 2000
      }).present();
    }
  }

}
