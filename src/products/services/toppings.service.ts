import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// import 'rxjs/add/observable/throw';

import { Topping } from '../models/topping.model';
import { JSON_URI } from '../constants/api';

@Injectable()
export class ToppingsService {
   constructor(private http: HttpClient) {}

   getToppings(): Observable<Topping[]> {
      return this.http
         .get<Topping[]>(`${JSON_URI}/toppings`)
         .pipe(catchError((error: any) => throwError(() => new Error(error.json()))));
   }
}
