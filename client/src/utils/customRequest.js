import axios from 'axios'

export async function get(url, currentUser){
    const result = await axios.get(url, {
        headers: {
            'ngrok-skip-browser-warning': 69420,
            'x-key': currentUser.email,
            'x-access-token': currentUser.token,
        }
    })
    return result
}

export async function post(url, data, currentUser){
    const result = await axios.post(url, data, {
        headers: {
            'ngrok-skip-browser-warning': 69420,
            'x-key': currentUser.email,
            'x-access-token': currentUser.token,
        }
    })
    return result
}
