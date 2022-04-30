import React, { useState, createContext } from 'react'
import api from '../../api'
import * as SecureStore from 'expo-secure-store'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [logged_in, setLogged_in] = useState('false')
    const [company, setCompany] = useState('false')
    const [hiringManager, setHiringManager] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isFirstLaunched, setIsFirstLaunched] = useState(true)

    const login = async (email, password) => {
        setLoading(true)

        await api()
            .post('/token/login', { email, password })
            .then((response) => {
                const userData = response.data.data
                setUser(userData)
                setCompany(userData.company ? 'true' : 'false')
                setLogged_in('true')
                SecureStore.setItemAsync('user', JSON.stringify(userData))
                SecureStore.setItemAsync('logged_in', logged_in)
                SecureStore.setItemAsync('company', company)
            })
            .catch((error) => {
                if (error.message === 'Network Error') {
                    alert('No Internet Access')
                } else {
                    console.log(error)
                    const errData = error.message
                    //setError(errData)
                    alert(errData)
                }
            })
            .finally(() => setLoading(false))
    }

    const loginAsHiringManager = async (hiring_manager_id, code) => {
        setLoading(true)

        await api({ token: user.token })
            .post('/loginAsHiringManager', { hiring_manager_id, code })
            .then((response) => {
                const hiringManagerData = response.data.data
                setHiringManager(hiringManagerData)
                SecureStore.setItemAsync('hiring_manager', JSON.stringify(hiringManagerData))
            })
            .catch((error) => {
                console.log(error)
                alert(error.message)
            })
            .finally(() => setLoading(false))
    }

    const loginAsEmployerAdmin = async (code) => {
        setLoading(true)

        await api({ token: user.token })
            .post('/loginAsEmployerAdmin', { code })
            .then((response) => {
                const token = response.data.data.token

                SecureStore.getItemAsync('user').then((response) => {
                    let storeUser = JSON.parse(response)
                    storeUser = { ...storeUser, companyToken: token }
                    SecureStore.setItemAsync('user', JSON.stringify(storeUser))
                })
                setUser({ ...user, companyToken: token })
            })
            .catch((error) => {
                console.log(error)
                alert(error.message)
            })
            .finally(() => setLoading(false))
    }

    const logout = async () => {
        await api({ token: user.token })
            .post('/token/logout', {})
            .then((response) => {
                SecureStore.deleteItemAsync('user')
                SecureStore.deleteItemAsync('logged_in')
                SecureStore.deleteItemAsync('company')
                SecureStore.deleteItemAsync('hiring_manager')
                setUser(null)
                setCompany('false')
                setHiringManager(null)
                setLogged_in('false')
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => setLoading(false))
    }

    const logoutAsEmployer = async (type = 'hiring_manager') => {
        await api({
            token: user.token,
            hiring_token: type == 'hiring_manager' ? hiringManager.token : user.companyToken,
            hiring_id: type == 'hiring_manager' ? hiringManager.id : user.company,
        })
            .post('/logoutAsEmployer', { type })
            .then((response) => {
                if (type == 'hiring_manager') {
                    SecureStore.deleteItemAsync('hiring_manager')
                    setHiringManager(null)
                } else {
                    SecureStore.getItemAsync('user').then((response) => {
                        const storeUser = JSON.parse(response)
                        delete storeUser.companyToken
                        SecureStore.setItemAsync('user', JSON.stringify(storeUser))
                    })
                    setUser({ ...user, companyToken: '' })
                }
                SecureStore.deleteItemAsync('hiring_manager')
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => setLoading(false))
    }

    const signup = async (signUpInfo, onSignedUp = () => {}) => {
        setLoading(true)
        await api()
            .post('/token/register', signUpInfo)
            .then((response) => {
                const userData = response.data.data
                setUser(userData)
                setError(null)
                setCompany(userData.company ? 'true' : 'false')
                SecureStore.setItemAsync('user', JSON.stringify(userData))
                SecureStore.setItemAsync('company', company)
                onSignedUp()
            })
            .catch((error) => {
                alert(error.message)
            })
            .finally(() => setLoading(false))
    }

    const verify = async (signUpInfo, onVerifySent = () => {}) => {
        setLoading(true)
        await api()
            .post('/verify', signUpInfo)
            .then(() => onVerifySent())
            .catch((error) => {
                const errorList = []
                let errors = error.errors
                for (const key in errors) {
                    errorList.push('\u25CF' + ' ' + errors[key][0])
                }
                alert(errorList.join('\n'))
                console.log(error)
            })
            .finally(() => setLoading(false))
    }

    const checkEmail = async (email) => {
        setLoading(true)
        return await api()
            .post('/checkEmail', { email })
            .then((res) => {
                return res.data.data
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                error,
                loading,
                logged_in,
                company,
                hiringManager,
                setHiringManager,
                setCompany,
                setUser,
                setLogged_in,
                setLoading,
                login,
                loginAsHiringManager,
                loginAsEmployerAdmin,
                logout,
                logoutAsEmployer,
                signup,
                verify,
                isFirstLaunched,
                setIsFirstLaunched,
                checkEmail,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
