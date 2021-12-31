import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import AppStack from "./stacks/AppStack"
import AuthStack from "./stacks/Auth/AuthStack";
const Routes = () => {

    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    )
}

export default Routes