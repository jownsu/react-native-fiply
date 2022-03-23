import React, { useState, useContext } from 'react'
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
} from '../../components/FiplyComponents'

const SignUp1Screen = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true)
    const { loading } = useContext(AuthContext)
    const { setUserInfo1 } = useContext(SignUpContext)

    const onChange = (password, score, { label, labelColor, activeBarColor }) => {
        console.log(password, score, { label, labelColor, activeBarColor })
    }

    const signupSchema = yup.object({
        email: yup.string().trim().email('Invalid email').required('Email is required'),
        password: yup
            .string()
            .trim()
            .required('Password is required')
            .min(8)
            .oneOf([yup.ref('password_confirmation'), null], 'Passwords must match'),
        password_confirmation: yup
            .string()
            .trim()
            .min(8)
            .required('Confirm password is required')
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
    })

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WaveHeader waveimg={require('../../../assets/img/waves/2.png')} />
            <Container center padding={20}>
                <FiplyLogo style={{ marginBottom: 25 }} />

                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        password_confirmation: '',
                    }}
                    onSubmit={(values) => {
                        setUserInfo1(values)
                        navigation.push('SignUp2Screen')
                    }}
                    validationSchema={signupSchema}
                >
                    {({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (
                        <View style={styles.formContainer}>
                            <View>
                                <TextInput
                                    label={'Your Email'}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    error={touched.email && errors.email ? true : false}
                                    errorMsg={touched.email && errors.email ? errors.email : ''}
                                />
                                <TextInput
                                    label={'Password'}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    error={touched.password && errors.password ? true : false}
                                    errorMsg={
                                        touched.password && errors.password ? errors.password : ''
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
                                {values.password ? (
                                    <BarPasswordStrengthDisplay
                                        password={values.password}
                                        minLength={1}
                                        scoreLimit={90}
                                        width={250}
                                        labelStyle={{
                                            position: 'relative',
                                            alignSelf: 'flex-end',
                                        }}
                                        levels={[
                                            {
                                                label: 'Weak',
                                                labelColor: '#ff2900',
                                                activeBarColor: '#ff2900',
                                            },
                                            {
                                                label: 'Weak',
                                                labelColor: '#ff3e00',
                                                activeBarColor: '#ff3e00',
                                            },
                                            {
                                                label: 'Average',
                                                labelColor: '#f3d331',
                                                activeBarColor: '#f3d331',
                                            },
                                            {
                                                label: 'Average',
                                                labelColor: '#f3d331',
                                                activeBarColor: '#f3d331',
                                            },
                                            {
                                                label: 'Strong',
                                                labelColor: '#14eb6e',
                                                activeBarColor: '#14eb6e',
                                            },
                                            {
                                                label: 'Strong',
                                                labelColor: '#14eb6e',
                                                activeBarColor: '#14eb6e',
                                            },
                                        ]}
                                    />
                                ) : null}

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
                                        values.email &&
                                        !errors.email &&
                                        values.password &&
                                        !errors.password &&
                                        values.password_confirmation &&
                                        !errors.password_confirmation
                                            ? false
                                            : true
                                    }
                                />
                            </View>
                        </View>
                    )}
                </Formik>
            </Container>
        </SafeAreaView>
    )
}

export default SignUp1Screen

const styles = StyleSheet.create({})
