import React from 'react'
import { SafeAreaView as SAView } from 'react-native-safe-area-context'
import { Dimensions, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Colors from '../../../utils/Colors'

const height = Dimensions.get("window").height;

export const SafeAreaView = ({children, flex, statusBarColor = 'rgba(0, 0, 0, 0)'}) => {
    const flexStyle = flex ? {flex: 1} : {}

    return (
        <SAView style={{ height: height, ...flexStyle }}>
                <StatusBar backgroundColor={statusBarColor} />

                {children}
        </SAView>
    )
}