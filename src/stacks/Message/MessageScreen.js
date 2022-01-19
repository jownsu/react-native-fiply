import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, SafeAreaView, Container } from '../../views/components/FiplyComponents'
import Header from '../../views/components/headers/Header'
import { FontAwesome5 } from '@expo/vector-icons'
import Colors from '../../utils/Colors'

const MessageScreen = () => {
    return (
        <SafeAreaView>
            <View style={{ backgroundColor: Colors.white, position: 'absolute',top: 0, height: 50, width: '100%'  }}/>
            <Header 
                title='Jhones Digno'
                centerTitle
                rightIcon={() => <FontAwesome5 name="phone" size={18} color={Colors.black} />}
                style={{ backgroundColor: Colors.white }}
            />
            <Container>
                <Text>Messages</Text>
            </Container>
        </SafeAreaView>
    )
}

export default MessageScreen

const styles = StyleSheet.create({})
