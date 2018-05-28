import { MAP_FETCH_MAIN_GRID } from './mapActions'

const gridReducer = (state = {}, action) => {
  switch (action.type) {
    case MAP_FETCH_MAIN_GRID + '_SUCCESS':
      return {
        points: action.response.results
      }
    case MAP_FETCH_MAIN_GRID + '_FAILURE':
      return {
        points: []
      }
    default:
      return state
  }
}

export default gridReducer
