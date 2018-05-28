import { connect } from 'react-redux';
import React, { Component } from 'react'

import TextFieldGroup from '../signUp/textFieldGroup/TextFieldGroup';
import './LoginForm.scss';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auth: {user: {errors: ''}},
        };
    }

    componentWillMount () {
        this.setState({auth: {user: {errors: ''}}});
    }

    componentWillReceiveProps (nextprops) {
        if (nextprops.user !== this.props.user) {
            this.setState({auth: nextprops.user});
            if (nextprops.user.isAuthenticated) {
                this.props.showFlashMessage({ type: 'success',  text: 'You log in successfuly. Welcome!'})
                this.props.toggleLogIn();
            }
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (true) {
            this.props.login(
                {
                    user:
                        {
                            username: this.state.identifier,
                            password: this.state.password
                        }
                }
            );
        }
    }

    onChange = (e) => {
        console.log('eee', e)
        this.setState({ [e.target.name]: e.target.value });
    }

    render = () => {
        const { identifier, password } = '';

        return (
            <div>
                <div>
                    <div></div>
                    <div className="logInStyle-1">
                        <form onSubmit={this.onSubmit} >
                            <h1>Login</h1>
                            { this.state.auth.user.errors !== '' && <div className="alert alert-danger">{this.state.auth.user.errors}</div>}
                            {/*{ this.props.user.user.errors !== '' && <div className="alert alert-danger">{this.props.user.errors}</div>}*/}
                            <TextFieldGroup
                                field="identifier"
                                label="Username / Email"
                                value={identifier}
                                onChange={this.onChange}
                            />

                            <TextFieldGroup
                                field="password"
                                label="Password"
                                value={password}
                                onChange={this.onChange}
                                type="password"
                            />

                            <div className="form-group">
                                <button className="btn btn-primary btn-lg" disabled={this.props.user.isAuthenticated}>Login</button>
                            </div>
                        </form>
                    </div>
                    <div></div>
                </div>
            </div>
        );
    }
}

/*LoginForm.propTypes = {
    login: React.PropTypes.func.isRequired
}

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}*/

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.auth || {}
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        login: (data) => dispatch({type: 'SET_CURRENT_USER', data}),
        showFlashMessage: (data) => dispatch({type: 'ADD_FLASH_MESSAGE', data})
    }
}

/*LoginForm.propTypes = {
    toggleLogIn: React.PropTypes.func.isRequired
}*/

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm)