import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import {
    Text,
    SafeAreaView,
    Container,
    TextInput,
    Button,
} from '../../../components/FiplyComponents'
import Header from '../../../components/headers/Header'
import Colors from '../../../../utils/Colors'

const AddHiringManagerScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Header title="New Hiring Manager" />
            <Container center padding={20}>
                <TouchableOpacity style={styles.uploadBtn}>
                    <Text color={Colors.primary}>Upload Photo</Text>
                </TouchableOpacity>

                <>
                    <TextInput
                        label={'Firstname'}
                        mode="flat"
                        style={{ backgroundColor: Colors.defaultBg }}
                    />
                    <TextInput
                        label={'Lastname'}
                        mode="flat"
                        style={{ backgroundColor: Colors.defaultBg }}
                    />
                    <TextInput
                        label={'Email'}
                        mode="flat"
                        style={{ backgroundColor: Colors.defaultBg }}
                    />
                    <TextInput
                        label={'Contact Number'}
                        mode="flat"
                        style={{ backgroundColor: Colors.defaultBg }}
                    />

                    <Button
                        title={'Proceed'}
                        style={{ marginTop: 25 }}
                        onPress={() => navigation.navigate('ConfirmEmailScreen')}
                    />
                </>
            </Container>
        </SafeAreaView>
    )
}

export default AddHiringManagerScreen

const styles = StyleSheet.create({
    uploadBtn: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 15,
        borderColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 50,
        alignItems: 'center',
        marginHorizontal: '20%',
    },
})
