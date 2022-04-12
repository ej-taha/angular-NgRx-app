import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsRoutingModule } from './products-routing.module';

import { productsFeatureKey, reducers, effects } from './store';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// services
import * as fromServices from './services';

@NgModule({
   imports: [
      CommonModule,
      ReactiveFormsModule,
      HttpClientModule,
      ProductsRoutingModule,
      // RouterModule.forChild(ROUTES),
      StoreModule.forFeature(productsFeatureKey, reducers),
      EffectsModule.forFeature(effects)
   ],
   providers: [...fromServices.services /* , ...fromGuards.guards */],
   declarations: [...fromContainers.containers, ...fromComponents.components],
   exports: [...fromContainers.containers, ...fromComponents.components]
})
export class ProductsModule {}
