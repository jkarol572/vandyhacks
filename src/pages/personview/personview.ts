import { Component } from '@angular/core';

import { MenuController, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { More } from '../more/more';
import { Comment } from '../comment/comment';

import * as firebase from 'firebase';


@Component({
    selector: 'page-personview',
    templateUrl: 'personview.html'
})
export class PersonView {
    person: any;
    bills: any;
    constructor(private menu: MenuController, public navCtrl: NavController, private _auth: AuthService, public af: AngularFire, private navParams: NavParams,) {
       
    }
    ngOnInit(){
        this.person = this.navParams.get('person');
        console.log(this.person);

        var billtemp = this.af.database.list('/reps/'+this.person.$key+"/bills", {
            query: {
                 limitToFirst: 5
            }});


        var groupSubscription = billtemp.subscribe((data) => {
            console.log(data);
            this.bills = data;
            
        });
        
    }

    genimg(link){
        return "http://bioguide.congress.gov/bioguide/photo/" + link.charAt(0) + "/"+link+".jpg"
    }

    upvote(bill){
        var billtemp = this.af.database.object('/reps/'+this.person.$key+"/bills/"+bill.$key);
        billtemp.update({vote_up: bill.vote_up+1});
    }
    downvote(bill){
        console.log(bill)
        var billtemp = this.af.database.object('/reps/'+this.person.$key+"/bills/"+bill.$key);
        billtemp.update({vote_down: bill.vote_down+1});
    }
    pushMore(bill){
        this.navCtrl.push(More, {bill: bill, link: '/reps/'+this.person.$key+"/bills"});
        
    }
    pushComment(bill){
        this.navCtrl.push(Comment, {bill: bill, link: '/reps/'+this.person.$key+"/bills"});
        
    }


}