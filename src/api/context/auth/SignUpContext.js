import React, { useState, createContext } from 'react'
import api from '../../api'
import * as SecureStore from 'expo-secure-store'

const SignUpContext = createContext()

export const SignUpProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [logged_in, setLogged_in] = useState('false')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const signup = async (signUpInfo, onSignedUp = () => {}) => {
        setLoading(true)
        await api()
            .post('/token/register', signUpInfo)
            .then((response) => {
                const userData = response.data.data
                setUser(userData)
                setError(null)
                SecureStore.setItemAsync('user', JSON.stringify(userData))
                setLoading(false)
                onSignedUp()
            })
            .catch((error) => {
                const errorList = []
                let errors = error.data.errors
                for (const key in errors) {
                    errorList.push('\u25CF' + errors[key][0])
                }
                alert(errorList.join('\n'))
                console.log(error)
                setLoading(false)
            })
    }

    return (
        <SignUpContext.Provider
            value={{
                user,
                setUser,
                logged_in,
                setLogged_in,
                error,
                loading,
                setLoading,
                login,
                logout,
                signup,
            }}
        >
            {children}
        </SignUpContext.Provider>
    )
}

export default AuthContext
