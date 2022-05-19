import React, { useState, useContext, isValidElement } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import AuthContext from '../../../api/context/auth/AuthContext'
import SignUpContext from '../../../api/context/auth/SignUpContext'
import { Formik } from 'formik'
import * as yup from 'yup'
import Colors from '../../../utils/Colors'
import { TextInput as TxtInput } from 'react-native-paper'
import { BarPasswordStrengthDisplay } from 'react-native-password-strength-meter'
import {
    Text,
    FiplyLogo,
    WaveHeader,
    Container,
    Button,
    TextInput,
    SafeAreaView,
    FormContainer,
} from '../../components/FiplyComponents'
import PasswordStrengthBar from '../../components/PasswordStrengthBar'

const SignUpScreen = ({ navigation, route }) => {
    let { usertype } = route.params

    const [hidePassword, setHidePassword] = useState(true)
    const { checkEmail, loading } = useContext(AuthContext)
    const { setUserInfo } = useContext(SignUpContext)
    const [invalidEmail, setInvalidEmail] = useState(false)

    const signupSchema = yup.object({
        email: yup.string().trim().email('Invalid email').required('Email is required'),
        password: yup
            .string()
            .trim()
            .required('Password is required')
            .min(8)
            .matches(/^(?=.*[0-9])/, 'At least have a number.')
            .matches(/^(?=.*[a-z])/, 'There must be at least one lowercase letters')
            .matches(/^(?=.*[A-Z])/, 'There must be at least one uppercase letters')
            .matches(
                /^(?=.*[$&+,:;=?@#|'<>.^*()%!-])/,
                'There must be at least one special character.'
            ),
        // .oneOf([yup.ref('password_confirmation'), null], 'Passwords must match'),
        password_confirmation: yup
            .string()
            .trim()
            .required('Confirm password is required')
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
    })

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WaveHeader waveimg={require('../../../assets/img/waves/2.png')} />
            <FormContainer flex center padding={20}>
                <FiplyLogo style={{ marginBottom: 25 }} />

                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        password_confirmation: '',
                    }}
                    onSubmit={(values) => {
                        checkEmail(values.email).then((isTaken) => {
                            if (!isTaken) {
                                setInvalidEmail(false)
                                setUserInfo(values)
                                if (usertype == 'jobseeker') {
                                    navigation.push('SignUpProfileScreen')
                                } else {
                                    navigation.push('SignUpCompanyScreen')
                                }
                            } else {
                                setInvalidEmail(true)
                            }
                        })
                    }}
                    validationSchema={signupSchema}
                >
                    {({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (
                        <View>
                            <View>
                                <TextInput
                                    label={'Email'}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={(e) => {
                                        // if (!errors.email) {
                                        //     checkEmail(values.email).then((isTaken) => {
                                        //         console.log(isTaken)
                                        //         setValidEmail(!isTaken)
                                        //     })
                                        // }

                                        handleBlur('email')(e)
                                    }}
                                    error={touched.email && errors.email ? true : false}
                                    errorMsg={touched.email && errors.email ? errors.email : ''}
                                    right={
                                        invalidEmail ? (
                                            <TxtInput.Icon name="close" color={Colors.red} />
                                        ) : null
                                    }
                                    loading={loading}
                                />
                                {invalidEmail ? (
                                    <Text color={Colors.red}>Email is already taken</Text>
                                ) : null}

                                <TextInput
                                    label={'Password'}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    // error={touched.password && errors.password ? true : false}
                                    // errorMsg={
                                    //     touched.password && errors.password ? errors.password : ''
                                    // }
                                    secureTextEntry={hidePassword}
                                    right={
                                        <TxtInput.Icon
                                            name="eye"
                                            color={Colors.light}
                                            onPress={() => setHidePassword(!hidePassword)}
                                        />
                                    }
                                />
                                <PasswordStrengthBar password={values.password} />

                                {touched.password && errors.password && (
                                    <Text color={Colors.red}>{errors.password}</Text>
                                )}

                                <TextInput
                                    label={'Confirm Password'}
                                    value={values.password_confirmation}
                                    onChangeText={handleChange('password_confirmation')}
                                    onBlur={handleBlur('password_confirmation')}
                                    error={
                                        touched.password_confirmation &&
                                        errors.password_confirmation
                                            ? true
                                            : false
                                    }
                                    errorMsg={
                                        touched.password_confirmation &&
                                        errors.password_confirmation
                                            ? errors.password_confirmation
                                            : ''
                                    }
                                    secureTextEntry={hidePassword}
                                />
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        marginBottom: 20,
                                        marginTop: 35,
                                    }}
                                >
                                    By clicking Agree and Join, you agree to the Fiply
                                    <Text color={Colors.primary}> User Agreement</Text>,
                                    <Text color={Colors.primary}> Privacy Policy</Text>, and
                                    <Text color={Colors.primary}> Cookie Policy</Text>.
                                </Text>

                                <Button
                                    title={'Agree & Join'}
                                    onPress={handleSubmit}
                                    disabled={
                                        !loading &&
                                        values.email &&
                                        !errors.email &&
                                        values.password &&
                                        !errors.password &&
                                        values.password_confirmation &&
                                        !errors.password_confirmation
                                            ? false
                                            : true
                                    }
                                    loading={loading}
                                />
                            </View>
                        </View>
                    )}
                </Formik>
            </FormContainer>
        </SafeAreaView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({})
