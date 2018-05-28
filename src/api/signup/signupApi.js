import { apiCall } from '../../services/api'

export function fetch (ob) {
    return apiCall(`http://127.0.0.1:8080/save`, 'POST', ob.data)
}

export function fetchIfUserExist (ob) {
    return apiCall(`http://127.0.0.1:8080/checkIfUserExist`, 'POST', ob.data)
}