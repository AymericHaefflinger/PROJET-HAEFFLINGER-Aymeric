import { NgxsModule, Action, Selector, State, StateContext } from "@ngxs/store";
import { JwtStateModel } from "./jwt-state-model";
import { CreateJwt } from "./jwt-action";

@State<JwtStateModel>({
  name: "jwt",
  defaults: {
    jwt : {"token":""}
  }
})
export class JwtState {
  @Selector()
  static getToken(state: JwtStateModel): String {
    return state.jwt.token;
  }

  @Action(CreateJwt)
  Create(
    { getState, patchState }: StateContext<JwtStateModel>,
    { payload }: CreateJwt
  ) {
    const state = getState();
    patchState({
      jwt : payload
    });
  }
}