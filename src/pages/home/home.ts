import { Component } from '@angular/core';

import { MenuController, NavController, LoadingController, AlertController } from 'ionic-angular';
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
    sub1: any;
    sub2: any;
    sub3: any;
    sub4: any;
    sub5: any;
    sub6: any;
    sub7: any;
    sub8: any;
    
    constructor(private alertCtrl: AlertController, public loadingCtrl: LoadingController, private menu: MenuController, public navCtrl: NavController, private _auth: AuthService, public af: AngularFire) {
       
    }
    ngOnInit(){
        this.filterState="all";

        this.user = this.af.database.object('/users/' + this._auth.getEmailName());
        
         this.sub1 = this.user.subscribe((user_data)=>{
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
                 orderByChild: 'first_name'
            }});


        this.sub2 = repsref.subscribe((data) => {
            this.reps=data;
            loading.dismiss()
        });
        
    }
    ngOnDestroy() {
        if(this.sub1)
        this.sub1.unsubscribe();
        
        if(this.sub2)        
        this.sub2.unsubscribe();
        
        if(this.sub3)        
        this.sub3.unsubscribe();
       
        if(this.sub4)        
        this.sub4.unsubscribe();
       
        if(this.sub5)        
        this.sub5.unsubscribe();
       
        if(this.sub6)        
        this.sub6.unsubscribe();
       
        if(this.sub7)        
        this.sub7.unsubscribe();
        
        if(this.sub8)        
        this.sub8.unsubscribe();
        
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


        this.sub3 = repsref.subscribe((data) => {
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


        this.sub4 = repsref.subscribe((data) => {
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


        this.sub5 = repsref.subscribe((data) => {
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


        this.sub6 = repsref.subscribe((data) => {
            this.reps=this.reps.concat(data);
        });

    }

    }

    genimg(link){
        // return "http://bioguide.congress.gov/bioguide/photo/" + link.charAt(0) + "/"+link+".jpg"
        return "img/congress/"+link+".jpg"
        
    }

    openModal(person){
        let labels=[];
        let data=[]
        console.log(person);
        let contrib =this.af.database.list('/reps/'+person.$key+"/contrib");
        
                this.sub7 = contrib.subscribe((datalist)=>{
                    console.log("contribbbb")
                    
                    console.log(data)
                    for(let i = 0 ; i < datalist.length ; i++){
                        labels.push(datalist[i].industry_name);
                        data.push(datalist[i].total);        
                    }
             
                    this.navCtrl.push(PersonView, {person: person, labels: labels, data: data});
                    
                })

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
    
    
            this.sub8 = repsref.subscribe((data) => {
                this.reps=data;
                loading.dismiss()
                
            });
        }
    }


    presentConfirm() {
        let alert = this.alertCtrl.create({
          title: 'Log out',
          message: 'Are you sure you want to log out?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
      
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Log out',
              handler: () => {
                  this.logout();
              }
            }
          ]
        });
        alert.present();
      }
      
          logout() {
              //Simple logout function, this will break if all firebase subscriptions have not been properly killed
              this._auth.signOut();
              this.navCtrl.setRoot(Login);
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