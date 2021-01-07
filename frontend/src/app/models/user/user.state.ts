import { AddUser, DisconnectUser, NewJwt } from "./user.action";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { User } from "./user";
import { Injectable } from "@angular/core";
import { patch, removeItem } from "@ngxs/store/operators";

export interface UserStateModel {
  user: User;
  token: string;
  isConnected: Boolean;
}

@State<UserStateModel>({
  name: "user",
  defaults: { 
    user: null, 
    token:"",
    isConnected: false
  }
})

@Injectable()
export class UserState {
  @Selector()
  static getUser(state: UserStateModel) {
    return state.user;
  }

  @Selector()
  static IsConnected(state: UserStateModel) : Boolean{
      return state.isConnected;
  }

  @Selector()
  static GetLoggedToken(state: UserStateModel) : string{
      return state.token;
  }

  @Action(AddUser)
  add(
    { getState, patchState, setState }: StateContext<UserStateModel>,
    { payload }: AddUser
  ) {
    const state = getState();
    setState({
      ...state,
      user: payload,
      isConnected: true
    });
  }

  @Action(DisconnectUser)
  disconnect
  ({getState, patchState} : StateContext<UserStateModel>, 
    {} : DisconnectUser){
      patchState({
          user: null,
          isConnected: false,
          token: ""
      });
  }
  
  @Action(NewJwt)
  newJwt(
    {getState, patchState} : StateContext<UserStateModel>,
     {payload} : NewJwt){
      console.log("New JWT: ", payload);
      patchState({
          token: payload
      });
  }
}
