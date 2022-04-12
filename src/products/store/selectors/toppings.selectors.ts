import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromToppings from '../reducers/toppings.reducer';

export const getToppingState = createSelector(
   fromFeature.getProductsState,
   (state: fromFeature.ProductsState) => state.toppings
);

export const getToppingsEntities = createSelector(getToppingState, fromToppings.selectToppingsEntities);

export const getSelectedToppings = createSelector(getToppingState, fromToppings.getSelectedToppings);

export const getAllToppings = createSelector(getToppingState, fromToppings.selectAllToppings);

export const getToppingsLoaded = createSelector(getToppingState, fromToppings.getToppingsLoaded);
export const getToppingsLoading = createSelector(getToppingState, fromToppings.getToppingsLoading);
