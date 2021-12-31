import React from 'react'
import { StyleSheet, View } from 'react-native'

export const Container = ({ children, style, center }) => {

    const centerStyle =  center ? {justifyContent: 'center'} : {}

    return (
        <View style={{ ...styles.container, ...centerStyle ,...style }}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20,
        flex: 1,
    }
})
