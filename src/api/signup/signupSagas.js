import { fetch, fetchIfUserExist } from './signupApi'
import { takeEvery, call, put } from 'redux-saga/effects'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function signupFetchApi (data) {
    return fetch(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * trySignupFetch (data) {
        const { response, error } = yield call(signupFetchApi, data)
        if (response.status === 400) {
            yield put({type: 'SAVE_CURRENT_USER_BAD_REQUEST', response})
        } else if (response) {
            yield put({ type: 'SAVE_CURRENT_USER_SUCCESS', response })
        } else {
            yield put({ type: 'SAVE_CURRENT_USER_FAILURE', error })
        }
}

export function * signupFetch () {
    yield takeEvery('SAVE_CURRENT_USER', trySignupFetch)
}

export function ifUserExistFetchApi (data) {
    return fetchIfUserExist(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryIfUserExistFetch (data) {
    const { response, error } = yield call(ifUserExistFetchApi, data)
    if (response.status === 400) {
        yield put({type: 'CHECK_CURRENT_USER_BAD_REQUEST', response})
    } else if (response) {
        yield put({type: 'CHECK_CURRENT_USER_SUCCESS', response})
    } else {
        yield put({ type: 'CHECK_CURRENT_USER_FAILURE', error })
    }
}

export function * ifUserExistFetch () {
    yield takeEvery('CHECK_CURRENT_USER', tryIfUserExistFetch)
}