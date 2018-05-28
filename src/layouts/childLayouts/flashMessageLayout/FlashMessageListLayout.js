import React from 'react';
import FlashMessage from './FlashMessage';
import { connect } from 'react-redux';
import './FlashMessageListLayout.scss'

class FlashMessagestListLoyout extends React.Component {
    constructor(props) {
        super(props);
        this.state = null;
    }

    componentWillMount () {

    }

    componentWillReceiveProps (nextprops) {
        if (nextprops !== this.props) {

        }
    }

    render() {
        const messages = this.props.messages.map(message =>
            <FlashMessage
                key={message.id}
                message={message} />
        );
        return (
            <div>
{/*                    <div className='flash-float-right'>
                        <div className='flashMessageListLayout'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div>{messages}</div>
                        </div>
                    </div>*/}
                <div>{messages}</div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        messages: state.flashMessages
    }
}

export default connect(mapStateToProps, null)(FlashMessagestListLoyout);