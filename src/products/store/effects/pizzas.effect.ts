import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as fromRoot from '../../../app/store';
import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';

@Injectable()
export class PizzasEffects {
   constructor(private actions$: Actions, private pizzaService: fromServices.PizzasService) {}

   loadPizzas$ = createEffect(() =>
      this.actions$.pipe(
         ofType(pizzaActions.loadPizzas),
         mergeMap(() =>
            this.pizzaService.getPizzas().pipe(
               map((pizzas) => pizzaActions.loadPizzasSuccess({ payload: pizzas })),
               catchError((error) => of(pizzaActions.loadPizzasFail({ payload: error })))
            )
         )
      )
   );

   createPizza$ = createEffect(() =>
      this.actions$.pipe(
         ofType(pizzaActions.createPizza),
         map((action) => action.payload),
         mergeMap((pizza) =>
            this.pizzaService.createPizza(pizza).pipe(
               map((pizza) => pizzaActions.createPizzaSuccess({ payload: pizza })),
               catchError((error) => of(pizzaActions.createPizzaFail({ payload: error })))
            )
         )
      )
   );

   createPizzaSuccess$ = createEffect(() =>
      this.actions$.pipe(
         ofType(pizzaActions.createPizzaSuccess),
         map((action) => action.payload),
         map((pizza) => fromRoot.Go({ payload: { path: ['/products', pizza.id] } }))
      )
   );

   updatePizza$ = createEffect(() =>
      this.actions$.pipe(
         ofType(pizzaActions.updatePizza),
         map((action) => action.payload),
         mergeMap((pizza) =>
            this.pizzaService.updatePizza(pizza).pipe(
               map((pizza) => pizzaActions.updatePizzaSuccess({ payload: pizza })),
               catchError((error) => of(pizzaActions.updatePizzaFail({ payload: error })))
            )
         )
      )
   );

   removePizza$ = createEffect(() =>
      this.actions$.pipe(
         ofType(pizzaActions.removePizza),
         map((action) => action.payload),
         mergeMap((pizza) =>
            this.pizzaService.removePizza(pizza).pipe(
               map(() => pizzaActions.removePizzaSuccess({ payload: pizza })),
               catchError((error) => of(pizzaActions.removePizzaFail({ payload: error })))
            )
         )
      )
   );

   handlePizzaSuccess = createEffect(() =>
      this.actions$.pipe(
         ofType(pizzaActions.updatePizzaSuccess, pizzaActions.removePizzaSuccess),
         map(() => fromRoot.Go({ payload: { path: ['/products'] } }))
      )
   );

   /* removePizzaSuccess$ = createEffect(() =>
      this.actions$.pipe(
         ofType(pizzaActions.removePizzaSuccess),
         map((action) => action.payload),
         map(() => fromRoot.Go({ payload: { path: ['/products'] } }))
      )
   ); */
}
