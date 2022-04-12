import * as toppingActions from '../actions/toppings.action';
import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Topping } from '../../models/topping.model';

export interface ToppingsState extends EntityState<Topping> {
   loaded: boolean;
   loading: boolean;
   selectedToppings: number[];
}

export const toppingsEntityAdapter: EntityAdapter<Topping> = createEntityAdapter<Topping>();

export const initialState: ToppingsState = toppingsEntityAdapter.getInitialState({
   loaded: false,
   loading: false,
   selectedToppings: []
});

export const reducer = createReducer(
   initialState,
   on(toppingActions.visualizeToppings, (state, { payload }) => ({ ...state, selectedToppings: payload })),
   on(toppingActions.loadToppings, (state) => ({ ...state, loading: true })),
   on(toppingActions.loadToppingsFail, (state) => ({ ...state, loading: false, loaded: false })),
   on(toppingActions.loadToppingsSuccess, (state, { payload }) =>
      toppingsEntityAdapter.addMany(payload, { ...state, loaded: true, loading: false })
   )
);

export const {
   selectIds: selectToppingsIds,
   selectEntities: selectToppingsEntities,
   selectAll: selectAllToppings,
   selectTotal: toppingsCount
} = toppingsEntityAdapter.getSelectors();

export const getToppingsLoading = (state: ToppingsState) => state.loading;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getSelectedToppings = (state: ToppingsState) => state.selectedToppings;
