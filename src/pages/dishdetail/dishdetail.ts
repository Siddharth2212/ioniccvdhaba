import { Component, Inject } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import {baseURL} from "../../shared/baseurl";
import {FavoriteProvider} from "../../providers/favorite/favorite";
import {DishProvider} from "../../providers/dish/dish";
import {LeaderProvider} from "../../providers/leader/leader";

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
              public loadingCtrl: LoadingController) {
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
  }
}
