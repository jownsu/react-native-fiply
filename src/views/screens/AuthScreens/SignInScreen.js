import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import Colors from '../../../utils/Colors'

import {Text, TextInput, WaveHeader, Container, Button, SafeAreaView} from '../../components/FiplyComponents'

const SignInScreen = ({navigation}) => {

    const signInSchema = yup.object({
        email: yup.string().trim().email('Invalid Email').required('Email is required'),
        password: yup.string().trim().required('Password is required')
    })

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WaveHeader waveimg={require('../../../assets/img/waves/1.png')} />
            <Container center>
                <View style={styles.imgContainer} >
                    <Image source={require('../../../assets/img/signinillus.png')} style={styles.img} />
                </View>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={ (values) => {
                        console.log(values) }}
                    validationSchema={signInSchema}
                >
                    {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
                        <View style={styles.formContainer}>
                            <TextInput
                                label="Email"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={ handleBlur('email')}
                                error={(touched.email && errors.email) ? true : false}
                                errorMsg={(touched.email && errors.email) ? errors.email : ''}
                                style={{ marginTop: 10 }}
                            />
                            <TextInput
                                label="Password"
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={ handleBlur('password')}
                                error={(touched.password && errors.password) ? true : false}
                                secureTextEntry={true}
                                errorMsg={(touched.password && errors.password) ? errors.password : ''}
                                style={{ marginTop: 10 }}
                            />

                            <TouchableOpacity style={styles.forgotpass}>
                                <Text weight='medium'>Forgot Password</Text>
                            </TouchableOpacity>

                            <Button 
                                title="Sign In"
                                onPress={() => handleSubmit()}
                            />

                        </View>
                    )}
                </Formik>

                <Text color={Colors.light} center>- - - Sign in with - - -</Text>

                <View style={ styles.googleContainer }>
                    <Image source={require('../../../assets/img/google.png')} style={styles.google} />
                </View>

                
                <View style={styles.signupContainer}>
                    <Text weight='semi-bold' color={Colors.light}>Don't have an account yet? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignupStack')}>
                        <Text weight='bold' color={Colors.primary}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Container>
        </SafeAreaView>
    )
}

export default SignInScreen

const styles = StyleSheet.create({
    imgContainer:{
        alignItems: 'center'
    },
    img:{

    },
    formContainer:{
        marginVertical: 20
    },
    forgotpass:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 30
    },
    googleContainer:{
        alignItems: 'center',
        marginVertical: 10
    },
    google:{
        height: 30,
        width: 30,
    },
    signupContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        bottom: 0
    }
})