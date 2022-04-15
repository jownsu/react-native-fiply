import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppStack from './views/stacks/AppStack'
import AuthStack from './views/stacks/Auth/AuthStack'
import * as SecureStore from 'expo-secure-store'
import AuthContext from './api/context/auth/AuthContext'
import TestScreen from './TestScreen'
import TestScreen1 from './TestScreen1'

const Routes = () => {
    const { user, setUser, logged_in, setLogged_in, isFirstLaunched, setIsFirstLaunched } =
        useContext(AuthContext)

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

        SecureStore.getItemAsync('isFirstLaunch')
            .then((res) => {
                if (res == null) {
                    setIsFirstLaunched(true)
                    SecureStore.setItemAsync('isFirstLaunch', 'true')
                } else {
                    setIsFirstLaunched(false)
                }

                //SecureStore.deleteItemAsync('isFirstLaunch')
            })
            .catch((err) => console.log(err))
        // SecureStore.getItemAsync('logged_in')
        //     .then(response => {
        //         let logged = JSON.parse(response)
        //         if(logged) setLogged_in(logged_in)
        //     })
        //     .catch(error => console.log(error))
        //  SecureStore.deleteItemAsync('user')
    }, [])

    return (
        // <TestScreen1 />
        // <TestScreen />
        <NavigationContainer>
            {user && logged_in == 'true' ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Routes
