import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'

export const FormContainer = ({ children, style, center, padding = 0 }) => {
    const centerStyle = center ? { justifyContent: 'center' } : {}

    return (
        <ScrollView
            contentContainerStyle={{
                ...styles.container,
                ...centerStyle,
                ...style,
                paddingHorizontal: padding,
            }}
        >
            {children}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})
