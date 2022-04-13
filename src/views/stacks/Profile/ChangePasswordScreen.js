import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { Avatar } from 'react-native-paper'
import {
    Text,
    SafeAreaView,
    Container,
    SecondaryButton,
    TextInput,
    Dropdown,
} from '../../components/FiplyComponents'

import ProfileContext from '../../../api/context/profile/ProfileContext'
import Header from '../../components/headers/Header'
import Colors from '../../../utils/Colors'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

const ChangePasswordScreen = ({ navigation }) => {
    const {} = useContext(ProfileContext)

    return (
        <SafeAreaView statusBarColor={Colors.white}>
            <Header
                title={'Change Password'}
                style={{ backgroundColor: Colors.white }}
                onBackPress={() => navigation.pop()}
                rightIcon={() => <MaterialIcons name="check" size={24} color={Colors.primary} />}
            />

            <Container padding={10} style={styles.container}>
                <TextInput label={'Current Password'} mode="flat" />
                <TextInput label={'New Password'} mode="flat" />
                <TextInput label={'Confirm Password'} mode="flat" />
            </Container>
        </SafeAreaView>
    )
}

export default ChangePasswordScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        marginVertical: 5,
        paddingVertical: 25,
        paddingHorizontal: 10,
    },
    headerContainer: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
