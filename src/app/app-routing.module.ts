import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { CustomSerializer } from './store';

const routes: Routes = [
   { path: '', pathMatch: 'full', redirectTo: 'products' },
   {
      path: 'products',
      loadChildren: () => import('../products/products.module').then((x) => x.ProductsModule)
   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],

   exports: [RouterModule]
})
export class AppRoutingModule {}
