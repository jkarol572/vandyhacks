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
    state: any;
    user: any;
    filterState: any;
    constructor(public loadingCtrl: LoadingController, private menu: MenuController, public navCtrl: NavController, private _auth: AuthService, public af: AngularFire) {
       
    }
    ngOnInit(){
        this.filterState="all";

        this.user = this.af.database.object('/users/' + this._auth.getEmailName());
        
         let userSubscription = this.user.subscribe((user_data)=>{
             this.state=user_data.state;
         })

        this.myInput="";
        //Grab all of the reps
        let loading = this.loadingCtrl.create({
            spinner: 'ios',
            content: 'Loading politicians'
          });
          
        
          loading.present();
        var repsref = this.af.database.list('/reps/', {
            query: {
                 orderByChild: 'first_name',
                //  limitToFirst: 10
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
        // return "http://bioguide.congress.gov/bioguide/photo/" + link.charAt(0) + "/"+link+".jpg"
        return "img/congress/"+link+".jpg"
        
    }

    openModal(person){
        this.navCtrl.push(PersonView, {person: person});
    }
    onCancel(){

    }


    filter_state(ev){
         if(this.filterState!="all"){
            ev.target.value = '';                   
            let loading = this.loadingCtrl.create({
                spinner: 'ios',
                content: 'Loading politicians'
              });
              
            
              loading.present();
            var repsref = this.af.database.list('/reps/', {
                query: {
                     orderByChild: 'state',
                     equalTo: this.state
                    //  limitToFirst: 10
                }});
    
    
            var groupSubscription = repsref.subscribe((data) => {
                this.reps=data;
                loading.dismiss()
                
            });
        }
    }

    abbrState(){
        
        var states = [
            ['Arizona', 'AZ'],
            ['Alabama', 'AL'],
            ['Alaska', 'AK'],
            ['Arizona', 'AZ'],
            ['Arkansas', 'AR'],
            ['California', 'CA'],
            ['Colorado', 'CO'],
            ['Connecticut', 'CT'],
            ['Delaware', 'DE'],
            ['Florida', 'FL'],
            ['Georgia', 'GA'],
            ['Hawaii', 'HI'],
            ['Idaho', 'ID'],
            ['Illinois', 'IL'],
            ['Indiana', 'IN'],
            ['Iowa', 'IA'],
            ['Kansas', 'KS'],
            ['Kentucky', 'KY'],
            ['Kentucky', 'KY'],
            ['Louisiana', 'LA'],
            ['Maine', 'ME'],
            ['Maryland', 'MD'],
            ['Massachusetts', 'MA'],
            ['Michigan', 'MI'],
            ['Minnesota', 'MN'],
            ['Mississippi', 'MS'],
            ['Missouri', 'MO'],
            ['Montana', 'MT'],
            ['Nebraska', 'NE'],
            ['Nevada', 'NV'],
            ['New Hampshire', 'NH'],
            ['New Jersey', 'NJ'],
            ['New Mexico', 'NM'],
            ['New York', 'NY'],
            ['North Carolina', 'NC'],
            ['North Dakota', 'ND'],
            ['Ohio', 'OH'],
            ['Oklahoma', 'OK'],
            ['Oregon', 'OR'],
            ['Pennsylvania', 'PA'],
            ['Rhode Island', 'RI'],
            ['South Carolina', 'SC'],
            ['South Dakota', 'SD'],
            ['Tennessee', 'TN'],
            ['Texas', 'TX'],
            ['Utah', 'UT'],
            ['Vermont', 'VT'],
            ['Virginia', 'VA'],
            ['Washington', 'WA'],
            ['West Virginia', 'WV'],
            ['Wisconsin', 'WI'],
            ['Wyoming', 'WY'],
        ];
    
            for(let i = 0; i < states.length; i++){
                if(states[i][1] == this.state){
                    return(states[i][0]);
                }
            }    
        
    }

}