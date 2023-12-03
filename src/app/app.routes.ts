import { Routes } from '@angular/router';
import { FormComponentComponent } from './form-component/form-component.component';
import { TableComponentComponent } from './table-component/table-component.component';
import { UserEffects } from './state/user.effects';
import { importProvidersFrom } from '@angular/core';
import { StoreModule, provideState } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { userFeature } from './state/user.reducer';

export const routes: Routes = [{
    path: '',
    children: [
        { path: '', component: TableComponentComponent }
    ],
    providers: [
        provideState(userFeature),
        importProvidersFrom(EffectsModule.forFeature(UserEffects))
    ]
}];
