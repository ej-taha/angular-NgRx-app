import * as pizzaActions from '../actions/pizzas.action';
import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Pizza } from '../../models/pizza.model';

export interface PizzaState extends EntityState<Pizza> {
   // entities: { [id: number]: Pizza };
   loaded: boolean;
   loading: boolean;
}

export const pizzaEntityAdapter: EntityAdapter<Pizza> = createEntityAdapter<Pizza>();

export const initialState: PizzaState = pizzaEntityAdapter.getInitialState({ loaded: false, loading: false });

export const reducer = createReducer(
   initialState,
   on(pizzaActions.loadPizzas, (state) => ({ ...state, loading: true })),
   on(pizzaActions.loadPizzasFail, (state) => ({ ...state, loading: false, loaded: false })),
   on(pizzaActions.loadPizzasSuccess, (state, { payload }) =>
      pizzaEntityAdapter.addMany(payload, { ...state, loaded: true, loading: false })
   ),
   on(pizzaActions.createPizzaSuccess, (state, { payload }) => pizzaEntityAdapter.addOne(payload, { ...state })),
   on(pizzaActions.removePizzaSuccess, (state, { payload }) =>
      pizzaEntityAdapter.removeOne(String(payload.id), { ...state })
   ),
   on(pizzaActions.updatePizzaSuccess, (state, { payload }) =>
      pizzaEntityAdapter.updateOne({ id: payload.id!, changes: payload }, { ...state })
   )
);

export const {
   selectIds: selectPizzasIds,
   selectEntities: selectPizzasEntities,
   selectAll: selectAllPizzas,
   selectTotal: pizzasCount
} = pizzaEntityAdapter.getSelectors();

export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
