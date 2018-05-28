import { MAP_FETCH } from './mapActions'

const mapReducer = (state = {info: {data: {data: null } } }, action) => {
  switch (action.type) {
    case 'SEARCH_FETCH':
      console.log('sddddddddddddddddddddddddddddddddddddddddddddddddd')
      return {
            ...state,
           info: action
         }
    case MAP_FETCH + '_SUCCESS':
      return {
        ...state,
        points: action.response
      }
    case MAP_FETCH + '_FAILURE':
      return {
        ...state,
        points: []
      }
    default:
      return state
  }
}

export default mapReducer
