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
import {Dish} from "../../shared/dish";
import {DishProvider} from "../dish/dish";

/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeaderProvider {
  favorites: Array<any> = [1];

  constructor(public http: HttpClient, private dishservice: DishProvider) {
    console.log('Hello LeaderProvider Provider');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }

  getLeaders(): Observable<Leader[]> {
    return this.http.get<Leader[]>(baseURL + 'leaders')
      .pipe(
        catchError(this.handleError)
      );
  }

  getLeader(id: number): Observable<Leader> {
    return  this.http.get<Leader>(baseURL + 'leaders/' + id);
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader>(baseURL + 'leaders?featured=true');
  }

  getLeaderIds(): Observable<number[]> {
    return this.getLeaders()
      .map(leaders => { return leaders.map(leader => leader.id); });
  }

  /*getFavorites(){
    return this.favorites;
  }*/

  getFavorites(): Observable<Dish[]> {
    return this.dishservice.getDishes()
      .map(dishes => dishes.filter(dish => this.favorites.some(el => el === dish._id)));
  }

  addFavorite(id: number): boolean {
    this.favorites.push(id);
    return true;
  }

  isFavorite(id: number): boolean {
    return this.favorites.indexOf(id) > -1
  }

  deleteFavorite(id: any): Observable<Dish[]> {
    let index = this.favorites.indexOf(id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      return this.getFavorites();
    }
    else {
      console.log('Deleting non-existant favorite', id);
      // return Observable.throw('Deleting non-existant favorite' + id);
    }
  }

}
