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

export const firebaseConfig = {
    apiKey: "AIzaSyDmLufSLcwXbmxeMY4YxyGVFeEr-mZpqxk",
    authDomain: "project-676454807009.firebaseapp.com",
    databaseURL: "https://vandyhacks-c518a.firebaseio.com/",
    storageBucket: "project-676454807009.appspot.com",
    messagingSenderId: "676454807009"
};

@NgModule({
  declarations: [
    MyApp,
    Signup,
    Home,
    Login
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Signup,
    Home,
    Login
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {}
