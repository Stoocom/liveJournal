import API from "src/api"
//import { push } from 'connected-react-router'

export const getPostDataAction = (id) => {
    return async function(dispatch) {
        try {
            dispatch({ type: 'POST_PAGE_GET_DATA_REQUEST' })
            const response = await API.posts.getPostById(id)
            dispatch({
                type: 'POST_PAGE_GET_DATA_SUCCESS', 
                payload: response.data
            })
        } catch(e) {
            dispatch({
                type: 'POST_PAGE_GET_DATA_FAIL'
            })
        }
    }
}
