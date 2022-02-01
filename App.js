import React from "react"
import Routes from "./src/Routes"
import AppLoading from "expo-app-loading"
import { useFonts } from "expo-font"
import { Provider as PaperProvider } from "react-native-paper"
import { AuthProvider } from "./src/providers/AuthProvider"

const App = () => {

  let [ fontsLoaded ] = useFonts({
    'EncodeSansExpaded-Medium': require('./assets/fonts/EncodeSansExpanded-Medium.ttf'),
    'EncodeSansExpaded-Light': require('./assets/fonts/EncodeSansExpanded-Light.ttf'),
    'EncodeSansExpaded-SemiBold': require('./assets/fonts/EncodeSansExpanded-SemiBold.ttf'),
    'EncodeSansExpaded-Bold': require('./assets/fonts/EncodeSansExpanded-Bold.ttf')
  })

  return (!fontsLoaded) 
    ? <AppLoading/> 
    : 
      <PaperProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </PaperProvider>

}

export default App