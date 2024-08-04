import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from '../reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { login, logout } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(private router: Router,
                private storeDb: Store<AppState>
    ) {

    }

    ngOnInit() {
      const userProfile = localStorage.getItem("user");
      if(userProfile){
        this.storeDb.dispatch(login({user: JSON.parse(userProfile)}))
      }
      //Si bien de esta manera es posible acceder a la informacion del store,
      //los selectors son una mejor opcion
      // this.isLoggedIn$ = this.storeDb.pipe(
      //   map(state => !!state["auth"].user)
      // );

      // this.isLoggedOut$ = this.storeDb.pipe(
      //   map(state => !state["auth"].user)
      // );

      this.isLoggedIn$ = this.storeDb.pipe(
        select(isLoggedIn)
      );

      this.isLoggedOut$ = this.storeDb.pipe(
        select(isLoggedOut)
      );
      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

    }

    logout() {
      this.storeDb.dispatch(logout());
    }

}
