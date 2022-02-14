import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Container, SafeAreaView, FiplyLogo, Text, Button, SecondaryButton} from '../../../components/FiplyComponents'
import Colors from '../../../../utils/Colors'

const BasicUser = ({navigation}) => {
    return (
        <SafeAreaView>
            <Container center padding={20}>
                <FiplyLogo />
                <View style={{ marginVertical: 25 }}>
                    <Text weight='medium' size={18} center>Greetings</Text>
                    <Text center>You have now reached the level of a basic user</Text>
                </View>

                <Text weight='medium' size={17} color={Colors.secondary} center>Proceed to First Step to Semi-Verify</Text>
                <Button 
                    title="Proceed"
                    style={{ marginTop: 30 }}
                    onPress={() => navigation.navigate('StepOne')}
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

export default BasicUser

const styles = StyleSheet.create({})
