import axios from 'axios'

export async function get(url, currentUser){
    const result = await axios.get(url, {
        headers: {
            'x-key': currentUser.email,
            'x-access-token': currentUser.token,
        }
    })
    return result
}

export async function post(url, data, currentUser){
    const result = await axios.post(url, data, {
        headers: {
            'x-key': currentUser.email,
            'x-access-token': currentUser.token,
        }
    })
    return result
}
