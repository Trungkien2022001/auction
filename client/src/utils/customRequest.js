import axios from 'axios'
import config from '../config'

export async function get(url, currentUser, service){
    const service_url = buildUrl(url, service)

    const result = await axios.get(service_url  , {
        headers: {
            'ngrok-skip-browser-warning': 69420,
            'x-key': currentUser.email,
            'x-access-token': currentUser.token,
            'Access-Control-Allow-Origin':'*'
        }
    })
    return result
}

export async function post(url, data, currentUser, service){
    const service_url = buildUrl(url, service)
    const result = await axios.post(service_url, data, {
        headers: {
            'ngrok-skip-browser-warning': 69420,
            'x-key': currentUser.email,
            'x-access-token': currentUser.token,
            'Access-Control-Allow-Origin':'http://localhost:3000'
        }
    })
    return result
}

function buildUrl(url, service){
    let host
    switch (service) {
        case 'NODE':
            host=config.apiNodeHost
            break;

        case 'SPRINGBOOT':
            host=config.apiSpringbootHost
            break;
    
        default:
            host=config.apiNodeHost
            break;
    }

    return host+url
}
