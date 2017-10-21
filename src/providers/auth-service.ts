import { Injectable } from '@angular/core';
import { AuthProviders, AngularFireAuth, FirebaseAuthState, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
  email: string;
  university: string;
  emailname: string;

  constructor(public auth$: AngularFireAuth) {
      if(this.authenticated) {
          this.updateEmail();
      }
  }

  get authenticated(): boolean {
    if(window.localStorage.getItem('currentuser')) {
        return true;
    }
    return false;
  }


  getEmail(): string {
      return this.email;
  }

  getUniversity(): string {
      return this.university;
  }

  getEmailName(): string {
      return this.emailname;
  }

  setEmail(email: string) {
      this.email = email;
      let index = email.indexOf("@");
      let emailDomain = "null";
      if(index != -1) {
          emailDomain = email.slice(index + 1, email.length);
      }
      this.emailname = email.split('@')[0].replace(/\./g, ',');
      let currentuser = {
          email: email,
          emailname: this.emailname
      };
      console.log('setting local storage');
      window.localStorage.setItem('currentuser', JSON.stringify(currentuser));
      console.log(window.localStorage.getItem('currentuser'));
  }

  updateEmail() {
      let user = JSON.parse(window.localStorage.getItem('currentuser'));
      this.email = user.email;
      this.emailname = user.emailname;
  }

  signInWithEmail(email: string, password: string): firebase.Promise<FirebaseAuthState> {
      return this.auth$.login({
          email: email,
          password: password
      }, {
          provider: AuthProviders.Password,
          method: AuthMethods.Password
      });
  }

  createUserWithEmail(email: string, password: string): firebase.Promise<FirebaseAuthState> {
      this.setEmail(email);
      return this.auth$.createUser({
          email: email,
          password: password
      });
  }

  createUserWithEmailAndPassword(email: string, password: string): firebase.Promise<FirebaseAuthState> {
      this.setEmail(email);
      return this.auth$.createUser({
          email: email,
          password: password
      });
  }

  signOut(): void {
    this.auth$.logout();
    window.localStorage.removeItem('currentuser');
  }

  

}
