import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ActivityIndicator as AI } from 'react-native-paper'
import Colors from '../../../utils/Colors'

export const ActivityIndicator = ({ visible = false, center = false }) => {
    let centerStyle = center
        ? {
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
          }
        : {}

    return (
        <AI
            animating={visible}
            size={32}
            color={Colors.secondary}
            style={{ ...styles.loadingStyle, ...centerStyle }}
        />
    )
}

const styles = StyleSheet.create({
    loadingStyle: {
        marginVertical: 20,
    },
})
