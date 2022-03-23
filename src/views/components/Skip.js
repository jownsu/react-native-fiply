import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from './FiplyComponents'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '../../utils/Colors'

const Skip = ({ onPress = () => {}, style = {} }) => {
    return (
        <TouchableOpacity style={[styles.btnContainer, style]} onPress={onPress}>
            <Text weight="semi-bold" style={{ paddingHorizontal: 10 }}>
                Skip
            </Text>
            <FontAwesome name="long-arrow-right" size={21} color={Colors.black} />
        </TouchableOpacity>
    )
}

export default Skip

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
