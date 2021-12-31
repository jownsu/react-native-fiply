import React from 'react'
import { SafeAreaView as SAView } from 'react-native-safe-area-context'

export const SafeAreaView = ({children}) => {
    return (
        <SAView style={{ flex: 1 }}>
            {children}
        </SAView>
    )
}