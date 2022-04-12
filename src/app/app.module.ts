import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
// Not used in Production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { reducers, effects, CustomSerializer } from './store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './containers/app/app.component';
import { ProductsModule } from 'src/products/products.module';

const environment = {
   development: true,
   production: false
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];

@NgModule({
   declarations: [AppComponent],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      StoreModule.forRoot(reducers, { metaReducers }),
      ProductsModule,
      EffectsModule.forRoot(effects),
      StoreRouterConnectingModule.forRoot(),
      environment.development ? StoreDevtoolsModule.instrument() : []
   ],
   providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
   bootstrap: [AppComponent]
})
export class AppModule {}
