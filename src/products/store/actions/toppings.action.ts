import { createAction, props } from '@ngrx/store';

import { Topping } from '../../models/topping.model';

export const loadToppings = createAction('[Products] Load Toppings');

export const loadToppingsFail = createAction('[Products] Load Toppings Fail', props<{ payload: any }>());

export const loadToppingsSuccess = createAction('[Products] Load Toppings Success', props<{ payload: Topping[] }>());

export const visualizeToppings = createAction('[Products] Visualize Toppings', props<{ payload: number[] }>());
