import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import Header from 'src/components/header'
import SignIn from 'src/pages/sign-in'
import NewPost from 'src/pages/new-post'
import MainPage from 'src/pages/main'
//import FooterCounter from 'src/component/footer-counter'
import SignUp from 'src/pages/sign-up'
import PostPage from 'src/pages/post'
import TestPage from 'src/pages/test-page'
import MyPage from 'src/pages/my-page'

import * as Actions from './actions'
import './style.css';

class App extends Component {

  componentDidMount() {
    this.props.auth()
  }

  render() {
    console.log(this.props.user)
    return (
      <>
        <Header user={this.props.user} signOut={this.props.signOut}/>
        <Switch>
          <Route path='/test-page' exact={true} component={TestPage} />
          <Route path='/sign-in' exact={true} component={SignIn} />
          <Route path='/sign-up' exact={true} component={SignUp} />
          <Route path='/about' exact={true}> <h1>Information about project</h1> </Route>
          <Route path='/post/:id' exact={true} component={PostPage} />
          { this.props.user && <Route path='/new-post' exact={true} component={NewPost} /> }
          { this.props.user && <Route path='/my-page' exact={true} component={MyPage} /> }
          <Route path='/' exact={true} component={MainPage} />
        </Switch>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    user: state.appReducer.user
  });
};

// const mapDispatchToProps = (dispatch) => {
//   return ({
//     dispatch: dispatch,
//     increaseAction: (payload) => {
//       dispatch(Actions.increaseAction(payload));
//     },
//     decreaseAction: (payload) => {
//       dispatch(Actions.decreaseAction(payload));
//     }
//   });
// };

export default connect(mapStateToProps, Actions)(App);
