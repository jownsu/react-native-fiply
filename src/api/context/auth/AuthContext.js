import React, { useState, createContext } from 'react'
import api from '../../api'
import * as SecureStore from 'expo-secure-store'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [logged_in, setLogged_in] = useState('false')
    const [company, setCompany] = useState('false')
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
                setCompany(userData.company ? userData.company.toString() : 'false')
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

    const logout = async () => {
        await api({ token: user.token })
            .post('/token/logout', {})
            .then((response) => {
                SecureStore.deleteItemAsync('user')
                SecureStore.deleteItemAsync('logged_in')
                SecureStore.deleteItemAsync('company')
                setUser({})
                setLogged_in('false')
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
                setCompany(userData.company ? userData.company.toString() : 'false')
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
                setCompany,
                setUser,
                setLogged_in,
                setLoading,
                login,
                logout,
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
