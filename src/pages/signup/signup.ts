import { Component } from '@angular/core';

import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { Home } from '../home/home';
import { User } from '../../app/models/user';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';
import { states } from '../../app/states';


@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class Signup {
    users: FirebaseListObservable<any>;
    email: string;
    password: string;
    confirmPassword: string;
    first: string;
    last: string;
    username: string;
    state: string;
    states: any
    constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, private af: AngularFire, private _auth: AuthService, public toastCtrl: ToastController) {

    }

    ngOnInit() {
        this.states=states;

    }


    registerForm() {
        let loading = this.loadingCtrl.create({
            spinner: 'ios',
            content: 'Creating your account....'
        });
        loading.present();

        this._auth.createUserWithEmailAndPassword(this.email, this.password).then(() => {
            let user: any = firebase.auth().currentUser;
            let emailName = this._auth.getEmailName();//this.email.split('@')[0];
            let univ = this._auth.getUniversity();//universities[domain];
            console.log(this.state + "yeeeee")
            let newUser = new User(this.email, this.first, this.last, this.username, this.state);
            this.af.database.object('/users/' + emailName).set(newUser);

            this.toastCtrl.create({
                message: "Registered Successfully!",
                duration: 4000
            }).present();

            let newuser = this.af.database.object('users/' + this._auth.getEmailName());

            this.navCtrl.setRoot(Home);

        }).catch((error) => {
            this.toastCtrl.create({
                message: error.message,
                duration: 2000
            }).present();
        });
        loading.dismiss();
    }

    goToLogin() {
        //Sends user back to the login screen
        this.navCtrl.pop();
    }

}
