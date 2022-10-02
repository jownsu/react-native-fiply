import React, { useContext, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import JobSeekerStack from './views/stacks/JobSeeker/JobSeekerStack'
import EmployerStack from './views/stacks/Employer/EmployerStack'
import AuthStack from './views/stacks/Auth/AuthStack'
import * as SecureStore from 'expo-secure-store'
import AuthContext from './api/context/auth/AuthContext'
import SelectUserStack from './views/stacks/Employer/SelectUserStack'
import DocumentScanner from './views/screens/DocumentScanner'

const Routes = () => {
    const {
        user,
        setUser,
        company,
        setCompany,
        logged_in,
        setLogged_in,
        hiringManager,
        setHiringManager,
        setIsFirstLaunched,
    } = useContext(AuthContext)

    useEffect(() => {
        SecureStore.getItemAsync('hiring_manager')
            .then((response) => {
                let res = JSON.parse(response)
                if (res) {
                    setHiringManager(res)
                }
            })
            .catch((error) => console.log(error))

        SecureStore.getItemAsync('user')
            .then((response) => {
                let user = JSON.parse(response)
                if (user) {
                    setUser(user)
                    setCompany(user.company ? 'true' : 'false')
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

    // const checkUser = () => {
    //     if(user && logged_in === 'true'){
    //         if(company === 'true'){
    //             if(user.companyToken || hiringManager.token){
    //                 return <EmployerStack />
    //             }
    //             return <SelectUserStack />
    //         }
    //         return <JobSeekerStack />
    //     }
    //     return <AuthStack />
    // }

    return (
        // <TestScreen1 />

        <NavigationContainer>
            {user && logged_in == 'true' ? (
                company == 'true' ? (
                    user.companyToken || hiringManager.token ? (
                        <EmployerStack />
                    ) : (
                        <SelectUserStack />
                    )
                ) : (
                    <JobSeekerStack />
                )
            ) : (
                <AuthStack />
            )}
        </NavigationContainer>
    )
}

export default Routes
