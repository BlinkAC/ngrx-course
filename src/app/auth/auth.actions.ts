import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";

//Action creator
export const login = createAction(
  //1.De donde viene la accion 2.Evento o comando ejecutar
  "[Login Page] User Login",
  props<{user: User}>()
)

export const logout = createAction(
  "[Top Menu] User Logout"
)
