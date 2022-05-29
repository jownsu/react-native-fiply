import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { Avatar, Snackbar } from 'react-native-paper'
import {
    Text,
    SafeAreaView,
    Container,
    SecondaryButton,
    TextInput,
    Button,
    Dropdown,
} from '../../components/FiplyComponents'
import { Formik } from 'formik'
import * as yup from 'yup'

import PasswordStrengthBar from '../../components/PasswordStrengthBar'
import ProfileContext from '../../../api/context/profile/ProfileContext'
import Header from '../../components/headers/Header'
import Colors from '../../../utils/Colors'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import { TextInput as TxtInput } from 'react-native-paper'

const ChangePasswordScreen = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true)
    const { loading, snackBarMessage, hideSnackBar, changePassword } = useContext(ProfileContext)

    const formShema = yup.object({
        current_password: yup.string().required('Current Password is required'),
        new_password: yup
            .string()
            .trim()
            .required('Password is required')
            .min(8, 'Must be atleast 8 characters')
            .matches(/^(?=.*[0-9])/, 'At least have a number.')
            .matches(/^(?=.*[a-z])/, 'There must be at least one lowercase letters')
            .matches(/^(?=.*[A-Z])/, 'There must be at least one uppercase letters')
            .matches(
                /^(?=.*[$&+,:;=?@#|'<>.^*()%!-])/,
                'There must be at least one special character.'
            ),
        // .oneOf([yup.ref('password_confirmation'), null], 'Passwords must match'),
        new_password_confirmation: yup
            .string()
            .trim()
            .required('Confirm New Password is required')
            .oneOf([yup.ref('new_password'), null], 'New Passwords must match'),
    })

    return (
        <SafeAreaView statusBarColor={Colors.white}>
            <Header
                title={'Change Password'}
                style={{ backgroundColor: Colors.white }}
                onBackPress={() => navigation.pop()}
            />

            <Container padding={10} style={styles.container}>
                <Formik
                    initialValues={{
                        current_password: '',
                        new_password: '',
                        new_password_confirmation: '',
                    }}
                    onSubmit={(values) => {
                        changePassword(values, () => navigation.pop())
                    }}
                    validationSchema={formShema}
                >
                    {({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (
                        <View>
                            <View>
                                <TextInput
                                    mode="flat"
                                    label={'Current Password'}
                                    value={values.current_password}
                                    onChangeText={handleChange('current_password')}
                                    onBlur={handleBlur('current_password')}
                                    error={
                                        touched.current_password && errors.current_password
                                            ? true
                                            : false
                                    }
                                    errorMsg={
                                        touched.current_password && errors.current_password
                                            ? errors.current_password
                                            : ''
                                    }
                                    secureTextEntry={hidePassword}
                                    right={
                                        <TxtInput.Icon
                                            name="eye"
                                            color={Colors.light}
                                            onPress={() => setHidePassword(!hidePassword)}
                                        />
                                    }
                                />

                                <TextInput
                                    mode="flat"
                                    label={'New Password'}
                                    value={values.new_password}
                                    onChangeText={handleChange('new_password')}
                                    onBlur={handleBlur('new_password')}
                                    error={
                                        touched.new_password && errors.new_password ? true : false
                                    }
                                    // errorMsg={
                                    //     touched.new_password && errors.new_password
                                    //         ? errors.new_password
                                    //         : ''
                                    // }
                                    secureTextEntry={hidePassword}
                                    style={{ marginBottom: 10 }}
                                />
                                <PasswordStrengthBar password={values.new_password} />

                                {touched.new_password && errors.new_password && (
                                    <Text color={Colors.red}>{errors.new_password}</Text>
                                )}

                                <TextInput
                                    mode="flat"
                                    label={'Confirm New Password'}
                                    value={values.new_password_confirmation}
                                    onChangeText={handleChange('new_password_confirmation')}
                                    onBlur={handleBlur('new_password_confirmation')}
                                    error={
                                        touched.new_password_confirmation &&
                                        errors.new_password_confirmation
                                            ? true
                                            : false
                                    }
                                    errorMsg={
                                        touched.new_password_confirmation &&
                                        errors.new_password_confirmation
                                            ? errors.new_password_confirmation
                                            : ''
                                    }
                                    secureTextEntry={hidePassword}
                                />
                                <Button
                                    title={'Submit'}
                                    onPress={handleSubmit}
                                    disabled={
                                        !loading &&
                                        values.current_password &&
                                        !errors.current_password &&
                                        values.new_password &&
                                        !errors.new_password &&
                                        values.new_password_confirmation &&
                                        !errors.new_password_confirmation
                                            ? false
                                            : true
                                    }
                                    style={{ marginTop: 20 }}
                                    loading={loading}
                                />
                            </View>
                        </View>
                    )}
                </Formik>
            </Container>

            <Snackbar
                visible={snackBarMessage ? true : false}
                onDismiss={() => hideSnackBar()}
                duration={3000}
                style={{ backgroundColor: Colors.black, zIndex: 99, elevation: 10 }}
            >
                <Text color={Colors.white}>{snackBarMessage}</Text>
            </Snackbar>
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
