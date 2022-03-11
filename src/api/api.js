import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import config from './config'
import { NativeModules } from 'react-native'

const api = ({ token = null } = {}) => {
    const api = axios.create({
        baseURL: config.api,
    })

    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status == 401) {
                SecureStore.deleteItemAsync('user')
                NativeModules.DevSettings.reload()
                return Promise.reject({ status: 401, errors: ['Unauthorized'] })
            }

            // if(error.response?.status == 422){
            //     let errors = Object.values(error?.response?.data?.errors || {})
            //     return Promise.reject({status:422, errorsRaw: errors, errors:errors.reduce(error => error)})
            // }

            // console.log(error)

            //return Promise.reject({status: error.response?.status, errors: ['Server Error xD!']});
            console.log(error)
            return Promise.reject(error.response.data)
        }
    )

    return api
}

// axios.defaults.baseURL = config.api

export default api
