import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../action-types';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User
};

export const initialAuthState: AuthState = {
  user: undefined
}

// export const reducers: ActionReducerMap<AuthState> = {

// };

//Los reducer son funciones planas/plain que representan que se debe hacer
//en respuesta a una action

//1. El estado actual del store y 2.La accion que se envio 3. regresa una nueva version del store
//NO AFECTA EL ESTADO ACTUAL, GENERA 1 NUEVO BASADO EL ESTADO PREVIO Y LA ACCION

// function authReducer(state, action): AuthState {

// }

export const authReducer = createReducer(
  initialAuthState,
  //En respuesta a login haz x cosa
  on(AuthActions.login, (state, action) => {
    return {
      user: action.user
    }
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      user: undefined
    }
  })
);
