import jwt_decode from "jwt-decode";
import dayjs from "dayjs";


let baseUrl = "https://church-database-backend.onrender.com/"  


let originalRequest = async (url, config) => {
    url =  `${baseUrl}${url}`
    try {
        let response = await fetch(url, config)
        let data = await response.json()
        return {response, data}
    }
    catch (error) {
    }
}


let refreshTokenFunc = async (refreshToken) => {
    try {
        let response = await fetch(`${baseUrl}/admin/refresh`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${refreshToken}`
            }
        })
        let data = await response.json()
        localStorage.setItem("church-access-token", data.access_token)
        return(data.access_token)
    }
    catch(error) {
    }
}


let customFetcher = async (url, config={}) => {
    let accessToken = localStorage.getItem('church-access-token') ? localStorage.getItem('church-access-token') : null

    const user = jwt_decode(accessToken)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1

    if (isExpired) {
        try {
            accessToken = await refreshTokenFunc(localStorage.getItem('church-refresh-token'))
        }
        catch(error) {

        }
    }

    config["headers"] = {
        Authorization: `Bearer ${localStorage.getItem('church-access-token')}`,
        'Content-Type': 'application/json'
    }
    try {
        let {response, data} = await originalRequest(url, config)
        return { response, data }
    }
    catch (error) {
    }
}

export default customFetcher