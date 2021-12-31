import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import Colors from '../../../../utils/Colors'
import { FontAwesome5 } from '@expo/vector-icons'

import {Text, FiplyLogo, WaveHeader, Container, Button, SafeAreaView} from '../../../components/FiplyComponents'


const SelectUserTypeScreen = ({navigation}) => {
    const [userType, setUserType] = useState({jobseeker: false, employer: false})
    const [btnDisabled, setBtnDisabled] = useState(true)

    const handleCardPress = (usertype) => {
        setBtnDisabled(false)
        switch (usertype) {
            case 'jobseeker':
                return setUserType({jobseeker: true, employer: false})
            case 'employer':
                return setUserType({jobseeker: false, employer: true})
            default:
                return setUserType({jobseeker: true, employer: false})
        }
    }

    const handleButtonPress = () => {

        switch (true) {
            case userType.jobseeker:
                navigation.navigate('JobSeekerSetupStack')
                break
            case userType.employer:
                navigation.navigate('EmployerStack')
                break
            default:
                navigation.navigate('JobSeekerSetupStack')
        }

    }

    return (
        <SafeAreaView>
            <WaveHeader waveimg={require('../../../../assets/img/waves/4.png')} />
            <Container center>
                <FiplyLogo />
                <Text style={{ marginVertical: 35 }} size={18} center>Select user type</Text>
                <View style={styles.userContainer}>
                    <TouchableOpacity style={styles.userCard} activeOpacity={.7} onPress={() => handleCardPress('jobseeker')}>
                        <FontAwesome5 name="user-alt" size={35} color={(userType.jobseeker == true) ? Colors.primary : Colors.black} style={{ marginBottom: 10 }}/>
                        <Text  color={(userType.jobseeker == true) ? Colors.primary : Colors.black}>Job Seeker</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.userCard} activeOpacity={.7} onPress={() => handleCardPress('employer')}>
                        <FontAwesome5 name="user-tie" size={35} color={(userType.employer == true) ? Colors.primary : Colors.black} style={{ marginBottom: 10 }}/>
                        <Text color={(userType.employer == true) ? Colors.primary : Colors.black}>Employer</Text>
                    </TouchableOpacity>
                </View>

                <Button title='Continue' style={{ marginTop: 100 }} disabled={btnDisabled} onPress={() => handleButtonPress()} />
            </Container>
        </SafeAreaView>
    )
}

export default SelectUserTypeScreen

const styles = StyleSheet.create({
    userContainer:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    userCard:{
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: Colors.primary,
        paddingHorizontal: 25,
        paddingVertical: 20,
        marginHorizontal: 15,
    },

})
