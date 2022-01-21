import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import Text from './Text'
import logo from '../../../assets/img/logo.png'
import Colors from '../../../utils/Colors'

export const FiplyLogo = ({style, textColor = Colors.black}) => {
    return (
        <View style={{ ...styles.container, ...style }}>
            <Image source={logo} style={styles.logo}/>
            <Text color={textColor} weight='bold' style={styles.textLogo}>fiply</Text>
        </View>
    ) 
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo:{
        height: 75,
        width: 75
    },
    textLogo:{
        color: Colors.secondary,
        fontSize: 28,
        marginLeft: 7
    }
})
