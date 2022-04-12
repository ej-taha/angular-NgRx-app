import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import * as fromContainers from './containers';

// guards
import * as fromGuards from './guards';

const routes: Routes = [
   {
      path: '',
      canActivate: [fromGuards.PizzasGuard],
      component: fromContainers.ProductsComponent
   },

   {
      path: 'new',
      canActivate: [fromGuards.PizzasGuard, fromGuards.ToppingsGuard],
      component: fromContainers.ProductItemComponent
   },
   {
      path: ':pizzaId',
      canActivate: [fromGuards.PizzaExistsGuard, fromGuards.ToppingsGuard],
      component: fromContainers.ProductItemComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   providers: [...fromGuards.guards],
   exports: [RouterModule]
})
export class ProductsRoutingModule {}
