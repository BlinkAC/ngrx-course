import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {MatCardModule} from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { StoreModule } from '@ngrx/store';
import {AuthService} from "./auth.service";
import { EffectsModule } from '@ngrx/effects';
import * as fromAuth from './reducers';
import { AuthEffects } from './auth.effects';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        RouterModule.forChild([{path: '', component: LoginComponent}]),
        //ng g store app/auth/Auth --module auth.module.ts solo afecta al modulo especifo no al root
        StoreModule.forFeature(
          fromAuth.authFeatureKey, //automatica
          fromAuth.authReducer,
          { }),
        EffectsModule.forFeature([AuthEffects]), //los effects estaran ligados a este modulo y
                                               //su implementacion es similar a la de un servicio (inyectable)

    ],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
              AuthService,

            ]
        }
    }
}
