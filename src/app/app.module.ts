import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AboutPage} from "../pages/about/about";
import {MenuPage} from "../pages/menu/menu";
import {ContactPage} from "../pages/contact/contact";
import { DishProvider } from '../providers/dish/dish';
import { LeaderProvider } from '../providers/leader/leader';
import { PromotionProvider } from '../providers/promotion/promotion';
import {HttpClientModule} from "@angular/common/http";
import {DishdetailPage} from "../pages/dishdetail/dishdetail";
import { FavoriteProvider } from '../providers/favorite/favorite';
import {FavoritesPage} from "../pages/favorites/favorites";
import {ReservationPage} from "../pages/reservation/reservation";
import {CommentPage} from "../pages/comment/comment";
import {LoginPage} from "../pages/login/login";
import {IonicStorageModule} from "@ionic/storage";
import {LocalNotifications} from "@ionic-native/local-notifications";
import {EmailComposer} from "@ionic-native/email-composer";
import {SocialSharing} from "@ionic-native/social-sharing";
import {Camera} from "@ionic-native/camera";
import {RegisterPage} from "../pages/register/register";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    MenuPage,
    ContactPage,
    DishdetailPage,
    FavoritesPage,
    ReservationPage,
    CommentPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    MenuPage,
    ContactPage,
    DishdetailPage,
    FavoritesPage,
    ReservationPage,
    CommentPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DishProvider,
    LeaderProvider,
    PromotionProvider,
    FavoriteProvider,
    LocalNotifications,
    EmailComposer,
    SocialSharing,
    Camera
  ]
})
export class AppModule {}
