import {Component, OnInit} from '@angular/core';
import {
  AlertController, IonicPage, ItemSliding, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import {Dish} from "../../shared/dish";
import {LeaderProvider} from "../../providers/leader/leader";
import {baseURL} from "../../shared/baseurl";
/**
 * Generated class for the FavoritesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {

  favorites: Dish[];
  errMess: string;
  BaseURL = baseURL;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private favoriteservice: LeaderProvider,
              public toastCtrl: ToastController,
              public loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.favoriteservice.getFavorites()
      .subscribe(favorites => {
        console.log(favorites);
          this.favorites = favorites;
        },
        errmess => this.errMess = errmess);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  deleteFavorite(item: ItemSliding, id: any) {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you want to delete this dish?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes I am sure',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Dish '+id+' deleting from favorites. Please wait...'
            });

            loading.present();
            this.favoriteservice.deleteFavorite(id)
              .subscribe(favorites => {
                this.favorites = favorites;
                loading.dismiss();
                this.presentToast(id);
              });
            item.close();
          }
        }
      ]
    });
    alert.present();
  }

  presentToast(id) {
    let toast = this.toastCtrl.create({
      message: 'Dish '+id+' deleted from favorites',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
