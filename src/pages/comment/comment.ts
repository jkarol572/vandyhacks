import { Component } from '@angular/core';

import { MenuController, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Comments } from '../../app/models/comment';
import { Child } from '../../app/models/child';
import { Http, Headers, URLSearchParams, RequestOptions } from '@angular/http';

import * as firebase from 'firebase';


@Component({
    selector: 'page-comment',
    templateUrl: 'comment.html'
})
export class Comment {
    bill: any;
    user: any;
    link: any;
    username: any;
    userSubscription: any;
    text: any;
    listOfComments: any;
    dtstring: any;
    childtext: any;
    public doughnutChartLabels:string[] = ['Negative', 'Neutral', 'Positive'];
    public doughnutChartData:number[] = [];
    public doughnutChartType:string = 'doughnut';

    constructor(public http: Http, private menu: MenuController, public navCtrl: NavController, private _auth: AuthService, public af: AngularFire, private navParams: NavParams,) {
       
    }
    ngOnInit(){
        this.bill = this.navParams.get('bill');
        this.link = this.af.database.list(this.navParams.get('link')+ this.bill.$key + "/comments/");
        this.doughnutChartData = this.navParams.get('returned');
        
        this.user = this.af.database.object('/users/' + this._auth.getEmailName());
        
         this.userSubscription = this.user.subscribe((user_data)=>{
        //     console.log("USER DATA", user_data)
        //     this.name=user_data.name;
             this.username=user_data.username;
        //     this.phone=user_data.phone;
        //     this.year=user_data.year;

         })

         let getComment = this.link.subscribe((data)=>{
            this.listOfComments=data;
         })

         console.log(new Date());
            
 
        
    }

 

    openChild(){

    }

    makeChild(comment){
        comment.creating=true;
    }
    closeNew(comment){
        comment.creating=false;
        this.childtext="";
        
    }

    postChild(comment){
        console.log(comment)
        var displayDate = new Date().toLocaleDateString();
        var displayTime = new Date().toLocaleTimeString();
        let newchild = new Child(this.username, this._auth.getEmailName(), this.childtext, displayDate, displayTime)
        if(comment.childarray){
            comment.childarray.push(newchild);

        }else{
            comment.childarray=[newchild];
        }
        comment.creating=false;
        this.childtext="";
        let staticlink = this.af.database.object(this.navParams.get('link')+ this.bill.$key + "/comments/"+comment.$key);
        
        staticlink.update({childarray: comment.childarray});

    }

    public chartClicked(e:any):void {
        console.log(e);
      }
     
      public chartHovered(e:any):void {
        console.log(e);
      }


      postComment() {
    
            let params = new URLSearchParams()
            params.append('text',this.text);
            let options = new RequestOptions({ search: params });

            this.http.get("http://67.205.128.198:9000/analysis", options)
            .subscribe(data => {
              console.log(data['_body'])

              var displayDate = new Date().toLocaleDateString();
              var displayTime = new Date().toLocaleTimeString();
              
      
              let comment = new Comments(this.username, this._auth.getEmailName(), this.text,displayDate, displayTime, false, data['_body'], null);
              this.link.push(comment);
              this.text="";

            }, error => {
                console.log(JSON.stringify(error.json()));
            });
            

        }

 
}