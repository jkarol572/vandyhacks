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
    reps: any;
    myInput: string;
    constructor(private menu: MenuController, public navCtrl: NavController, private _auth: AuthService, public af: AngularFire) {
       
    }
    ngOnInit(){
        this.myInput="";
        //Grab all of the reps
        var repsref = this.af.database.list('/reps/', {
            query: {
                 orderByChild: 'first_name',
            }});


        var groupSubscription = repsref.subscribe((data) => {
            console.log(data);
            this.reps=data;
        });
    }

    findPerson(){
        var repsref = this.af.database.list('/reps/', {
            query: {
                 orderByChild: 'first_name',
                // equalTo: "Justin"
                startAt: this.myInput,
                endAt: this.myInput+"\uf8ff",
                once: "value"
            }});


        var groupSubscription = repsref.subscribe((data) => {
            console.log(data);
            this.reps=data;
        });

        var repsref = this.af.database.list('/reps/', {
            query: {
                 orderByChild: 'last_name',
                // equalTo: "Justin"
                startAt: this.myInput,
                endAt: this.myInput+"\uf8ff",
                once: "value"
            }});


        var groupSubscription = repsref.subscribe((data) => {
            console.log(data);
            this.reps=this.reps.concat(data);
        });
    }

    genimg(link){
        return "http://bioguide.congress.gov/bioguide/photo/" + link.charAt(0) + "/"+link+".jpg"
    }

}