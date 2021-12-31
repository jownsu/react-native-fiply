import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, SafeAreaView, FiplyLogo, Text, Button, SecondaryButton} from '../../../components/FiplyComponents'
import Colors from '../../../../utils/Colors'

const SemiVerified = ({navigation}) => {
    return (
        <SafeAreaView>
            <Container center>
                <FiplyLogo />
                <View style={{ marginVertical: 25 }}>
                    <Text weight='medium' size={18} center>Congratulations!</Text>
                    <Text center>You have now been semi-verfied</Text>
                </View>

                <Text weight='medium' size={17} color={Colors.secondary} center>Proceed to third step to fully verify</Text>
                <Button 
                    title="Proceed"
                    style={{ marginTop: 30 }}
                    onPress={() => navigation.navigate('StepThree')}
                />
                <SecondaryButton 
                    title="Later"
                    style={{ marginTop: 20 }}
                    onPress={() => alert('pressed')}
                />
            </Container>
        </SafeAreaView>
    )
}

export default SemiVerified

const styles = StyleSheet.create({})
