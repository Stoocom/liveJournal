import React, {Component} from 'react'
import style from './style.css'

class Modal extends Component {
    render() {
        console.log(this.props)
        console.log(this.state)
        return (
            <div className={style.wrapper}>
                <div className={style.modal}>
                    {
                        this.props.content
                    }
                </div>
                <button onClick={this.props.closeModal}>Close</button>
            </div>
        )
    }
}

export default Modal