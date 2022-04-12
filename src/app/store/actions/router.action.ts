import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const Go = createAction(
   '[Router] Go',
   props<{ payload: { path: any[]; query?: Object; extras?: NavigationExtras } }>()
);
export const Back = createAction('[Router] Back');
