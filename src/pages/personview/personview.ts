import { Component } from '@angular/core';

import { MenuController, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { More } from '../more/more';
import { Comment } from '../comment/comment';
import { party } from '../../app/party'
import * as firebase from 'firebase';
import { ChartsModule } from 'ng2-charts/ng2-charts';


@Component({
    selector: 'page-personview',
    templateUrl: 'personview.html'
})
export class PersonView {
    person: any;
    bills: any;
    state: string;
    user: any;
    public doughnutChartLabels:string[] = ["Loading"];
    public doughnutChartData:number[] = [.00001];
    public doughnutChartType:string = 'doughnut';
    public lineChartOptions: any;
    public barChartLegend: any;
    totalcontrib: number;

    constructor(public chart: ChartsModule, private alertCtrl: AlertController, private menu: MenuController, public navCtrl: NavController, private _auth: AuthService, public af: AngularFire, private navParams: NavParams,) {
       
    }
    ngOnInit(){
        this.doughnutChartLabels= this.navParams.get('labels');
        this.doughnutChartData= this.navParams.get('data');
        this.person = this.navParams.get('person');
        console.log(this.person);
        this.user = this.af.database.object('/users/' + this._auth.getEmailName());

        this.lineChartOptions = {
            display: false,
            color: [
                'red',    // color for data at index 0
                'blue',   // color for data at index 1
                'green',  // color for data at index 2
                'black',  // color for data at index 3
                //...
            ],
            responsive: true
          };
          this.barChartLegend=false;
          let sum = 0;
          for(let i = 0 ; i < this.doughnutChartData.length ; i++){
            sum = Number(sum) + Number(this.doughnutChartData[i]);
          }
          this.totalcontrib = sum;

        var billtemp = this.af.database.list('/reps/'+this.person.$key+"/bills", {
            query: {
                 limitToFirst: 5
            }});


        var groupSubscription = billtemp.subscribe((data) => {
            this.bills = data;
            
        });

        let userSubscription = this.user.subscribe((user_data)=>{
            //     console.log("USER DATA", user_data)
            //     this.name=user_data.name;
                 this.state=user_data.state;
            //     this.phone=user_data.phone;
            //     this.year=user_data.year;
    
             })

     

    
        
    }

    genimg(link){
        // return "http://bioguide.congress.gov/bioguide/photo/" + link.charAt(0) + "/"+link+".jpg"
        return "img/congress/"+link+".jpg"
        
    }

    upvote(bill){
        if(this.state==this.person.state){
        var billtemp = this.af.database.object('/reps/'+this.person.$key+"/bills/"+bill.$key);
        billtemp.update({vote_up: bill.vote_up+1});
        }else{
            this.presentError();            
        }
    }
    downvote(bill){
        if(this.state==this.person.state){
        var billtemp = this.af.database.object('/reps/'+this.person.$key+"/bills/"+bill.$key);
        billtemp.update({vote_down: bill.vote_down+1});
        }else{
            this.presentError();
        }
    }

    presentError() {
        let alert = this.alertCtrl.create({
          title: 'Error',
          message: 'To ensure fair discussion, we only allow of residents of the politicians state to vote',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
              handler: () => {
 
              }
            }
          ]
        });
        alert.present();
      }

    pushMore(bill){
        this.navCtrl.push(More, {bill: bill, link: '/reps/'+this.person.$key+"/bills"});
        
    }
    pushComment(bill){
        this.navCtrl.push(Comment, {bill: bill, link: '/reps/'+this.person.$key+"/bills"});
        
    }
    openFb(){
        window.open("https://facebook.com/"+this.person.facebook_account, '_system', 'location=yes'); return false;
    }
     openTwitter(){
        window.open("https://twitter.com/"+this.person.twitter_account, '_system', 'location=yes'); return false;
    }


    getParty(){
        return party[this.person.party];
    }

     chartClicked(e:any):void {
        console.log(e);
      }
     
    chartHovered(e:any):void {
        console.log(e);
      }



}