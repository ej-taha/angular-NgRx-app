import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as toppingActions from '../actions/toppings.action';
import * as fromServices from '../../services';

@Injectable()
export class ToppingsEffects {
   constructor(private actions$: Actions, private toppingService: fromServices.ToppingsService) {}

   loadToppings$ = createEffect(() =>
      this.actions$.pipe(
         ofType(toppingActions.loadToppings),
         mergeMap(() =>
            this.toppingService.getToppings().pipe(
               map((toppings) => toppingActions.loadToppingsSuccess({ payload: toppings })),
               catchError((error) => of(toppingActions.loadToppingsFail({ payload: error })))
            )
         )
      )
   );
}
