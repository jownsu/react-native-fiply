import React from 'react'
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'

export const Container2 = ({ children, style, center, onPress }) => {
    const centerStyle = center ? { justifyContent: 'center' } : {}

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                onPress ? onPress() : null
                Keyboard.dismiss()
            }}
        >
            <View style={{ ...styles.container, ...centerStyle, ...style }}>
                {children}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
    },
})
