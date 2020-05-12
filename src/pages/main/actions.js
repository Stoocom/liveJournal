import API from "src/api"
//import { push } from 'connected-react-router'

export const getInitPostsAction = () => {
  return async function (dispatch) {
    try {
      dispatch({
        type: 'MAIN_PAGE_INIT_GET_POSTS_REQUEST'
      })
      const response = await API.posts.getList({ offsetStep: 10 })
      dispatch({
        type: 'MAIN_PAGE_INIT_GET_POSTS_SUCCESS',
        payload: response.data
      })
    } catch (e) {
      dispatch({
        type: 'MAIN_PAGE_INIT_GET_POSTS_REQUEST'
      })
    }
  }
}

export const getScrollPostsAction = (NPosts) => {
  return async function (dispatch) {
    try {
      dispatch({ type: 'MAIN_PAGE_SCROLL_GET_POSTS_REQUEST' })
      const response = await API.posts.getList({ offset: NPosts, offsetStep: 3 })
      dispatch({
        type: 'MAIN_PAGE_SCROLL_GET_POSTS_SUCCESS',
        payload: response.data
      })
    } catch (e) {
      dispatch({ type: 'MAIN_PAGE_SCROLL_GET_POSTS_FAIL' })
    }
  }
}

export const increaseLikeCountAction = (id) => {
  return async function (dispatch) {
    try {
      dispatch({ type: 'MAIN_PAGE_PUT_LIKE_REQUEST' })
      const response = await API.posts.increasePostLike(id)
      console.log(response)
      dispatch({
        type: 'MAIN_PAGE_PUT_LIKE_SUCCESS',
        payload: response.data
      })
    } catch (e) {
      dispatch({ type: 'MAIN_PAGE_PUT_LIKE_ERROR' })
    }
  }
}

export const increaseDislikeCountAction = (id) => {
  return async function (dispatch) {
    try {
      dispatch({ type: 'MAIN_PAGE_PUT_DISLIKE_REQUEST' })
      const response = await API.posts.increasePostDislike(id)
      console.log(response)
      dispatch({
        type: 'MAIN_PAGE_PUT_DISLIKE_SUCCESS',
        payload: response.data
      })
    } catch (e) {
      dispatch({ type: 'MAIN_PAGE_PUT_DISLIKE_ERROR' })
    }
  }
}