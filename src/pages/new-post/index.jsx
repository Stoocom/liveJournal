import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from 'src/components/input'
import Textarea from 'src/components/textarea'
import Button from 'src/components/button'
import * as Actions from "./actions"
import style from './style.css';

class NewPost extends Component {
    element = null

    constructor(props) {
        super(props);
        this.element = document.createElement('div');
        this.state = {
            isShowValueError: false,
        };
    }
    onChangeData = (data) => {
        const fieldId = data.fieldId;
        const value = data.value;
        console.log(value.length, this.state.isShowValueError);
        if (value.length <= 2) {
            
        }
        this.props.changeDataAction(fieldId, value);
    }
    onSubmit = () => {
        this.props.createPostAction(this.props.data)
    }

    render() {
        const { data } = this.props
        console.log(data)
        return (
            <div className={style.postFormWrapper}>
                <div className={style.row}>
                    <div>Заголовок</div>
                    <Input
                        id="title"
                        value={data.title}
                        onChange={this.onChangeData}
                    />
                </div>
                <div className={style.row}>
                    <div>Контент</div>
                    <Textarea
                        id="content"
                        value={data.content}
                        onChange={this.onChangeData}
                    />
                </div>
                <div>
                    <Button id="submit" onClick={this.onSubmit}>Создать</Button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        data: state.newPostReducer.data
    };
}

export default connect(mapStateToProps, Actions)(NewPost)