import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {Text, Container2, WaveHeader, InputDropdown, SafeAreaView, TextInput} from '../../components/FiplyComponents'

import Colors from '../../../utils/Colors'

import waveImg from '../../../assets/img/waves/2.png'



const TestScreen = () => {

    const [showDropdown, setShowDropdown] = useState({one: false, two: false})

    const jobTitleList = [
        {
          id: "1",
          name: "Fullstack Developer",
        },
        {
          id: "2",
          name: "Backend Developer",
        },
        {
          id: "3",
          name: "Frontend Developer",
        },
        {
          id: "4",
          name: "Mobile Developer",
        },
        {
          id: "5",
          name: "Axie Scholar",
        },

      ];

    const [textOne, setTextOne] = useState('')
    const [textTwo, setTextTwo] = useState('')

    return (
        <SafeAreaView>
            <WaveHeader waveimg={waveImg}/>
            <Container2 center onPress={() => setShowDropdown({one: false, two: false}) }>
            <InputDropdown
                label={'Dropdown one'}
                value={textOne}
                onChangeText={setTextOne}
                data={jobTitleList}
                visibleDropdown={showDropdown.one}
                onFocus={() => setShowDropdown({...showDropdown, one: true})}
                onListPress={(name) => {
                    setTextOne(name)
                    setShowDropdown({...showDropdown, one: false})

                }}
                // onBlur={() => setShowDropdown(false)}
            />
            <InputDropdown
                label={'Dropdown two'}
                value={textTwo}
                onChangeText={setTextTwo}
                data={jobTitleList}
                visibleDropdown={showDropdown.two}
                onFocus={() => setShowDropdown({...showDropdown, two: true})}
                onListPress={(name) => {
                    setTextTwo(name)
                    setShowDropdown({...showDropdown, two: false})
                }}
            />
            </Container2>

        </SafeAreaView>
    )
}

export default TestScreen

const styles = StyleSheet.create({})
