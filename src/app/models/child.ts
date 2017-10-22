import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';

export class Child {
    username: string;
    emailname: string;
    comment: string;
    date: any;
    time: any;
    public af: AngularFire;

    constructor(username: string, emailname: string,
        comment: string, date: any, time: any) {
        this.username = username;
        this.emailname = emailname;
        this.comment = comment;
        this.date = date;
        this.time = time;
        
    }
}
