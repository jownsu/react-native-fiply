import React from 'react'
import { StyleSheet, View } from 'react-native'

import {
    Text,
    FiplyLogo,
    WaveHeader,
    Container,
    Button,
    SafeAreaView,
} from '../../components/FiplyComponents'

const ConfirmEmailScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WaveHeader waveimg={require('../../../assets/img/waves/3.png')} />
            <Container center padding={20}>
                <FiplyLogo />
                <View style={styles.confirmContainer}>
                    <Text center size={18}>
                        Confirm your email
                    </Text>
                    <Button
                        title={'Confirm'}
                        style={{ marginVertical: 20 }}
                        onPress={() =>
                            navigation.navigate('SelectUserTypeStack')
                        }
                    />
                </View>
            </Container>
        </SafeAreaView>
    )
}

export default ConfirmEmailScreen

const styles = StyleSheet.create({
    confirmContainer: {
        marginVertical: 150,
    },
})
