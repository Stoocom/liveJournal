import React, {Component} from 'react'
import Modal from 'src/components/modal'

class TestPage extends Component {

    state = {
        isShowModal: false
    }

    onClick = () => {
        console.log(this.props)
        console.log(this.state)
        this.setState({
            isShowModal: !this.state.isShowModal
        })
    }   
    render() {
        const { isShowModal } = this.state;

        return (
            <div>
                Test Page
                <button onClick={this.onClick}>Open</button>

                {
                    isShowModal && <Modal closeModal={this.onClick} content="Some text"/>
                }
            </div>
        );
    }
}

export default TestPage