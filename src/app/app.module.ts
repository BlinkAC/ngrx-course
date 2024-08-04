import {BrowserModule} from '@angular/platform-browser';
import {NgModule, isDevMode} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';

import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import {RouterModule, Routes} from '@angular/router';
import {AuthModule} from './auth/auth.module';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';

import {EffectsModule} from '@ngrx/effects';
import {EntityDataModule} from '@ngrx/data';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as fromAppState from '../reducers';
import { metaReducers } from '../reducers';
import { authGuard } from './auth/auth.guard';
//import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: 'courses',
    //solo cuando se llegue a la url /courses se cargara el modulo - evitar cargar tanto codigo de
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    canActivate: [authGuard]//cualquier path que empiece por courses estara protegido por el guard (puede ver o no x pantalla)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];



@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes),
        MatMenuModule,
        MatIconModule,
        MatSidenavModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatToolbarModule,
        AuthModule.forRoot(),
        StoreModule.forRoot(fromAppState.reducers, {metaReducers}),
        StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
        EffectsModule.forRoot([])],//El arreglo vacio inicializa los servicios de ngrx effects y los agrega a la app
        providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {
}
