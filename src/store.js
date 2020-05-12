import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'

import appReducer from 'src/app/reducer.js'
import signInReducer from 'src/pages/sign-in/reduce.js'
import signUpReducer from 'src/pages/sign-up/reduce.js'
import newPostReducer from 'src/pages/new-post/reduce.js'
import mainPageReducer from 'src/pages/main/reduce.js'
import postReducer from 'src/pages/post/reduce.js'
import myPageReducer from 'src/pages/my-page/reduce.js'
import { history } from 'src/history.js'

const logger = createLogger({
  collapsed: true
});

//const routerMiddleware = routerMiddleware(history)

const creatRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  appReducer,
  signInReducer,
  signUpReducer,
  newPostReducer,
  mainPageReducer,
  postReducer,
  myPageReducer
});
// У стора есть диспатч
// function myMiddleware(store) {
//   return function(next) {
//     return function(action) {
//       if(typeof action === "function") {
//         action(store.dispatch, store.getState)
//       } else {
//         next(action)
//       }
//     }
//   }
// }

const store = createStore(
  creatRootReducer(history), 
  applyMiddleware(
    routerMiddleware(history),
    logger,
    thunk
  ));

//store.dispatch({ qwer: 'qwer'}) единственный способ изменения стора


export default store;
