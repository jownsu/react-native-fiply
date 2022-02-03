import React, { useState } from "react";
import api from '../api/api'
import * as SecureStore from 'expo-secure-store'

const AuthContext = React.createContext();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const login = async (email, password) => {
        setLoading(true)

        await api().post('/token/login', { email, password })
                    .then(response => {
                        const userData = response.data.data
                        setUser(userData)
                        setError(null)
                        SecureStore.setItemAsync('user', JSON.stringify(userData))
                        setLoading(false)
                    })
                    .catch(error => {
                        if(error.message === 'Network Error'){
                            alert('No Internet Access')
                        }else{
                            console.log(error);
                            const errData = error.message
                            //setError(errData)
                            alert(errData)
                        }
                        setLoading(false)
                    })
    }

    const logout = async () => {
        await api({token: user.token}).post('/token/logout', {})
        .then(response => {
            SecureStore.deleteItemAsync('user')
            setUser(null)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const signup = async (signUpInfo) => {
        setLoading(true)
        await api().post('/token/register', signUpInfo)
            .then( response => {
                const userData = response.data.data
                setUser(userData)
                setError(null)
                SecureStore.setItemAsync('user', JSON.stringify(userData))
                setLoading(false)
            })
            .catch( error => {
                const errorList = []
                let errors = error.errors
                for (const key in errors) {
                    errorList.push('\u25CF' + errors[key][0])                           
                }
                //const errData = error
                //setError(errData)
                alert(errorList.join('\n'))
                console.log(error);
                setLoading(false)
            })
    }

    return(
        <AuthContext.Provider 
            value={{
                user,
                setUser,
                error,
                loading,
                setLoading,
                login,
                logout,
                signup
            }}>
            {children}
        </AuthContext.Provider>
    )

}

export { AuthContext, AuthProvider }