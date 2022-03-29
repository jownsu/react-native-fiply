import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import Colors from '../../../utils/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import {
    Text,
    FiplyLogo,
    WaveHeader,
    Container,
    Button,
    SafeAreaView,
} from '../../components/FiplyComponents'

import Back from '../../components/Back'

const SelectUserTypeScreen = ({ navigation }) => {
    const [userType, setUserType] = useState({
        jobseeker: false,
        employer: false,
    })
    const [btnDisabled, setBtnDisabled] = useState(true)

    const handleCardPress = (usertype) => {
        switch (usertype) {
            case 'jobseeker':
                setBtnDisabled(false)
                return setUserType({ jobseeker: true, employer: false })
            case 'employer':
                return
            // setBtnDisabled(false)
            // return setUserType({ jobseeker: false, employer: true })
            default:
                setBtnDisabled(false)

                return setUserType({ jobseeker: true, employer: false })
        }
    }

    const handleButtonPress = () => {
        switch (true) {
            case userType.jobseeker:
                navigation.navigate('JobSeekerSetupStack')
                break
            case userType.employer:
                navigation.navigate('EmployerSetupStack')
                break
            default:
                navigation.navigate('JobSeekerSetupStack')
        }
    }

    return (
        <SafeAreaView flex>
            <WaveHeader waveimg={require('../../../assets/img/waves/4.png')} />
            <Container center padding={20}>
                <FiplyLogo />
                <Text size={22} style={styles.title} weight="bold">
                    Select user type
                </Text>
                <View style={styles.userContainer}>
                    <TouchableOpacity
                        style={[
                            styles.userCard,
                            {
                                backgroundColor: userType.jobseeker
                                    ? Colors.primaryLight
                                    : Colors.secondaryLight,

                                borderWidth: userType.jobseeker ? 3 : 0,
                            },
                        ]}
                        activeOpacity={0.7}
                        onPress={() => handleCardPress('jobseeker')}
                    >
                        <View style={styles.imgContainer}>
                            <Image
                                source={require('../../../assets/img/jobseeker.png')}
                                resizeMode={'cover'}
                                style={styles.img}
                            />
                        </View>
                        <View style={styles.txtContainer}>
                            <Text weight="bold" size={21} color={Colors.black}>
                                Job Seeker
                            </Text>
                            <Text size={16}>Find a job that is right for you</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.userCard,
                            {
                                backgroundColor: userType.employer
                                    ? Colors.primaryLight
                                    : Colors.secondaryLight,

                                borderWidth: userType.employer ? 3 : 0,
                            },
                        ]}
                        activeOpacity={0.7}
                        onPress={() => handleCardPress('employer')}
                    >
                        <View style={styles.imgContainer}>
                            <Image
                                source={require('../../../assets/img/employer.png')}
                                style={styles.img}
                            />
                        </View>

                        <View style={styles.txtContainer}>
                            <Text weight="bold" size={21} color={Colors.black}>
                                Employer
                            </Text>
                            <Text size={16}>Finding best candidates will be easy</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Button
                    title="Continue"
                    style={{ marginVertical: 20 }}
                    disabled={btnDisabled}
                    onPress={() => handleButtonPress()}
                />

                <Back onPress={() => navigation.pop()} />
            </Container>
        </SafeAreaView>
    )
}

export default SelectUserTypeScreen

const styles = StyleSheet.create({
    userContainer: {},
    img: {
        width: 110,
        height: 110,
    },
    title: {
        marginVertical: 15,
    },
    imgContainer: {
        flex: 1,
        alignItems: 'center',
    },
    txtContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    userCard: {
        flexDirection: 'row',
        borderRadius: 25,
        borderColor: Colors.primary,
        backgroundColor: Colors.primaryLight,
        padding: 20,
        marginBottom: 20,
    },
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
