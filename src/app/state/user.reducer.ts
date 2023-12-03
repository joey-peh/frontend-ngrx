import { Address, User } from "./user.model";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createFeature, createReducer, on } from "@ngrx/store";
import { userAction } from "./user.action";

interface UserState extends EntityState<User> {
    isLoading: boolean;
}

interface AddressState extends EntityState<Address> {
    isLoading: boolean;
}

const adapterUser = createEntityAdapter<User>();
const adapterAddress = createEntityAdapter<Address>({ selectId: (e) => e.properties.place_id });
const userInitialState: UserState = adapterUser.getInitialState({ isLoading: false });
const addressInitialState: AddressState = adapterAddress.getInitialState({ isLoading: false, });

const initialState = {
    users: userInitialState,
    addressSuggestions: addressInitialState
}

const reducer = createReducer(initialState,
    // get user list
    on(userAction.getUserList, (state) => ({ ...state, isLoading: true })),
    on(userAction.getUserListSuccess, (state, { payload }) =>
        ({ ...state, users: adapterUser.setAll(payload, { ...state.users, isLoading: false }) })),

    //add one user
    on(userAction.addUser, (state, { payload }) =>
        ({ ...state, users: adapterUser.addOne({ ...payload, id: state.users.ids.length + 1 }, { ...state.users, isLoading: false }) })),

    //get address suggestion
    on(userAction.getAddressSuggestions, (state) => ({ ...state, isLoading: true })),
    on(userAction.getAddressSuggestionsSuccess, (state, { payload }) =>
        ({ ...state, addressSuggestions: adapterAddress.setAll(payload, { ...state.addressSuggestions, isLoading: false }) })),

    //failure case
    on(userAction.failure, (state) => ({ ...state, isLoading: false })),
);

const feature = createFeature({ name: 'user', reducer });

export const { selectAll: selectAllUsers } = adapterUser.getSelectors(feature.selectUsers);
export const { selectAll: selectAllAddress } = adapterAddress.getSelectors(feature.selectAddressSuggestions);

export const userFeature = { ...feature, selectAllUsers, selectAllAddress };

