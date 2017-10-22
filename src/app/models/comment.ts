import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';
import {Child} from '../models/child'
export class Comments {
    username: string;
    emailname: string;
    comment: string;
    date: any;
    time: any;
    childarray?: any;
    creating: boolean;
    sentiment: string;
    public af: AngularFire;

    constructor(username: string, emailname: string,
        comment: string, date: any, time: any, creating: boolean, sentiment: string, childarray?: any) {
        this.username = username;
        this.emailname = emailname;
        this.comment = comment;
        this.date = date;
        this.time = time;
        this.childarray = childarray;
        this.creating=creating;
        this.sentiment=sentiment
    }
}
