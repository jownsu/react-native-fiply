import React, { useState, useContext } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { AuthContext } from '../../../../providers/AuthProvider'
import { Formik } from 'formik'
import * as yup from 'yup'
import Colors from '../../../../utils/Colors'
import { TextInput as TxtInput } from 'react-native-paper'

import {Text, FiplyLogo, WaveHeader, Container, Button, TextInput, SafeAreaView} from '../../../components/FiplyComponents'


const SignupScreen = ({navigation}) => {

    const [hideSecondForm, setHideSecondForm] = useState(true)
    const [hidePassword, setHidePassword] = useState(true)
    const { signup, loading } = useContext(AuthContext)
    
    const signupSchema = yup.object({
        email: yup.string().trim().email('Invalid email').required('Email is required'), 
        password: yup.string().trim().required('Password is required'), 
        password_confirmation: yup.string().trim().required('Confirm password is required'), 
        firstname: yup.string().trim().required('Firstname is required'), 
        lastname: yup.string().trim().required('Lastname is required')
    })

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WaveHeader waveimg={require('../../../../assets/img/waves/2.png')} />
            <Container center >
                <FiplyLogo style={{ marginBottom: 25 }}/>

                <Formik
                    initialValues={{ 
                        email: '', 
                        password: '', 
                        password_confirmation: '', 
                        firstname: '', 
                        lastname: '' }}
                    onSubmit={(values) => {
                        signup(values)
                        // navigation.navigate('SelectUserTypeStack')
                    }}
                    validationSchema={signupSchema}
                >

                    {({handleChange, handleSubmit, handleBlur, values, errors, touched}) => (
                        <View style={ styles.formContainer }>
                            { hideSecondForm 
                                ? 
                                    <View>
                                        <TextInput
                                            label={'Your Email'}
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            onBlur={handleBlur('email')}
                                            error={(touched.email && errors.email) ? true : false}
                                            errorMsg={(touched.email && errors.email) ? errors.email : ''}
                                        />
                                        <TextInput
                                            label={'Password'}
                                            value={values.password}
                                            onChangeText={handleChange('password')}
                                            onBlur={handleBlur('password')}
                                            error={(touched.password && errors.password) ? true : false}
                                            errorMsg={(touched.password && errors.password) ? errors.password : ''}
                                            secureTextEntry={hidePassword}
                                            right={<TxtInput.Icon name="eye" color={Colors.light} onPress={() => setHidePassword(!hidePassword)}/>}
                                        />
                                        <TextInput
                                            label={'Confirm Password'}
                                            value={values.password_confirmation}
                                            onChangeText={handleChange('password_confirmation')}
                                            onBlur={handleBlur('password_confirmation')}
                                            error={(touched.password_confirmation && errors.password_confirmation) ? true : false}
                                            errorMsg={(touched.password_confirmation && errors.password_confirmation) ? errors.password_confirmation : ''}
                                            secureTextEntry={hidePassword}
                                        />
                                        <Text style={{ textAlign: 'center', marginBottom: 20, marginTop: 35 }}>
                                            By clicking Agree and Join, you agree to the Fiply 
                                            <Text color={Colors.primary}> User Agreement</Text>, 
                                            <Text color={Colors.primary}> Privacy Policy</Text>, and 
                                            <Text color={Colors.primary}> Cookie Policy</Text>.
                                        </Text>
                                        
                                        <Button 
                                            title={'Agree & Join'}
                                            onPress={() => setHideSecondForm(false)}
                                            disabled={ ((values.email && !errors.email) && values.password && values.password_confirmation) ? false : true}
                                        />

                                    </View>
                                    
                                : 
                                <View> 
                                    <View>
                                        <TextInput
                                            label={'Firstname'}
                                            value={values.firstname}
                                            onChangeText={handleChange('firstname')}
                                            onBlur={handleBlur('firstname')}
                                            error={(touched.firstname && errors.firstname) ? true : false}
                                            errorMsg={(touched.firstname && errors.firstname) ? errors.firstname : ''}
                                        />

                                        <TextInput
                                            label={'Lastname'}
                                            value={values.lastname}
                                            onChangeText={handleChange('lastname')}
                                            onBlur={handleBlur('lastname')}
                                            error={(touched.lastname && errors.lastname) ? true : false}
                                            errorMsg={(touched.lastname && errors.lastname) ? errors.lastname : ''}
                                        />

                                        <Button 
                                            title={'Continue'}
                                            onPress={() => handleSubmit()}
                                            style={{ marginTop: 30 }}
                                            disabled={
                                                (
                                                    (values.email && !errors.email) 
                                                    && values.password 
                                                    && values.password_confirmation 
                                                    && values.firstname 
                                                    && values.lastname
                                                )
                                                    ? false : true
                                            }
                                            loading={loading}
                                        />

                                        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => setHideSecondForm(true)}>
                                            <Text center >Back</Text>
                                        </TouchableOpacity>

                                    </View>
                                
                                </View>
                            }

                        </View>
                    )}


                </Formik>

            </Container>
        </SafeAreaView>
    )
}

export default SignupScreen

const styles = StyleSheet.create({

})
