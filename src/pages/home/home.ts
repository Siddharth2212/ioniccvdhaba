import { Component, OnInit, Inject } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { Promotion } from '../../shared/promotion';
import { PromotionProvider } from '../../providers/promotion/promotion';
import { Leader } from '../../shared/leader';
import { LeaderProvider } from '../../providers/leader/leader';
import {baseURL} from "../../shared/baseurl";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess: string;
  promoErrMess: string;
  leaderErrMess: string;
  baseUrl = baseURL;

  constructor(public navCtrl: NavController,
              private dishservice: DishProvider,
              private promotionservice: PromotionProvider,
              private leaderservice: LeaderProvider) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish()
      .subscribe(dish => {
        // console.log(dish);
        console.log('hello');
          this.dish = dish;
          // console.log(this.dish);
          console.log(this.dish.name);
          console.log('hello2');
        },
        errmess => this.dishErrMess = <any>errmess );
    this.promotionservice.getFeaturedPromotion()
      .subscribe(promotion => this.promotion = promotion,
        errmess => this.promoErrMess = <any>errmess );
    this.leaderservice.getFeaturedLeader()
      .subscribe(leader => this.leader = leader,
        errmess => this.leaderErrMess = <any>errmess );

  }

}
