import { Component } from '@angular/core';

import { MenuController, NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import * as firebase from 'firebase';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class Home {
    constructor(private menu: MenuController, public navCtrl: NavController, private _auth: AuthService, public af: AngularFire) {
       
    }

}