import { connect } from 'react-redux';
import React, { Component } from 'react';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import { browserHistory } from 'react-router';
import cloneDeep from 'lodash/cloneDeep';
import classnames from 'classnames';

import TextFieldGroup from './textFieldGroup/TextFieldGroup';
import SelectTextGroup from './selectFieldGroup/SelectFieldGroup';
import timezones from '../../../../data/timezones';
import validateInput from '../../../../services/validations/signup';
import './SignUpForm.scss';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            timezone: '',
            errors: {},
            frontendErrors: {},
            isLoading: false
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeTimezone = (e) => {
        this.setState({ "timezone": e.target.value });
    }

    componentWillReceiveProps (nextprops) {
        if (nextprops.errors !== this.props.errors) {
            this.setState({isLoading: nextprops.isLoading})
            if (isEmpty(nextprops.errors)) {
                this.props.toogle();
                this.props.showFlashMessage({type: 'alert', text: 'You sign up successfuly!'})
            }
        }
    }

    componentWillMount () {

    }

    onSubmit = (e) => {
        e.preventDefault();
        //if (true) {
        if (this.isValid()) {
            this.props.saveNewUser({
                "username": this.state.username,
                "email": this.state.email,
                "password": this.state.password,
                "passwordConfirmation": this.state.passwordConfirmation,
                "timezone": this.state.timezone
            });
        };
    }

    isValid = () => {
        const { frontendErrors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ frontendErrors });
        }

        return isValid;
    }

    render = () => {
        const { frontendErrors } = this.state;

        return (
            <div className="signUpStyle-1">
                <form onSubmit={this.onSubmit}>
                    <h1>Join our community!</h1>

                    <TextFieldGroup
                        label="Username"
                        value={this.state.username}
                        field="username"
                        onChange={this.onChange}
                        frontendError={frontendErrors.username}
                    />

                    <TextFieldGroup
                        label="Email"
                        field="email"
                        onChange={this.onChange}
                        value={this.state.email}
                        frontendError={frontendErrors.email}
                    />

                    <TextFieldGroup
                        label="Password"
                        field="password"
                        type="password"
                        onChange={this.onChange}
                        value={this.state.password}
                        frontendError={frontendErrors.password}
                    />

                    <TextFieldGroup
                        label="Password Confirmation"
                        field="passwordConfirmation"
                        type="password"
                        onChange={this.onChange}
                        value={this.state.passwordConfirmation}
                        frontendError={frontendErrors.passwordConfirmation}
                    />

                    <SelectTextGroup
                        label="Timezone"
                        field="timezone"
                        type="text"
                        onChange={this.onChangeTimezone}
                        value={this.state.timezone}
                        frontendError={frontendErrors.timezone}
                    />

                    <div className="form-group">
                        <button disabled={this.state.isLoading } className="btn btn-primary btn-lg">
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

/*SignUpForm.propTypes = {
    toogle: React.PropTypes.func
}*/

const mapStateToProps = (state, ownProps) => {
    return {
        errors: state.newUser.errors || [],
        isLoading: state.newUser.isLoading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        saveNewUser: (data) => dispatch({ type: 'SAVE_CURRENT_USER', data }),
        showFlashMessage: (data) => dispatch({type: 'ADD_FLASH_MESSAGE', data})
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpForm);