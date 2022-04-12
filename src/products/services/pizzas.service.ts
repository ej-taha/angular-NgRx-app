import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Pizza } from '../models/pizza.model';
import { JSON_URI } from '../constants/api';

@Injectable()
export class PizzasService {
   constructor(private http: HttpClient) {}

   getPizzas(): Observable<Pizza[]> {
      return this.http
         .get<Pizza[]>(`${JSON_URI}/pizzas`)
         .pipe(catchError((error: any) => throwError(() => new Error(error))));
   }

   createPizza(payload: Pizza): Observable<Pizza> {
      return this.http
         .post<Pizza>(`${JSON_URI}/pizzas`, payload)
         .pipe(catchError((error: any) => throwError(() => new Error(error.json()))));
   }

   updatePizza(payload: Pizza): Observable<Pizza> {
      return this.http
         .put<Pizza>(`${JSON_URI}/pizzas/${payload.id}`, payload)
         .pipe(catchError((error: any) => throwError(() => new Error(error.json()))));
   }

   removePizza(payload: Pizza): Observable<Pizza> {
      return this.http
         .delete<any>(`${JSON_URI}/pizzas/${payload.id}`)
         .pipe(catchError((error: any) => throwError(() => new Error(error.json()))));
   }
}
