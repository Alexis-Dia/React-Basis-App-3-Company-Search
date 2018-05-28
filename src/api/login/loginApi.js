import { apiCall } from '../../services/api'

export function fetchAuth (ob) {
    return apiCall(`http://nginxmicroservice.ml/auth`, 'POST', ob)
}
