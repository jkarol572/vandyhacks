import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';
import {Child} from '../models/child'
export class Comments {
    username: string;
    emailname: string;
    text: string;
    timestamp: any;
    childarray?: any;
    creating: boolean;
    sentiment: string;
    public af: AngularFire;

    constructor(username: string, emailname: string,
        text: string, timestamp: any, creating: boolean, sentiment: string, childarray?: any) {
        this.username = username;
        this.emailname = emailname;
        this.text = text;
        this.timestamp = timestamp;
        this.childarray = childarray;
        this.creating=creating;
        this.sentiment=sentiment
    }
}
