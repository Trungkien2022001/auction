import axios from 'axios'
import config from '../config'
import { popupError } from './common'

export async function get(url, currentUser, timeout) {
    const service_url = buildUrl(url, config.service)
    try {
        const result = await axios.get(service_url, {
            headers: {
                'ngrok-skip-browser-warning': 69420,
                'x-key': currentUser.email,
                'x-access-token': currentUser.token,
                'Access-Control-Allow-Origin': '*'
            },
            timeout: timeout || config.timeout
        })
        return result
    } catch (error) {
        popupError(error)
    }
}

export async function post(url, data, currentUser, timeout) {
    const service_url = buildUrl(url, config.service)
    try {     
        const result = await axios.post(service_url, data, {
            headers: {
                'ngrok-skip-browser-warning': 69420,
                'x-key': currentUser.email,
                'x-access-token': currentUser.token,
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            timeout: timeout || config.timeout
        })
        return result
    } catch (error) {
        popupError(error)
    }
}
export async function put(url, data, currentUser, timeout) {
    const service_url = buildUrl(url, config.service)
    try {     
        const result = await axios.put(service_url, data, {
            headers: {
                'ngrok-skip-browser-warning': 69420,
                'x-key': currentUser.email,
                'x-access-token': currentUser.token,
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
            timeout: timeout || config.timeout
        })
        return result
    } catch (error) {
        popupError(error)
    }
}

function buildUrl(url, service = "NODE") {
    let host
    switch (service) {
        case 'NODE':
            host = config.apiNodeHost
            break;

        case 'SPRINGBOOT':
            host = config.apiSpringbootHost
            break;

        default:
            host = config.apiNodeHost
            break;
    }

    return host + url
}
