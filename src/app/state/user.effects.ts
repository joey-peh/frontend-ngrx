import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { exhaustMap, map, catchError, of, switchMap } from "rxjs";
import { DataService } from "../data.service";
import { userAction } from "./user.action";
import { User } from "./user.model";


@Injectable()
export class UserEffects {
    readonly loadPerson$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(userAction.getUserList),
            exhaustMap(() => {
                return this.DataService.getAllPerson().pipe(
                    map((payload: User[]) => {
                        console.log("success");
                        return userAction.getUserListSuccess({ payload })
                    }
                    ),
                    catchError((error: Error) => {
                        console.log("failure");
                        return of(userAction.failure({ error }))
                    }
                    )
                );
            })
        );
    });

    readonly getAddressSuggestion$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(userAction.getAddressSuggestions),
            switchMap((action) => {
                return this.DataService.getAddressSuggestion(action.payload).pipe(
                    map((address: any) => {
                        return userAction.getAddressSuggestionsSuccess({ payload: address.features });
                    }
                    ),
                    catchError((error) => {
                        return of(userAction.failure(error))
                    }
                    )
                );
            })
        );
    });
    constructor(
        private readonly actions$: Actions,
        private readonly DataService: DataService
    ) { }
}