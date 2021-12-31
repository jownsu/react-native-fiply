import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button as XButton } from 'react-native-paper'
import Colors from '../../../utils/Colors'

export const Button = ({onPress, title, disabled = false, loading = false, style, labelStyle }) => {

    let btnStyle = disabled ? { backgroundColor: Colors.black } : { backgroundColor: Colors.primary }

    return (
        <View>
            <XButton
                mode='contained'
                onPress={() => onPress()}
                style={{ ...btnStyle, marginHorizontal: '20%', ...styles.btn, ...style }}
                labelStyle={{ fontFamily: 'EncodeSansExpaded-Medium', color: Colors.white, ...labelStyle }}
                uppercase={false}
                disabled={disabled}
                loading={loading}
            >
                {title}
            </XButton>
        </View>
    )
}

const styles = StyleSheet.create({
    btn:{
        elevation: 7
    }
})
