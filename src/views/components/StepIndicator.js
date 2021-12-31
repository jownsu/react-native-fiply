import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Colors from '../../utils/Colors'

const StepIndicator = ({active}) => {

    return (
            <View style={{ ...styles.bar, backgroundColor: active ? Colors.primary : Colors.black}}></View>
    )
}

export default StepIndicator

const styles = StyleSheet.create({
    bar:{
        width: 60,
        height: 5,
        borderRadius: 15,
        marginHorizontal: 2
    }
})
