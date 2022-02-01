import React, { useContext, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import AppStack from "./stacks/AppStack"
import AuthStack from "./stacks/Auth/AuthStack"
import * as SecureStore from 'expo-secure-store'
import { AuthContext } from "./providers/AuthProvider"



const Routes = () => {

    const { user, setUser } = useContext(AuthContext);

    useEffect(() => {
        SecureStore.getItemAsync('user')
        .then(response => {
            let user = JSON.parse(response)
            setUser(user)
        })
        .catch(error => {
            console.log(error)
        })
    //  SecureStore.deleteItemAsync('user')
    }, [])

    return (
        <NavigationContainer>
            { user ? <AppStack /> : <AuthStack /> }
        </NavigationContainer>
    )
}

export default Routes