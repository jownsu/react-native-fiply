import React from 'react'
import { StyleSheet, View } from 'react-native'
import {Text, FiplyLogo, WaveHeader, SafeAreaView} from '../../components/FiplyComponents'


import Colors from '../../../utils/Colors'

import waveImg from '../../../assets/img/waves/2.png'

const TestScreen = () => {
    return (
        <SafeAreaView>
            <WaveHeader waveimg={waveImg}/>
        </SafeAreaView>
    )
}

export default TestScreen

const styles = StyleSheet.create({})
