import { CHECK_CURRENT_USER, SAVE_CURRENT_USER } from './signupActions';
import jwt from 'jsonwebtoken'
import isEmpty from 'lodash/isEmpty';

const initialState = {
        errors: [],
        isLoading: false
};

export default (state = initialState, action = {}) => {

    switch(action.type) {

        case SAVE_CURRENT_USER + '_SUCCESS':
            return {
                errors: action.response,
                isLoading: false
            };
/*
        case SAVE_CURRENT_USER + '_FAILURE':
            return {
                errors: [],
                isLoading: false
            };*/

        case SAVE_CURRENT_USER + '_BAD_REQUEST':
            return {
                errors: action.response.data,
                isLoading: false
            };

        case CHECK_CURRENT_USER + '_BAD_REQUEST':
            return {
                ...state,
                errors: action.response.data,
                isLoading: true
                /*                errors: action.response.data,
                                isLoading: true*/
            };

        case CHECK_CURRENT_USER + '_SUCCESS':
            console.log('errors _SUCCESS reques: ', initialState.errors)
            return {
                errors: action.response,
                isLoading: false
            };
/*
        case CHECK_CURRENT_USER + '_FAILURE':
            return {
                errors: [],
                isLoading: false
            };*/

        default: return state;
    }
}