//guard en un servicio que se integra con el router

import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";
import { AppState } from "../../reducers";
import { select, Store } from "@ngrx/store";
import { isLoggedIn } from "./auth.selectors";
import { inject, Injectable } from "@angular/core";
import { catchError, map, tap } from "rxjs/operators";
import {Router} from "@angular/router";

//can activate guard
// @Injectable()
export const authGuard: CanActivateFn = (route, state) => {
  const storeDb = inject(Store<AppState>);
  const router = inject(Router);

  return storeDb.pipe(
    select(isLoggedIn),
    tap(loggedIn => {
      if (!loggedIn) {
        router.navigateByUrl('/login');
      }
    }),
    map(loggedIn => loggedIn),
    catchError(() => {
      router.navigateByUrl('/login');
      return of(false);
    })
  );
};
// export class AuthGuard implements CanActivateFn {

//   constructor(private storeDb: Store<AppState>, private router: Router) {

//   }
//   // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//   //   return this.storeDb.pipe(
//   //     select(isLoggedIn),
//   //     tap(loggedIn => {
//   //       if(!loggedIn){
//   //         this.router.navigateByUrl('/login');
//   //       }
//   //     })//par efectos secundarios
//   //   );
//   // }
//   export const authGuard: CanActivateFn = (route, state) => {
//     const storeDb = inject(Store<AppState>);
//     const router = inject(Router);

//     return storeDb.pipe(
//       select(isLoggedIn),
//       tap(loggedIn => {
//         if (!loggedIn) {
//           router.navigateByUrl('/login');
//         }
//       }),
//       map(loggedIn => loggedIn),
//       catchError(() => {
//         router.navigateByUrl('/login');
//         return of(false);
//       })
//     );
//   };
// }
