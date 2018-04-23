import { Component } from '@angular/core';
import {
  ActionSheetController, IonicPage, LoadingController, ModalController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import { Dish } from '../../shared/dish';
import {baseURL} from "../../shared/baseurl";
import {LeaderProvider} from "../../providers/leader/leader";
import {CommentPage} from "../comment/comment";
import { Storage } from '@ionic/storage';
import {LocalNotifications} from "@ionic-native/local-notifications";


/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  favorite: boolean;
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  baseURL = baseURL;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private favoriteService: LeaderProvider,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              public modalCtrl: ModalController,
              public actionSheetCtrl: ActionSheetController,
              public storage: Storage,
              public localNotifications: LocalNotifications) {
    this.dish = navParams.get('dish');
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);

    this.favorite = favoriteService.isFavorite(this.dish._id);
  }

  addToFavorites() {
    let loading = this.loadingCtrl.create({
      content: 'Adding to favorites. Please wait...'
    });

    loading.present();
    console.log('Adding to Favorites', this.dish._id);
    this.favorite = this.favoriteService.addFavorite(this.dish._id);
    if(this.favorite){
      var dishes_favorites = this.storage.get('favorites2');

      console.log('_____________');
      console.log(dishes_favorites['zone_symbol_value']);
      console.log('_____________');
      this.presentToast(this.dish._id);
      loading.dismiss();
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  presentToast(id) {
    let toast = this.toastCtrl.create({
      message: 'Dish '+id+' added to favorites',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
    // Schedule a single notification
    // Schedule delayed notification
    this.localNotifications.schedule({
      text: 'Dish '+id+' added to favorites',
      trigger: {at: new Date(new Date().getTime() + 3600)},
      led: 'FF0000',
      sound: null
    });
    //alert('hello');
  }

  openActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Actions',
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () => {
            this.addToFavorites();
          }
        },
        {
          text: 'Add Comment',
          handler: () => {
            let modal = this.modalCtrl.create(CommentPage);
            /*modal.onDidDismiss(comment => {
              this.dish.comments.push(comment);
            });*/
            modal.present();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }
}
