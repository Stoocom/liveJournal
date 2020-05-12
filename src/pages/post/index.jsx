import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from "./actions";

// import Input from 'src/components/input'
// import Textarea from 'src/components/textarea'
// import Button from 'src/components/button'
import style from './style.css';

class PostPage extends Component {
    
    componentDidMount() {
        console.log(this.props)
        const { match } = this.props
        console.log(match.params.id)
        this.props.getPostDataAction(match.params.id)
    }

    render() {
        
        const { data } = this.props
        console.log(data)
        return (
            <div>
                {data 
                    ? 
                        <div className={style.postWrapper}>
                            <div className={style.postTitle}>{data.title}</div>
                            <div className={style.postContent}>{data.content}</div>
                        </div>
                    : 
                        <div>loading...</div>
                }
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         posts: state.mainPageReducer.posts
//     };
// }
function mapStateToProps(state) { // все что вызывает данная функция попадает в props
    return {
       data: state.postReducer.data
    };
}
 
export default connect(mapStateToProps, Actions)(PostPage)