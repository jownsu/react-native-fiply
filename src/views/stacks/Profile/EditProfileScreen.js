import React, { useContext } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Avatar, Snackbar } from 'react-native-paper'
import {
    Text,
    SafeAreaView,
    Container,
    TextInput,
    SecondaryButton,
    Dropdown,
} from '../../components/FiplyComponents'
import ProfileContext from '../../../api/context/profile/ProfileContext'
import { Formik } from 'formik'
import * as yup from 'yup'
import Header from '../../components/headers/Header'
import Colors from '../../../utils/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import usePickImage from '../../../utils/usePIckImage'
import useDocumentPicker from '../../../utils/useDocumentPicker'

const EditProfileScreen = ({ navigation }) => {
    const {
        userInfo,
        uploadAvatar,
        updateProfile,
        loading,
        snackBarMessage,
        hideSnackBar,
        setAudience,
        uploadResume,
    } = useContext(ProfileContext)
    const { pickImage } = usePickImage()
    const { pickDocument } = useDocumentPicker()

    const onUploadResumeBtnPress = () => {
        pickDocument(
            (response, uri) => {
                uploadResume(uri)
                navigation.navigate('ResumeScreen')
            },
            ['application/pdf']
        )
    }

    const formSchema = yup.object({
        firstname: yup.string().trim().min(2).required('Firstname is required'),
        lastname: yup.string().trim().min(2).required('Lastname is required'),
    })

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
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <Dropdown
                        label={'Audience'}
                        data={[
                            { id: 1, name: 'Public' },
                            { id: 2, name: 'Only Followers' },
                        ]}
                        value={userInfo.is_public ? 'Public' : 'Only Followers'}
                        onSubmit={(text) => {
                            if (text == 'Public') {
                                setAudience(true)
                            } else {
                                setAudience(false)
                            }
                        }}
                        iconSize={28}
                        iconStyle={{ marginTop: 15 }}
                        style={{ height: 40, marginBottom: 15, marginLeft: 15 }}
                        textInputStyle={{
                            height: 40,
                            fontSize: 14,
                        }}
                        noTextInput
                        dropdownIcon
                    />
                </View>

                <Formik
                    initialValues={{
                        firstname: userInfo.firstname,
                        lastname: userInfo.lastname,
                    }}
                    validationSchema={formSchema}
                    onSubmit={(values) => {
                        updateProfile(values)
                    }}
                >
                    {({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (
                        <>
                            <TextInput
                                label={'Firstname'}
                                mode={'flat'}
                                value={values.firstname}
                                onChangeText={handleChange('firstname')}
                                onBlur={handleBlur('firstname')}
                                error={touched.firstname && errors.firstname ? true : false}
                                errorMsg={
                                    touched.firstname && errors.firstname ? errors.firstname : ''
                                }
                            />
                            <TextInput
                                label={'Lastname'}
                                mode={'flat'}
                                value={values.lastname}
                                onChangeText={handleChange('lastname')}
                                onBlur={handleBlur('lastname')}
                                error={touched.lastname && errors.lastname ? true : false}
                                errorMsg={
                                    touched.lastname && errors.lastname ? errors.lastname : ''
                                }
                            />
                            <SecondaryButton
                                title="Save"
                                style={{ borderWidth: 0, marginTop: 20 }}
                                onPress={handleSubmit}
                                loading={loading}
                                disabled={loading}
                            />
                        </>
                    )}
                </Formik>

                {/* <TextInput value={userInfo.bio} label={'Bio'} mode={'flat'} /> */}

                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        style={styles.actionBtn}
                        onPress={() => navigation.push('ResumeScreen')}
                    >
                        <Text color={Colors.secondary} weight="medium" size={16}>
                            Resume
                        </Text>
                    </TouchableOpacity>

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
                <Snackbar
                    visible={snackBarMessage ? true : false}
                    onDismiss={() => hideSnackBar()}
                    duration={3000}
                    style={{ backgroundColor: Colors.black, zIndex: 99, elevation: 10 }}
                >
                    <Text color={Colors.white}>{snackBarMessage}</Text>
                </Snackbar>
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
    actionContainer: {
        paddingVertical: 10,
    },
    actionBtn: {
        paddingVertical: 10,
    },
})
