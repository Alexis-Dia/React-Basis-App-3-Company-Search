import { SET_CURRENT_USER, DELETE_CURRENT_USER, SET_CURRENT_USER_FROM_TOKEN } from './loginActions';
import setAuthorizationToken from '../../utils/setAuthorizationToken';
import jwt from 'jsonwebtoken'
import isEmpty from 'lodash/isEmpty';

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, action = {}) => {

    switch(action.type) {

        case SET_CURRENT_USER + '_SUCCESS':
            const token = action.response.jwt;
            if (token) {
                localStorage.setItem('jwtToken', token);
                setAuthorizationToken(token);
                const user = jwt.decode(token);
                user["username"] = user.sub;
                user["id"] = user.jti;
                return {
                    isAuthenticated: isEmpty(user.errors),
                    user: user
                }
            }
            return state;

        case SET_CURRENT_USER_FROM_TOKEN:
            const user = jwt.decode(localStorage.jwtToken);
            user["username"] = user.sub;
            user["id"] = user.jti;
            return {
                isAuthenticated: isEmpty(user.errors),
                user: user
            }
            return state;

        case SET_CURRENT_USER + '_UNAUTHORIZED':
            action.response.data.data.user["errors"] = 'Invalid credentials'

            return {
                isAuthenticated: false,
                user: action.response.data.data.user
            };

        case DELETE_CURRENT_USER:
            localStorage.removeItem('jwtToken');
            setAuthorizationToken(false);
            return {
                isAuthenticated: false,
                user: {  }
            };

        default: return state;
    }
}