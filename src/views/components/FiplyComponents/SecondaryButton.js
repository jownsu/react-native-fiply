import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button as XButton } from 'react-native-paper'
import Colors from '../../../utils/Colors'

export const SecondaryButton = ({onPress, title, disabled = false, loading = false, style, labelStyle }) => {

    let btnStyle = disabled ? { borderColor: Colors.light } : { borderColor: Colors.primary }
    let lblStyle = disabled ? { color: Colors.light } : { color: Colors.primary }
    return (
        <View>
            <XButton
                mode='outlined'
                onPress={() => onPress()}
                style={{ ...btnStyle, marginHorizontal: '20%', ...styles.btn, ...style }}
                labelStyle={{ fontFamily: 'EncodeSansExpaded-Medium', ...lblStyle, ...labelStyle }}
                uppercase={false}
                disabled={disabled}
                loading={loading}
                theme={{ colors: {primary: Colors.primary} }}
            >
                {title}
            </XButton>
        </View>
    )
}

const styles = StyleSheet.create({
    btn:{
        borderWidth: 2,
    }
})
