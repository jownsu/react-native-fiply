import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, BackHandler } from 'react-native'
import {
    Container,
    SafeAreaView,
    FiplyLogo,
    Text,
    Button,
    SecondaryButton,
} from '../../components/FiplyComponents'
import AuthContext from '../../../api/context/auth/AuthContext'
import SignUpContext from '../../../api/context/auth/SignUpContext'
import Colors from '../../../utils/Colors'
import Skip from '../../components/Skip'

const SemiVerified = ({ navigation, route }) => {
    const { setLogged_in } = useContext(AuthContext)
    const { profile } = useContext(SignUpContext)
    const { usertype } = route.params

    function handleBackButtonClick() {
        setLogged_in('true')
        return true
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick)
        }
    }, [])

    return (
        <SafeAreaView flex>
            <Container center padding={20}>
                <FiplyLogo />
                <View style={{ marginVertical: 25 }}>
                    <Text weight="bold" size={21}>
                        Congratulations {profile.firstname ? profile.firstname : 'User'},
                    </Text>
                    <Text weight="bold" size={21} style={{ marginVertical: 5 }}>
                        your account has been
                    </Text>
                    <Text weight="bold" color={Colors.secondary} size={21}>
                        Semi-verified.
                    </Text>
                </View>
                <Text size={16}>Continue to Step 3 until Step 4 to fully verify your account</Text>

                <Button
                    title="Let's go!"
                    style={{ marginTop: 30, marginHorizontal: '5%' }}
                    onPress={() => {
                        if (usertype == 'jobseeker') {
                            navigation.navigate('StepThree')
                        } else {
                            navigation.navigate('StepTwo')
                        }
                    }}
                />
                <Skip onPress={handleBackButtonClick} />
            </Container>
        </SafeAreaView>
    )
}

export default SemiVerified

const styles = StyleSheet.create({})
