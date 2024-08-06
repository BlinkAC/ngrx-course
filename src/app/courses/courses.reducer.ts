import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { compareCourses, Course } from "./model/course";
import { createReducer, on } from "@ngrx/store";


import { CourseActions } from "./actions-types";
import { allCoursesLoaded } from "./course.actions";

export interface CoursesState extends EntityState<Course> {
  //para verificar si la data de los cursos esta presente en store no se puede usar selecAll
  //por en un determinado punto al inicio de la app el nodo de courses esta vacio porque
  //se hizo la request para apenas llenar la propiedad courses o si esta vacio por un posible
  //error del servicio - por ende no se puede validar directamente si la data esta lista
  allCoursesLoaded: boolean;

}

 export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses//ordena los cursos pero no creo necesario
  //selectId: course => course.couserId //cuando nuestor id tiene un nombre diferente al default
 });

 export const initialCoursesState = adapter.getInitialState({allCoursesLoaded: false});

 export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.allCoursesLoaded, (state, action) =>
  adapter.addMany(action.courses, {...state, allCoursesLoaded: true})),
  on(CourseActions.courseUpdated, (state, action) =>
  adapter.updateOne(action.update, state))
 );

 export const {selectAll} = adapter.getSelectors();

