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
    constructor(public http: Http, private menu: MenuController, public navCtrl: NavController, private _auth: AuthService, public af: AngularFire, private navParams: NavParams,) {
       
    }
    ngOnInit(){
        this.bill = this.navParams.get('bill');
        this.link = this.af.database.list(this.navParams.get('link')+ this.bill.$key + "/comments/");
        
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

    postComment(){
        //username
        //emailname
        //comment
        //time stamp
        console.log(this.authentification());
        
        var displayDate = new Date().toLocaleDateString();
        var displayTime = new Date().toLocaleTimeString();
        

        let comment = new Comments(this.username, this._auth.getEmailName(), this.text,displayDate, displayTime, false, null);
        this.link.push(comment);
        this.text="";




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

    authentification() {
        
    
            let params = new URLSearchParams()
            params.append('text','fuck get requests stupid shit fuck btich shit');

            let headers = new Headers();
            headers.append("Accept", 'application/json');
            headers.append('Content-Type', 'application/json' );
            let options = new RequestOptions({ search: params });
        
            let postParams = {
              
                text:'yooooooo'
            
            }
            

            this.http.get("http://67.205.128.198:9000/analysis?text=yoooo", options)
            .subscribe(data => {
              console.log(data['_body'])
            }, error => {
                console.log(JSON.stringify(error.json()));
            });

        }

 
}