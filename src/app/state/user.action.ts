import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Address, User } from "./user.model";

export const userAction = createActionGroup({
    source: 'User',
    events: {
        'getUserList': emptyProps(),
        'getUserListSuccess': props<{ payload: User[] }>(),
        'addUser': props<{ payload: User }>(),
        'getAddressSuggestions': props<{ payload: string }>(),
        'getAddressSuggestionsSuccess': props<{ payload: Address[] }>(),
        'failure': props<{ error: Error }>()
    }
});