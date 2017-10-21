import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';

export class User {
    first: string;
    email: string;
    last: string;
    public af: AngularFire;

    constructor(first: string, email: string,
        last: string) {
        this.first = first;
        this.last = last;
        this.email = email;
    }
}
