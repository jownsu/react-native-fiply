import React from "react"
import Routes from "./src/Routes"
import AppLoading from "expo-app-loading"
import { useFonts } from "expo-font"
import { Provider as PaperProvider } from "react-native-paper"

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
        <Routes />
      </PaperProvider>

}

export default App