import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from './FiplyComponents'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../../utils/Colors'

const Back = ({ onPress = () => {}, style = {} }) => {
    return (
        <TouchableOpacity style={[styles.btnContainer, style]} onPress={onPress}>
            <MaterialIcons name="keyboard-backspace" size={21} color={Colors.black} />
            <Text weight="semi-bold" style={{ paddingHorizontal: 10 }}>
                Back
            </Text>
        </TouchableOpacity>
    )
}

export default Back

const styles = StyleSheet.create({
    btnContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
