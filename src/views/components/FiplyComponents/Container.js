import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native'

export const Container = ({ children, style, center, padding = 0 }) => {
    const centerStyle = center ? { justifyContent: 'center' } : {}

    return (
        <View
            style={{
                ...styles.container,
                ...centerStyle,
                ...style,
                paddingHorizontal: padding,
            }}
        >
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
