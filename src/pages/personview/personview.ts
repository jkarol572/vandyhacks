import { Component } from '@angular/core';

import { MenuController, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import * as firebase from 'firebase';


@Component({
    selector: 'page-personview',
    templateUrl: 'personview.html'
})
export class PersonView {
    person: any;
    constructor(private menu: MenuController, public navCtrl: NavController, private _auth: AuthService, public af: AngularFire, private navParams: NavParams,) {
       
    }
    ngOnInit(){
        this.person = this.navParams.get('split');
        console.log(this.person);
    }


}