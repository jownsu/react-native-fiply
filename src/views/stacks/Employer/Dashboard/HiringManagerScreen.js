import { StyleSheet, View } from 'react-native'
import React from 'react'
import {
    Text,
    SafeAreaView,
    Container,
    TextInput,
    SecondaryButton,
} from '../../../components/FiplyComponents'
import { Avatar } from 'react-native-paper'
import Header from '../../../components/headers/Header'
import Colors from '../../../../utils/Colors'

const HiringManagerScreen = ({ navigation }) => {
    return (
        <SafeAreaView statusBarColor={Colors.white}>
            <Header
                onBackPress={() => navigation.pop()}
                style={{ backgroundColor: Colors.white }}
            />

            <Container padding={20}>
                <View style={styles.headerContainer}>
                    <Avatar.Image
                        source={require('../../../../assets/img/members/digno.jpg')}
                        size={100}
                        style={styles.avatar}
                    />

                    <SecondaryButton
                        title={'Change photo'}
                        style={styles.changeProfileBtn}
                        labelStyle={styles.changeProfileLabel}
                    />
                </View>

                <>
                    <TextInput
                        label={'Firstname'}
                        value={'Jhones'}
                        style={{ backgroundColor: Colors.defaultBg }}
                        mode="flat"
                    />
                    <TextInput
                        label={'Lastname'}
                        value={'Digno'}
                        style={{ backgroundColor: Colors.defaultBg }}
                        mode="flat"
                    />
                    <TextInput
                        label={'Email'}
                        value={'jownsu@gmail.com'}
                        style={{ backgroundColor: Colors.defaultBg }}
                        mode="flat"
                    />
                    <TextInput
                        label={'Contact Number'}
                        value={'09263414237'}
                        style={{ backgroundColor: Colors.defaultBg }}
                        mode="flat"
                    />

                    <SecondaryButton
                        title="Save"
                        style={{ borderWidth: 0, marginTop: 20, borderRadius: 5 }}
                    />
                </>
            </Container>
        </SafeAreaView>
    )
}

export default HiringManagerScreen

const styles = StyleSheet.create({
    avatar: {
        borderWidth: 1,
        overflow: 'hidden',
        backgroundColor: Colors.light,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
    },
    changeProfileBtn: {
        marginHorizontal: 0,
        width: 150,
        borderRadius: 10,
    },
    changeProfileLabel: {
        marginHorizontal: 0,
        fontSize: 12,
    },
})
