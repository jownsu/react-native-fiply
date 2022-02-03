import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import SignupScreen from "../../views/screens/AuthScreens/SignUp/SignupScreen"
import ConfirmEmailScreen from "../../views/screens/AuthScreens/ConfirmEmailScreen"
import SelectUserTypeStack from "./SelectUserTypeStack"

const Stack = createStackNavigator()

const SignupStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name={"SignupScreen"} component={SignupScreen}></Stack.Screen>
            {/* <Stack.Screen options={{ headerShown: false }} name={"ConfirmEmailScreen"} component={ConfirmEmailScreen}></Stack.Screen> */}
            <Stack.Screen options={{ headerShown: false }} name={"SelectUserTypeStack"} component={SelectUserTypeStack}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default SignupStack