import React, { Component }  from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import './FlashMessage.scss'

class FlashMessage extends Component {
    constructor(props) {
        super(props);
    }

    onClick = () => {
        this.props.deleteFlashMessage(this.props.message.id);
    }

    render = () => {
        const { id, type, text } = this.props.message;
        return (
            <div className='flashMessageMainStyle'>
                <div className={classnames('alert', {
                    'alert-success': type === 'success',
                    'alert-info': type === 'alert',
                    'alert-warning': type === 'warning',
                    'alert-danger': type === 'error'
                })}>
                    <button onClick={this.onClick} className="close"><span>&times;</span></button>
                    {text}
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteFlashMessage: (data) => dispatch({type: 'DELETE_FLASH_MESSAGE', data})
    }
}

export default connect(null, mapDispatchToProps)(FlashMessage);