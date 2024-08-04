import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";
//los feature selectors ayudan a acceder a las propiedades
//de los features dentro del store de una forma type safe, esdecir,
//obtener recomendaciones al ahcer auth.[...] - las propiedades del objeto

export const selectAuthState = createFeatureSelector<AuthState>("auth")

//Los selectores son funciones que mantienen informacion en cache
export const isLoggedIn = createSelector(
  selectAuthState, //toma 2 parametros como minimo, una porcion del estado
(auth) => !!auth.user //Una funcion proyeccion
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn  => !loggedIn)
