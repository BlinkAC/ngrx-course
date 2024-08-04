import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { AuthActions } from "./action-types";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {

  //Forma 3 y mas segura
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      tap(loginAction => {
        localStorage.setItem('user', JSON.stringify(loginAction.user))
      })
    ),
    {dispatch: false}//
  );

  logout$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => {
      localStorage.removeItem('user');
      this,this.router.navigateByUrl('/login');
    })),
    {dispatch: false}
  );
  constructor(private actions$: Actions, private router: Router) {
   /*//Forma 2
    const login$ = this.actions$.pipe(
      ofType(AuthActions.login),
      //se convierte en un osbervable que emite acciones de tipo login unicamente
      tap(loginAction => {
        localStorage.setItem('user', JSON.stringify(loginAction.user))
      })
    );
    login$.subscribe();

    //Forma 1
    actions$.subscribe(action => {
      //Cuando se efectua un cambio el sevicio lo percibe
      //el observable regresa acciones y este es el lugar
      //donde la logica relacionada al efecto secundario se
      //debe realizar
      if(action.type == '[Login Page] User Login'){
        localStorage.setItem('user', JSON.stringify(action["user"]))// no es type safe porque la
                                                                    //reaccion no es a un tipo en
                                                                    //especifico (user)
      }
    });*/
  }
}
