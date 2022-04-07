import React from 'react'
import Routes from './src/Routes'
import AppLoading from 'expo-app-loading'
import { useFonts } from 'expo-font'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { AuthProvider } from './src/api/context/auth/AuthContext'
import Colors from './src/utils/Colors'

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.primary,
        accent: Colors.secondary,
    },
    fonts: {
        ...DefaultTheme.fonts,
        regular: { fontFamily: 'EncodeSansExpaded-Light' },
        medium: { fontFamily: 'EncodeSansExpaded-Medium' },
        light: { fontFamily: 'EncodeSansExpaded-Light' },
        thin: { fontFamily: 'EncodeSansExpaded-Light' },
    },
}

const App = () => {
    let [fontsLoaded] = useFonts({
        'EncodeSansExpaded-Medium': require('./assets/fonts/EncodeSansExpanded-Medium.ttf'),
        'EncodeSansExpaded-Light': require('./assets/fonts/EncodeSansExpanded-Light.ttf'),
        'EncodeSansExpaded-SemiBold': require('./assets/fonts/EncodeSansExpanded-SemiBold.ttf'),
        'EncodeSansExpaded-Bold': require('./assets/fonts/EncodeSansExpanded-Bold.ttf'),
    })

    return !fontsLoaded ? (
        <AppLoading />
    ) : (
        <PaperProvider theme={theme}>
            <AuthProvider>
                <Routes />
            </AuthProvider>
        </PaperProvider>
    )
}

export default App
