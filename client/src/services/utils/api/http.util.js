export const httpRequest = async (url, method = 'GET', body = null, headers = {}) => {
    try {
        if (body) {
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
        }
        const response = await fetch(url, {method, body, headers})
        if (response.status === 204) {
            return {status: response.status}
        }
        const data = await response.json()
        return {data: data, status: response.status}
    } catch (e) {
        console.log(e.message)
        throw e
    }
}


