import React, { useEffect, useContext } from 'react'
import AuthContext from '../../../../api/context/auth/AuthContext'
import SignUpContext from '../../../../api/context/auth/SignUpContext'
import { StyleSheet, View, BackHandler } from 'react-native'
import {
    Container,
    SafeAreaView,
    FiplyLogo,
    Text,
    Button,
} from '../../../components/FiplyComponents'
import Skip from '../../../components/Skip'

const BasicUser = ({ navigation }) => {
    const { setLogged_in } = useContext(AuthContext)
    const { firstname } = useContext(SignUpContext)
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
                <View style={{ marginVertical: 30 }}>
                    <Text weight="bold" size={21}>
                        Welcome {firstname ? firstname : 'User'},
                    </Text>
                    <Text weight="bold" size={21}>
                        verify your account now!
                    </Text>

                    <Text size={18} style={{ marginTop: 20 }}>
                        To have a better experience with Fiply you have four quick steps to complete
                    </Text>
                </View>
                <Button
                    title="I'm ready !"
                    style={{ marginTop: 30, marginHorizontal: '5%' }}
                    onPress={() => navigation.navigate('StepOne')}
                />
                <Skip onPress={handleBackButtonClick} />
            </Container>
        </SafeAreaView>
    )
}

export default BasicUser

const styles = StyleSheet.create({})
