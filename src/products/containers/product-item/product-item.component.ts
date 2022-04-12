// @ts-nocheck
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';

import * as fromStore from '../../store';
import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';

@Component({
   selector: 'product-item',
   styleUrls: ['product-item.component.scss'],
   template: `
      <div class="product-item">
         <pizza-form
            [pizza]="pizza$ | async"
            [toppings]="toppings$ | async"
            (selected)="onSelect($event)"
            (create)="onCreate($event)"
            (update)="onUpdate($event)"
            (remove)="onRemove($event)"
         >
            <pizza-display [pizza]="visualise$ | async"> </pizza-display>
         </pizza-form>
      </div>
   `
})
export class ProductItemComponent implements OnInit {
   pizza$: Observable<Pizza>;
   visualise$: Observable<Pizza>;
   toppings$: Observable<Topping[]>;

   constructor(private store: Store<fromStore.ProductsState>) {}

   ngOnInit() {
      this.pizza$ = this.store.select(fromStore.getSelectedPizza).pipe(
         tap((pizza: Pizza = {}) => {
            const pizzaExists = !!(pizza && pizza.toppings);
            const toppings = pizzaExists ? pizza.toppings?.map((topping) => topping.id) : [];
            this.store.dispatch(fromStore.visualizeToppings({ payload: toppings }));
         })
      );
      this.toppings$ = this.store.select(fromStore.getAllToppings);
      this.visualise$ = this.store.select(fromStore.getPizzaVisualised);
   }

   onSelect(event: number[]) {
      this.store.dispatch(fromStore.visualizeToppings({ payload: event }));
   }

   onCreate(event: Pizza) {
      this.store.dispatch(fromStore.createPizza({ payload: event }));
   }

   onUpdate(event: Pizza) {
      this.store.dispatch(fromStore.updatePizza({ payload: event }));
   }

   onRemove(event: Pizza) {
      const remove = window.confirm('Are you sure?');
      if (remove) {
         this.store.dispatch(fromStore.removePizza({ payload: event }));
      }
   }
}
