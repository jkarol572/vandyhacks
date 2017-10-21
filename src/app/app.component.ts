import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';
import { AngularFire } from 'angularfire2';
import { AuthService } from '../providers/auth-service';
import { PersonView } from '../pages/personview/personview';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;

  pages: Array<{title: string, component: any}>;
  user: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private af: AngularFire, private _auth: AuthService) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: Home }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
