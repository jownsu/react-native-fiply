import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView, Container, FiplyLogo, Text, Button } from '../../../components/FiplyComponents'

const Done = ({navigation}) => {
    return (
        <SafeAreaView>
            <Container center>
                <FiplyLogo style={{ marginVertical: 50 }} />
                <Text center size={18} weight='medium'>Great!</Text>
                <Text center >Once a Fiply representative has evaluated and validated your application to Fully Verify, Fiply will notify you.</Text>
                <Text center style={{ marginVertical: 20 }}>Thank you for taking part in Fiply's security protocol.</Text>
                <Text center >Have an awesome day!</Text>

                <Button 
                    title={'Done'}
                    style={{ marginVertical: 50 }}
                    onPress={() => alert('done')}
                />
            </Container>
        </SafeAreaView>
    )
}

export default Done

const styles = StyleSheet.create({})
