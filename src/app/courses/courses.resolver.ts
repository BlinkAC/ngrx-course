import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../../reducers";
import { loadAllCourses } from "./course.actions";
import { filter, finalize, first, tap } from "rxjs/operators";
import { areCoursesLoaded } from "./courses.selector";

// @Injectable()
// export class CoursesResolverService implements Resolve

export const CoursesResolver : ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) : Observable<any> => {
  let loading = false;
  const store: Store<AppState>  = inject(Store<AppState>);

  return store.pipe(
    select(areCoursesLoaded),
    tap((areCoursesLoaded) => {
      if(!loading && !areCoursesLoaded) {
        loading = true;
        store.dispatch(loadAllCourses());
      }
    }),
    filter(areCoursesLoaded => areCoursesLoaded),
    first(),
    finalize(() => loading = false)
  );

};
