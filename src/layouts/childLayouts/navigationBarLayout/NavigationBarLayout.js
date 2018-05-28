import React, { Component } from 'react'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import setAuthorizationToken from '../../../utils/setAuthorizationToken';
import setCurrentUser from '../../../utils/setCurrentUser';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Home from 'material-ui/svg-icons/action/home';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import ActionPowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SignUpForm from './signUp/SignUpForm'
import LogInForm from './logIn/LoginForm'

class NavigationBarLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalSignUp: false,
            modalLogIn: false
        };
    }

    logout = () => {
        this.props.logout();
        this.props.deleteAllFlashMessages();
    }

    toggleSignUp = () =>  {
        this.setState({
            modalSignUp: !this.state.modalSignUp
        });
    }

    toggleLogIn = () =>  {
        this.setState({
            modalLogIn: !this.state.modalLogIn
        });
    }

    onClick = () =>  {
        return <Link to="/"/>
    }


    render = () => {

        const { isAuthenticated } = this.props.auth;

        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><a href="#" onClick={this.logout}>Logout</a></li>
            </ul>
        );

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link onClick={this.toggleSignUp}>Sign up</Link></li>
                <li><Link onClick={this.toggleLogIn}>Login</Link></li>
            </ul>
        );

        return (
            <div className="navigatibBarMainStyles">
                <MuiThemeProvider>
                    <AppBar
                        title='Best Ventures'
                        titleStyle={{color: '#000000', fontSize: '18px'}}
                        style={{backgroundColor: '#ffffff', zIndex: 200}}
                        iconElementLeft={
                            <Link to="/">
                                <IconButton iconStyle={{fill: '#000000'}}>
                                    <Home/>
                                </IconButton>
                            </Link>

                        }
                        onLeftIconButtonClick={this.onClick}
/*                        iconElementRight={
                            <IconButton iconStyle={{fill: '#000000'}} onClick={this.logout}>
                                <ActionPowerSettingsNew/>
                            </IconButton>
                        }
                        children={
                            <IconMenu
                                iconButtonElement={
                                    <IconButton>
                                        <ActionAccountBox />
                                    </IconButton>
                                }
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                iconStyle={{fill: '#000000', marginTop: '8px'}}
                            >
                                <MenuItem primaryText="Profile"/>
                                <MenuItem primaryText="Settings"/>
                                <MenuItem primaryText="Help"/>
                            </IconMenu>
                        }*/
                        children={
                            <div>
                                {/*{ isAuthenticated ? userLinks : guestLinks }*/}
                            </div>
                        }
                    >
                    </AppBar>
                </MuiThemeProvider>
                {/*          <nav className="navbar navbar-default">
               <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand">Your awesome service!</Link>
                    </div>

                    <div className="collapse navbar-collapse">
                        { isAuthenticated ? userLinks : guestLinks }
                    </div>
                </div>
            </nav>*/}
                <Modal isOpen={this.state.modalSignUp} toggle={this.toggleSignUp} className={this.props.className}>
                    {/*<ModalHeader toggle={this.toggle}>Modal title</ModalHeader>*/}
                    <ModalBody>
                        <SignUpForm toogle={this.toggleSignUp}/>
                    </ModalBody>
                    {/*<ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>*/}
                </Modal>

                <Modal isOpen={this.state.modalLogIn} toggle={this.toggleLogIn} className={this.props.className}>
                    <ModalBody>
                        <LogInForm toggleLogIn={this.toggleLogIn}/>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

/*NavigationBarLayout.propTypes = {
    auth: React.PropTypes.object.isRequired,
/!*    logout: React.PropTypes.func.isRequired*!/
}*/

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteAllFlashMessages: (data) => dispatch({type: 'DELETE_ALL_FLASH_MESSAGES', data}),
        logout: (data) => dispatch({type: 'DELETE_CURRENT_USER', data}),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBarLayout);