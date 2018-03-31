import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DishProvider} from "../../providers/dish/dish";
import {Dish} from "../../shared/dish";
import {baseURL} from "../../shared/baseurl";
import {DishdetailPage} from "../dishdetail/dishdetail";

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  dishes: Dish[];
  errMsg: string;
  baseUrl = baseURL;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private dishService: DishProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
    this.dishService.getDishes()
      .subscribe((dishes)=>{
        this.dishes = dishes;
        console.log('menu dishes');
        console.log(this.dishes);
      }, (err)=>{
        this.errMsg = err;
      })
  }

  dishSelected(event, dish){
    this.navCtrl.push(DishdetailPage, {
      dish: dish
    })
  }

}
