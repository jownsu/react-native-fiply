import React from 'react'
import { SafeAreaView as SAView } from 'react-native-safe-area-context'
import { Dimensions } from 'react-native';

const height = Dimensions.get("window").height;

export const SafeAreaView = ({children, flex}) => {
    const flexStyle = flex ? {flex: 1} : {}

    return (
        <SAView style={{ height: height, ...flexStyle }}>
            {children}
        </SAView>
    )
}