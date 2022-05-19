import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'

export const FormContainer = ({ children, style, center, flex = false, padding = 0 }) => {
    const centerStyle = center ? { justifyContent: 'center' } : {}
    const flexStyle = flex ? { flex: 1 } : {}

    return (
        <ScrollView
            contentContainerStyle={{
                ...styles.container,
                ...centerStyle,
                ...flexStyle,
                ...style,
                paddingHorizontal: padding,
            }}
        >
            {children}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {},
})
