import { Component } from '@angular/core';

import { MenuController, NavController, LoadingController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';
import { PersonView } from '../personview/personview';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import * as firebase from 'firebase';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class Home {
    reps: any;
    myInput: string;
    constructor(public loadingCtrl: LoadingController, private menu: MenuController, public navCtrl: NavController, private _auth: AuthService, public af: AngularFire) {
       
    }
    ngOnInit(){
        this.myInput="";
        //Grab all of the reps
        let loading = this.loadingCtrl.create({
            spinner: 'ios',
            content: 'Loading people'
          });
          
        
          loading.present();
        var repsref = this.af.database.list('/reps/', {
            query: {
                 orderByChild: 'first_name',
                 limitToFirst: 10
            }});


        var groupSubscription = repsref.subscribe((data) => {
            this.reps=data;
            loading.dismiss()
            
        });
        
    }

    findPerson(){
   

        if(this.myInput.indexOf(" ")==-1){
        var repsref = this.af.database.list('/reps/', {
            query: {
                 orderByChild: 'first_name',
                // equalTo: "Justin"
                startAt: this.myInput,
                endAt: this.myInput+"\uf8ff",
                once: "value"
            }});


        var groupSubscription = repsref.subscribe((data) => {
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
            this.reps=this.reps.concat(data);
            
        });
    }else{
        var repsref = this.af.database.list('/reps/', {
            query: {
                 orderByChild: 'first_name',
                // equalTo: "Justin"
                startAt: this.myInput.split(" ")[0],
                endAt: this.myInput.split(" ")[0]+"\uf8ff",
                once: "value"
            }});


        var groupSubscription = repsref.subscribe((data) => {
            this.reps=data;
        });

        var repsref = this.af.database.list('/reps/', {
            query: {
                 orderByChild: 'last_name',
                // equalTo: "Justin"
                startAt: this.myInput.split(" ")[1],
                endAt: this.myInput.split(" ")[1]+"\uf8ff",
                once: "value"
            }});


        var groupSubscription = repsref.subscribe((data) => {
            this.reps=this.reps.concat(data);
            
        });

    }
    }

    genimg(link){
        return "http://bioguide.congress.gov/bioguide/photo/" + link.charAt(0) + "/"+link+".jpg"
    }

    openModal(person){
        this.navCtrl.push(PersonView, {person: person});
    }
    onCancel(){

    }

}