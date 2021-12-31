import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

export const WaveHeader = ({waveimg, height}) => {

    let heightStyle = height ? {height: height} : {};

    return (
        <View style={styles.container}>
            <Image source={waveimg} style={{ ...styles.waveimg , ...heightStyle}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        top: 0,
        width: '100%',
    },
    waveimg:{
        width: '100%',
    }
})
