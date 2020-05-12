import API from "../../api";
import { push } from "connected-react-router";

export const changeFieldAction = ({ fieldId, value }) => ({
  type: 'SIGN-UP_CHANGE_DATA_FORM',
  payload: { fieldId, value }
});

export const signUpAction = (data) => {
  return async function(dispatch) {
    console.log(dispatch)
    try {
      dispatch({type: 'SIGN_UP_REQUEST'});
      const response = await API.user.signUp(data);
      console.log("RESPONCE", response)
      dispatch({type: 'SIGN_UP_SUCCESS', payload: response.data})
      const actionPush = push('/');
      dispatch(actionPush);
    } catch(error) {
        if (error.response) {
          console.log(error.response.data)
          dispatch({type: 'SIGN_UP_ERROR', payload: error.response.data})
        }
    }
  }
}

export function checkLoginAction (login) {
  return async function (dispatch) {
    try {
      const response = await API.user.checkLogin(login);
      console.log(response)
      dispatch({type: 'SIGN_UP_CHECK_LOGIN_SUCCESS', payload: response.data})
    } catch(error) {

    }
  }
}
