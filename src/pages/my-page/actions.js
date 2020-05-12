import API from "src/api"
import { push } from 'connected-react-router'

export const getUserInfoAction = (id) => {
return async function (dispatch) {
        try {
            dispatch({ type: 'MY_PAGE_GET_INFO_USER_REQUIEST' })
            const response = await API.user.getUserInfoById(id)
            //console.log(response.data)
            dispatch({
                type: 'MY_PAGE_GET_INFO_USER_SUCCESS',
                payload: response.data
            })
            //dispatch(push('/my-page'))
        } catch (e) {
            dispatch({
                type: 'MY_PAGE_GET_INFO_USER_FAIL'
            })
        }
    }
}

export const changeFieldAction = ({ fieldId, value }) => ({
  type: 'MY_PAGE_CHANGE_DATAFORM',
  payload: { fieldId, value }
});

export const changePasswordAction = (data) => {
    return async function(dispatch) {
        console.log(dispatch)
        try {
          dispatch({type: 'MY_PAGE_CHANGE_PASSWORD_REQUEST'});
          const response = await API.user.changePassword(data);
          console.log("RESPONCE", response)
          
          if (response.data.success) {
            dispatch({type: 'MY_PAGE_CHANGE_PASSWORD_SUCCESS', payload: response.data})
            dispatch(push('/'))
          } else {
            dispatch({type: 'MY_PAGE_CHANGE_PASSWORD_SUCCESS', payload: response.data})
          }
        //   const actionPush = push('/my-page');
        //   dispatch(actionPush);
        } catch(error) {
            if (error.response) {
              console.log(error.response.data)
              dispatch({type: 'MY_PAGE_CHANGE_PASSWORD_FAIL', payload: error.response.data})
            }
        }
      }
}