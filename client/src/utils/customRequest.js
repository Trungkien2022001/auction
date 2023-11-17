import axios from 'axios'

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
            host=process.env.REACT_APP_API_NODE_ENDPOINT
            break;

        case 'SPRINGBOOT':
            host=process.env.REACT_APP_API_SPRINGBOOT_ENDPOINT
            break;
    
        default:
            host=process.env.REACT_APP_API_NODE_ENDPOINT
            break;
    }

    return host+url
}
