import React, { useContext, useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import Colors from '../../../utils/Colors'
import AuthContext from '../../../api/context/auth/AuthContext'
import { TextInput as TxtInput } from 'react-native-paper'

import {
    Text,
    TextInput,
    WaveHeader,
    Container,
    Button,
    SafeAreaView,
} from '../../components/FiplyComponents'

const SignInScreen = ({ navigation }) => {
    const { login, loading } = useContext(AuthContext)
    const [hidePassword, setHidePassword] = useState(true)

    const signInSchema = yup.object({
        email: yup.string().trim().email('Invalid Email').required('Email is required'),
        password: yup.string().trim().required('Password is required'),
    })

    const handleOnSubmit = (values) => {
        login(values.email, values.password)
    }

    return (
        <SafeAreaView flex statusBarColor={'rgba(0, 0, 0, 0)'}>
            <WaveHeader waveimg={require('../../../assets/img/waves/1.png')} />
            <Container padding={20}>
                <View style={styles.imgContainer}>
                    <Image
                        source={require('../../../assets/img/login.png')}
                        style={styles.img}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.bodyContainer}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => handleOnSubmit(values)}
                        validationSchema={signInSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View style={styles.formContainer}>
                                <TextInput
                                    label="Email"
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    error={touched.email && errors.email ? true : false}
                                    errorMsg={touched.email && errors.email ? errors.email : ''}
                                    style={{ marginTop: 10 }}
                                />
                                <TextInput
                                    label="Password"
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    error={touched.password && errors.password ? true : false}
                                    errorMsg={
                                        touched.password && errors.password ? errors.password : ''
                                    }
                                    style={{ marginTop: 10 }}
                                    secureTextEntry={hidePassword}
                                    right={
                                        <TxtInput.Icon
                                            name="eye"
                                            color={Colors.light}
                                            onPress={() => setHidePassword(!hidePassword)}
                                        />
                                    }
                                />

                                <TouchableOpacity style={styles.forgotpass}>
                                    <Text weight="medium">Forgot Password</Text>
                                </TouchableOpacity>

                                <Button
                                    title="Sign In"
                                    onPress={() => handleSubmit()}
                                    loading={loading}
                                    disabled={loading}
                                />
                            </View>
                        )}
                    </Formik>

                    {/* <Text color={Colors.grey} center>
                        - - - Sign in with - - -
                    </Text> */}

                    {/* <View style={styles.googleContainer}>
                        <Image
                            source={require('../../../assets/img/google.png')}
                            style={styles.google}
                        />
                    </View> */}

                    <View style={styles.signupContainer}>
                        <Text weight="semi-bold" color={Colors.grey}>
                            Don't have an account yet?{' '}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUpStack')}>
                            <Text weight="bold" color={Colors.primary}>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        </SafeAreaView>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    imgContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1,
    },
    bodyContainer: {
        justifyContent: 'space-evenly',
        flex: 1.3,
    },
    img: {
        height: '100%',
        width: '90%',
        maxWidth: 250,
        flex: 1,
    },
    formContainer: {
        marginVertical: 20,
    },
    forgotpass: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 30,
    },
    googleContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    google: {
        height: 30,
        width: 30,
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: 0,
    },
})
