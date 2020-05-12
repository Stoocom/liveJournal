import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as Actions from "./actions"
import style from './style.css'
import Button from 'src/components/button'
import Input from 'src/components/input'

class MyPage extends Component {
    static propTypes = {
        dataForm: PropTypes.object.isRequired,
        changeFieldAction: PropTypes.func.isRequired,
    }
    element = null

    constructor(props) {
        super(props);
        this.state = {
            date: '',
            isShowModalWindow: false
        };
        this.element = document.createElement('div');
    }

    componentDidMount() {
        const { user } = this.props
        this.props.getUserInfoAction(user.id)
        console.log(user.registrationDate)
        let date = new Date(user.registrationDate)
        const registrationDate = date.toLocaleString('ru', { day: 'numeric', month: 'long', year: 'numeric' })

        this.setState({
            date: registrationDate
        })

        document.body.append(this.element);
    }

    componentWillUnmount() {
        this.element.remove()
    }

    onClick = () => {
        this.setState({
            isShowModalWindow: !this.state.isShowModalWindow
        })
    }

    onSubmit = () => {
        this.props.changePasswordAction(this.props.dataForm)
    }

    // onclose = () => {
    //     this.props.changePasswordAction(this.props.dataForm)
    // }

    checkPassword = () => {
        console.log('checkPassword')
    }

    render() {

        //const { isShowModalWindow } = this.state;
        const { userInfo, errors } = this.props;
        //const avatar = "http://school-blog.ru/avatar-818736c2cd42530ec1c45ea6dc4fedfa.svg" + userInfo.avatar
        return (
            <div>
                {userInfo
                    ?
                    <div className={style.postFormWrapper}>
                        <img className={style.avatar} src={"http://school-blog.ru/images/" + userInfo.avatar} alt="avatar" width="200" height="200"></img>
                        <div className={style.rowWrapper}>
                            <div className={style.row}>
                                <h3 className={style.login}>{userInfo.login}</h3>
                            </div>
                            <div className={style.row}>
                                <div>Имя {userInfo.firstName}</div>
                            </div>
                            <div className={style.row}>
                                <div>Фамилия {userInfo.lastName}</div>
                            </div>
                            <div className={style.row}>
                                <div>Отчество {userInfo.lastName}</div>
                            </div>
                            <div className={style.row}>
                                <div>Дата регистрации {this.state.date}</div>
                            </div>
                            <div className={style.row}>
                                <div>E-mail {userInfo.email}</div>
                            </div>
                            <div className={style.row}>
                                <div>Количество постов {userInfo.postsCount}</div>
                            </div>
                            <div className={style.row}>
                                <div>Количество поставленных лайков {userInfo.likesCount}</div>
                            </div>
                            <div className={style.row}>
                                <div>Количество поставленных дизлайков {userInfo.dislikesCount}</div>
                            </div>
                            <div className={style.row}>
                                <Button onClick={this.onClick}>Изменить пароль</Button>
                            </div>

                        </div>
                    </div>
                    :
                    <div>loading...</div>
                }
                <div>
                    {this.state.isShowModalWindow
                        &&
                        <div className={style.wrapper}>
                            <div className={style.modal}>
                                <div className={style.row}>
                                    <div>
                                        <Input
                                            id="currentPassword"
                                            placeholder="currentPassword"
                                            value={this.props.dataForm.currentPassword}
                                            onChange={this.props.changeFieldAction}
                                            onBlur={this.checkPassword}
                                            error={errors.currentPassword}
                                        />
                                    </div>
                                </div>

                                <div className={style.row}>
                                    <div>
                                        <Input
                                            id="newPassword"
                                            placeholder="newPassword"
                                            value={this.props.dataForm.firstName}
                                            onChange={this.props.changeFieldAction}
                                            error={errors.newPassword}
                                        />
                                    </div>
                                </div>

                                <div className={style.button}>
                                    <Button onClick={this.onSubmit}>Изменить</Button>
                                    <Button onClick={this.onClick}>Вернуться</Button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.appReducer.user,
        userInfo: state.myPageReducer.userInfo,
        dataForm: state.myPageReducer.dataForm,
        errors: state.myPageReducer.errors
    };
}

// const mapDispatchToProps = dispatch => {
//     return {
//       setYearAction: year => dispatch(setYear(year))
//     }
//   }
export default connect(mapStateToProps, Actions)(MyPage)
