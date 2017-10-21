import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Signup } from '../pages/signup/signup';
import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../providers/auth-service';
import { PersonView } from '../pages/personview/personview';
import { More } from '../pages/more/more';
import { Comment } from '../pages/comment/comment';
import { ChartsModule } from 'ng2-charts/ng2-charts';

export const firebaseConfig = {
    apiKey: "AIzaSyDAV3P8Gwava4iIdlsJQjar41TnXNxoYtM",
    authDomain: "project-953089341135.firebaseapp.com",
    databaseURL: "https://congernize.firebaseio.com/",
    storageBucket: "project-953089341135.appspot.com",
    messagingSenderId: "953089341135"
};

@NgModule({
  declarations: [
    MyApp,
    Signup,
    Home,
    Login,
    PersonView,
    More,
    Comment
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Signup,
    Home,
    Login,
    PersonView,
    More,
    Comment
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
