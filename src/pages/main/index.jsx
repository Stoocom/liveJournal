import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from "./actions"
import { Link } from 'react-router-dom'
import style from './style.css';

class MainPage extends Component {
    
    componentDidMount() {
        this.props.getInitPostsAction();
        window.addEventListener('scroll', this.onScroll)
    }

    onScroll = (e) => {
        const { posts, isLoadingPosts } = this.props;
        const postsLength = posts.length;
        const windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
        console.log('postsLength: ', postsLength)
        if(windowRelativeBottom <= document.documentElement.clientHeight + 100 && !isLoadingPosts ) {
          console.log('postsLengthAfter: ', postsLength)
          this.props.getScrollPostsAction(postsLength)
        }
    }

    onClickLike = (event) => {
     
      const { id } = event.target
     
      this.props.increaseLikeCountAction(id)
    }
    onClickDislike = (event) => {
      const { id } = event.target
      this.props.increaseDislikeCountAction(id)
    }

    componentWillUnmount() {
        window.addEventListener('scroll', this.onScroll)
    }

    render() {
        const { posts } = this.props;
        console.log(posts);
        
        //let arrayOfPosts = [];
        
        return (
            <div
                className={style.postList}
                onScroll={this.onScroll}
            >
                { ((posts.length > 0) && (Array.isArray(posts))) ? posts.map((postItem, index) => {
                    return (
                        <div key={index + postItem.title} className={style.postWrapper}>
                            <div className={style.postTitle}>
                                <Link className={style.linkTitle} to={`/post/${postItem.id}`}>{postItem.title}</Link>
                            </div>
                            <div className={style.postContent}>{postItem.content}</div>
                            <div className={style.footer}>
                                <div className={style.leftColoumn}>
                                    <div id={postItem.id} onClick={this.onClickLike} className={style.like}>Like {postItem.likesCount}</div>
                                    <div id={postItem.id} onClick={this.onClickDislike} className={style.dislike}>Dislike {postItem.dislikesCount}</div>
                                </div>
                                <div className={style.viewWrapper}>
                                {postItem.viewsCount} <div className={style.eye}></div>
                                </div>
                            </div>
                        </div>
                    )
                })
                : 'loading'
            }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: state.mainPageReducer.posts,
        isLoadingPosts: state.mainPageReducer.isLoadingPosts
    };
}

export default connect(mapStateToProps, Actions)(MainPage)