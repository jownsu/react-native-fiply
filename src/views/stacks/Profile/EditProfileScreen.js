import React, { useContext } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import {
    Text,
    SafeAreaView,
    Container,
    SecondaryButton,
    TextInput,
} from '../../components/FiplyComponents'
import ProfileContext from '../../../api/context/profile/ProfileContext'

import Header from '../../components/headers/Header'
import Colors from '../../../utils/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import usePickImage from '../../../utils/usePIckImage'

const EditProfileScreen = ({ navigation }) => {
    const { userInfo, uploadAvatar } = useContext(ProfileContext)
    const { pickImage } = usePickImage()

    return (
        <SafeAreaView statusBarColor={Colors.white} flex>
            <Header
                title={'Edit Profile'}
                style={{ backgroundColor: Colors.white }}
                onBackPress={() => navigation.pop()}
            />

            <Container style={styles.container} padding={10}>
                <View style={styles.headerContainer}>
                    <Avatar.Image
                        source={{ uri: userInfo.avatar }}
                        size={100}
                        style={styles.avatar}
                    />
                    <SecondaryButton
                        onPress={() => {
                            pickImage([1, 1], (uri) => {
                                uploadAvatar(uri)
                            })
                        }}
                        title={'Change photo'}
                        style={styles.changeProfileBtn}
                        labelStyle={styles.changeProfileLabel}
                    />
                </View>

                <TextInput value={userInfo.firstname} label={'Firstname'} mode={'flat'} />
                <TextInput value={userInfo.middlename} label={'Middlename'} mode={'flat'} />
                <TextInput value={userInfo.lastname} label={'Lastname'} mode={'flat'} />
                <TextInput value={userInfo.description} label={'Bio'} mode={'flat'} />

                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => navigation.push('EditAboutScreen')}
                    >
                        <Text color={Colors.secondary} weight="medium" size={16}>
                            Personal Info
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => navigation.push('EditJobPreferenceScreen')}
                    >
                        <Text color={Colors.secondary} weight="medium" size={16}>
                            Job Preference
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => navigation.push('EditEducationalBackgroundScreen')}
                    >
                        <Text color={Colors.secondary} weight="medium" size={16}>
                            Educational Background
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => navigation.push('EditExperienceScreen')}
                    >
                        <Text color={Colors.secondary} weight="medium" size={16}>
                            Work Experiences
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => navigation.push('ChangePasswordScreen')}
                    >
                        <Text color={Colors.secondary} weight="medium" size={16}>
                            Change Password
                        </Text>
                    </TouchableOpacity>
                </View>
            </Container>
        </SafeAreaView>
    )
}

export default EditProfileScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        marginVertical: 5,
    },
    avatar: {
        borderWidth: 1,
        overflow: 'hidden',
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
    actionContainer: {
        paddingVertical: 10,
    },
    actionBtn: {
        paddingVertical: 10,
    },
})
