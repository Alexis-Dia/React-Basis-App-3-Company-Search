import { fetch, seed, del, fetchMainGrid } from './mapApi'
import { takeEvery, call, put } from 'redux-saga/effects'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function mapFetchWithApi (data) {
  return fetch(data.data)
    .then(data => {
      return { response: data }
    })
    .catch(err => {
      return err
    })
}
export function mapSeedWithApi (data) {
  return seed(data.data)
    .then(data => {
      return { response: data }
    })
    .catch(err => {
      return err
    })
}

export function mapDeletePointhWithApi (data) {
  return del(data.id)
    .then(data => {
      return { response: data }
    })
    .catch(err => {
      return err
    })
}

export function mapFetchGridMapWithApi (data) {
  return fetchMainGrid(data)
    .then(data => {
      return { response: data }
    })
    .catch(err => {
      return err
    })
}

export function * tryMapFetch (data) {
  const { response, error } = yield call(mapFetchWithApi, data)
  if (response) {
    yield put({ type: 'MAP_FETCH_SUCCESS', response })
  } else {
    yield put({ type: 'MAP_FETCH_FAILURE', error })
  }
}

export function * tryMapSeed (data) {
  const { response, error } = yield call(mapSeedWithApi, data)
  if (response) {
    yield put({ type: 'MAP_SEED_SUCCESS', response })
  } else {
    yield put({ type: 'MAP_SEED_FAILURE', error })
  }
}

export function * tryMapDeletePoint (data) {
  const { response, error } = yield call(mapDeletePointhWithApi, data)
  if (error) {

  }
}

export function * tryMapMainGridFetch (data) {
  try {
    yield put(showLoading())
    const { response, error } = yield call(mapFetchGridMapWithApi, data)
    if (response) {
      yield put({ type: 'MAP_FETCH_MAIN_GRID_SUCCESS', response })
    } else {
      yield put({ type: 'MAP_FETCH_MAIN_GRID_FAILURE', error })
    }
  } finally {
    yield put(hideLoading())
  }
}

export function * mapFetch () {
  yield takeEvery('MAP_FETCH', tryMapFetch)
}

export function * mapSeed () {
  yield takeEvery('MAP_SEED', tryMapSeed)
}

export function * mapDeletePoint () {
  yield takeEvery('MAP_DELETE_POINT', tryMapDeletePoint)
}

export function * mapGridFetch () {
  yield takeEvery('MAP_FETCH_MAIN_GRID', tryMapMainGridFetch)
}
