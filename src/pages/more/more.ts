import { Component } from '@angular/core';

import { MenuController, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { Login } from '../login/login';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import * as firebase from 'firebase';
import { ChartsModule } from 'ng2-charts/ng2-charts';


@Component({
    selector: 'page-more',
    templateUrl: 'more.html'
})
export class More {
    bill: any;
    shownGroup = null;
    public doughnutChartLabels:string[] = ['Democrat', 'Republican'];
    public doughnutChartData:number[] = [];
    public doughnutChartType:string = 'doughnut';
    either: boolean;
    

    constructor(private menu: MenuController, public navCtrl: NavController, private _auth: AuthService, public af: AngularFire, private navParams: NavParams,) {
       
    }
    ngOnInit(){
        this.bill = this.navParams.get('bill');
        this.either=true;
       
if(this.bill.cosponsors_by_party){
        if(this.bill.cosponsors_by_party['D']){
            this.doughnutChartData[0] = this.bill.cosponsors_by_party['D'];
        }else{
            this.doughnutChartData[0] = 0;      
        }
        if(this.bill.cosponsors_by_party['R']){
            this.doughnutChartData[1] = this.bill.cosponsors_by_party['R'];
        }else{
            this.doughnutChartData[1] = 0;           
        }
    }else{
        this.either=false;
    }
        

    }

    openLink(){
        window.open(this.bill.congressdotgov_url, '_system', 'location=yes'); return false;
    }

    toggleGroup(group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        } else {
            this.shownGroup = group;
        }
    };
    isGroupShown(group) {
        return this.shownGroup === group;
    };

    public chartClicked(e:any):void {
        console.log(e);
      }
     
      public chartHovered(e:any):void {
        console.log(e);
      }

 

 
}