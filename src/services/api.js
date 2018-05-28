import axios from 'axios'

export function apiCall (url, method, body, callback) {
    const options = {
        method: method,
        url: url,
        headers: {
            'Content-Type': 'application/json',
        },
        responseType: 'json'
    }
    if (body) {
        options.data = JSON.stringify(body)
    }
    return axios(options)
        .then(response => {
            return response.data
        })
        .catch(error => {
            throw error
        })
}
