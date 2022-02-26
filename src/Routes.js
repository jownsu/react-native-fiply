import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppStack from './views/stacks/AppStack'
import AuthStack from './views/stacks/AuthStack'
import * as SecureStore from 'expo-secure-store'
import AuthContext from './api/context/auth/AuthContext'

const Routes = () => {
    const { user, setUser, logged_in, setLogged_in } = useContext(AuthContext)

    useEffect(() => {
        SecureStore.getItemAsync('user')
            .then((response) => {
                let user = JSON.parse(response)
                if (user) {
                    setUser(user)
                    setLogged_in('true')
                }
            })
            .catch((error) => console.log(error))
        // SecureStore.getItemAsync('logged_in')
        //     .then(response => {
        //         let logged = JSON.parse(response)
        //         if(logged) setLogged_in(logged_in)
        //     })
        //     .catch(error => console.log(error))
        //  SecureStore.deleteItemAsync('user')
    }, [])

    return (
        <NavigationContainer>
            {user && logged_in == 'true' ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Routes
