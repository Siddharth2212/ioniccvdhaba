import { Injectable } from '@angular/core';
import {Leader} from '../../shared/leader';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/of';
import {baseURL} from '../../shared/baseurl';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavoriteProvider {
  favorites: Array<any>;

  constructor(public http: HttpClient) {
    console.log('Hello LeaderProvider Provider');
  }

  addFavorite(id: number): boolean {
    this.favorites.push(id);
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.some(el => el === id);
  }

}
