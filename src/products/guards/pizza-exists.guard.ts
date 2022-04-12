import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, tap, filter, take, switchMap, catchError, of, map } from 'rxjs';

import * as fromStore from '../store';

@Injectable()
export class PizzaExistsGuard implements CanActivate {
   constructor(private store: Store<fromStore.ProductsState>) {}

   canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
      return this.checkStore().pipe(
         switchMap(() => {
            const pizzaId = parseInt(route.params['pizzaId'], 10);
            return this.hasPizza(pizzaId);
         })
      );
   }

   hasPizza(id: number): Observable<boolean> {
      return this.store.select(fromStore.getPizzasEntities).pipe(
         map((entities) => !!entities[id]),
         take(1)
      );
   }

   checkStore(): Observable<boolean> {
      return this.store.select(fromStore.getPizzasLoaded).pipe(
         tap((loaded) => {
            if (!loaded) {
               this.store.dispatch(fromStore.loadPizzas());
            }
         }),
         filter((loaded) => loaded),
         take(1)
      );
   }
}
