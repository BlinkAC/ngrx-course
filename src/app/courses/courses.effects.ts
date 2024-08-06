import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CourseActions } from "./actions-types";
import { concatMap, map } from "rxjs/operators";
import { CoursesHttpService } from "./services/courses-http.service";
import { allCoursesLoaded } from "./course.actions";

@Injectable()
export class CoursesEffects {

  loadCourses$ = createEffect(() =>
  this.actions$.pipe(//emite todas las acciones despachadas en la aplicación.
    ofType(CourseActions.loadAllCourses),//filtra por solo las de tipo <-
    concatMap(action => this.coursesHttpService.findAllCourses()), //hace la llamada de los cursos
    map(courses => allCoursesLoaded({courses})), //toma el osbervable que emitio la llamada al sevicio
                                                //y lo transforma de nuevo a una accion que lo que espera regresar create effect
  ));

  courseUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.courseUpdated),
      concatMap(action => this.coursesHttpService.saveCourse(action.update.id, action.update.changes))
    ),
    {dispatch: false}
  );
constructor(private actions$: Actions, private coursesHttpService: CoursesHttpService) {
}


}
