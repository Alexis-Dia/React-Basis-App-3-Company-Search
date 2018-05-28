import { apiCall } from '../../services/api'

export function fetch (data) {
    // ~~~ lat is lng ~~~
    var arr = apiCall(`https://endpoints.azurewebsites.net/api/points?minLng=${data.minLng}&maxLng=${data.maxLng}&` +
        `minLat=${data.minLat}&maxLat=${data.maxLat}`, 'GET')
    return arr
}

export function seed (data) {
    return apiCall(`/api/points`, 'POST', data)
}

export function del (id) {
    return apiCall(`/api/points/${id}`, 'DELETE')
}

export function fetchMainGrid (data) {
    return apiCall(`http://nginxmicroservice.ml/testJWTtoken`, 'GET')
}
