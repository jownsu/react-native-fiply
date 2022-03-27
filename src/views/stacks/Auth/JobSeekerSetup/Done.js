import React, { useContext, useEffect } from 'react'
import { StyleSheet, View, BackHandler } from 'react-native'
import Colors from '../../../../utils/Colors'
import AuthContext from '../../../../api/context/auth/AuthContext'
import {
    SafeAreaView,
    Container,
    FiplyLogo,
    Text,
    Button,
} from '../../../components/FiplyComponents'

const Done = ({ navigation }) => {
    const { setLogged_in } = useContext(AuthContext)

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
        <SafeAreaView>
            <Container center padding={20}>
                <FiplyLogo style={{ marginVertical: 50 }} />
                <Text weight="bold" size={23}>
                    Great! Request for
                </Text>
                <Text color={Colors.secondary} weight="bold" size={23}>
                    fully verification
                </Text>
                <Text weight="bold" size={23}>
                    is now under evaluation.
                </Text>
                <Text size={16}>Thank you for your coperation. Hav an awesome day ahead.</Text>
                {/* <Text center size={18} weight="medium">
                    Great!
                </Text>
                <Text center>
                    Once a Fiply representative has evaluated and validated your application to
                    Fully Verify, Fiply will notify you.
                </Text>
                <Text center style={{ marginVertical: 20 }}>
                    Thank you for taking part in Fiply's security protocol.
                </Text>
                <Text center>Have an awesome day!</Text> */}

                <Button
                    title={'Done'}
                    style={{ marginVertical: 50 }}
                    onPress={handleBackButtonClick}
                />
            </Container>
        </SafeAreaView>
    )
}

export default Done

const styles = StyleSheet.create({})
