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
import {HttpModule} from '@angular/http';

export const firebaseConfig = {
    apiKey: "AIzaSyAEldpNbEqFav1YEvA5VEKRcCXqg4-FGOo",
    authDomain: "project-798833822419.firebaseapp.com",
    databaseURL: "https://trycatch-c3eef.firebaseio.com/",
    storageBucket: "project-798833822419.appspot.com",
    messagingSenderId: "798833822419"
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
    ChartsModule,
    HttpModule
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
