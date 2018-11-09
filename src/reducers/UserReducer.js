import { MODIFICA_EMAIL, MODIFICA_PASSWORD, SIGNIN_COMPLETE } from "../components/types";
const INITIAL_STATE = {
    name: "",
    email: "",
    password: "",
    token: "",
    signin_complete: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case MODIFICA_EMAIL: 
    return { ...state, email: action.payload }

    case MODIFICA_PASSWORD:
    return { ...state, password: action.payload }

    case SIGNIN_COMPLETE:
    console.log(state) 
    return { ...state, signin_complete: action.payload}

    default:
      return state;
  }
};
