import { fetchAuth } from './loginApi'
import { takeEvery, call, put } from 'redux-saga/effects'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function fetchAuthApi (data) {
    return fetchAuth(data)
        .then(data => {
            return { response: data }
        })
        .catch(err => {
            return err
        })
}

export function * tryFetchAuth (data) {
        const { response, error } = yield call(fetchAuthApi, data)

        if (response.status === 401) {
            yield put({type: 'SET_CURRENT_USER_UNAUTHORIZED', response})
        } else if (response) {
            yield put({ type: 'SET_CURRENT_USER_SUCCESS', response })
        } else {
            yield put({ type: 'SET_CURRENT_USER_FAILURE', error })
        }

}

export function * loginAuthFetch () {
    yield takeEvery('SET_CURRENT_USER', tryFetchAuth)
}
