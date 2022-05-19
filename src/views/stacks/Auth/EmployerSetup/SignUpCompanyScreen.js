import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import AuthContext from '../../../../api/context/auth/AuthContext'
import SignUpContext from '../../../../api/context/auth/SignUpContext'
import { Formik } from 'formik'
import * as yup from 'yup'
import Colors from '../../../../utils/Colors'
import { TextInput as TxtInput } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import Back from '../../../components/Back'

import {
    Text,
    FiplyLogo,
    WaveHeader,
    Container,
    Button,
    TextInput,
    SafeAreaView,
    Dropdown,
    FormContainer,
} from '../../../components/FiplyComponents'

import useLocation from '../../../../api/hooks/useLocation'

const SignUpCompanyScreen = ({ navigation, route }) => {
    let { usertype } = route.params

    const { locations, loading: locationLoading, getLocations } = useLocation()
    const { loading } = useContext(AuthContext)
    const [hidePassword, setHidePassword] = useState(true)
    const { setProfile, setCompany } = useContext(SignUpContext)

    useEffect(() => {
        getLocations()
    }, [])

    const signupSchema = yup.object({
        name: yup.string().trim().min(2).required('Company Name is required'),
        registration_no: yup.string().trim().min(2).required('Registration Number is required'),
        telephone_no: yup.string().trim().min(2).required('Telephone Number is required'),
        location: yup.string().trim().min(2).required('Location is required'),
        code: yup.number().required('Pin Code is Required'),
    })

    return (
        <SafeAreaView>
            <WaveHeader waveimg={require('../../../../assets/img/waves/2.png')} />
            <Container center padding={20}>
                <FiplyLogo style={{ marginBottom: 25 }} />

                <Formik
                    initialValues={{
                        name: '',
                        registration_no: '',
                        telephone_no: '',
                        location: '',
                        code: '',
                    }}
                    onSubmit={(values) => {
                        if (usertype == 'jobseeker') {
                            setProfile(values)
                            navigation.push('JobSetup')
                        } else {
                            setCompany(values)
                            navigation.push('ApplicantSetup')
                        }
                    }}
                    validationSchema={signupSchema}
                >
                    {({
                        handleChange,
                        handleSubmit,
                        handleBlur,
                        values,
                        errors,
                        touched,
                        setFieldValue,
                    }) => (
                        <View style={styles.formContainer}>
                            <TextInput
                                label={'Company Name'}
                                value={values.name}
                                onChangeText={handleChange('name')}
                                onBlur={handleBlur('name')}
                                autoCapitalize={'words'}
                                error={touched.name && errors.name ? true : false}
                                errorMsg={touched.name && errors.name ? errors.name : ''}
                            />

                            <TextInput
                                label={'Company Registration Number'}
                                value={values.registration_no}
                                onChangeText={handleChange('registration_no')}
                                onBlur={handleBlur('registration_no')}
                                autoCapitalize={'words'}
                                error={
                                    touched.registration_no && errors.registration_no ? true : false
                                }
                                errorMsg={
                                    touched.registration_no && errors.registration_no
                                        ? errors.registration_no
                                        : ''
                                }
                            />

                            <TextInput
                                label={'Telephone Number'}
                                value={values.telephone_no}
                                onChangeText={handleChange('telephone_no')}
                                onBlur={handleBlur('telephone_no')}
                                autoCapitalize={'words'}
                                error={touched.telephone_no && errors.telephone_no ? true : false}
                                errorMsg={
                                    touched.telephone_no && errors.telephone_no
                                        ? errors.telephone_no
                                        : ''
                                }
                            />

                            <Dropdown
                                label={'Location'}
                                value={values.location}
                                data={locations}
                                style={{ marginBottom: 5 }}
                                isLoading={locationLoading}
                                onSubmit={(text) => setFieldValue('location', text)}
                                error={touched.location && errors.location ? true : false}
                                errorMsg={
                                    touched.location && errors.location ? errors.location : ''
                                }
                            />

                            <TextInput
                                label={'Pin Code'}
                                value={values.code}
                                onChangeText={(text) => {
                                    const re = /^[0-9\b]+$/
                                    if (text === '' || re.test(text)) {
                                        handleChange('code')(text)
                                    }
                                }}
                                onBlur={handleBlur('code')}
                                error={touched.code && errors.code ? true : false}
                                errorMsg={touched.code && errors.code ? errors.code : ''}
                                keyboardType="numeric"
                                secureTextEntry={hidePassword}
                                right={
                                    <TxtInput.Icon
                                        name="eye"
                                        color={Colors.light}
                                        onPress={() => setHidePassword(!hidePassword)}
                                    />
                                }
                                maxLength={4}
                            />

                            <Button
                                title={'Continue'}
                                onPress={handleSubmit}
                                style={{ marginTop: 30 }}
                                disabled={
                                    values.name &&
                                    values.registration_no &&
                                    values.telephone_no &&
                                    values.location &&
                                    values.code
                                        ? false
                                        : true
                                }
                                loading={loading}
                            />
                        </View>
                    )}
                </Formik>

                <Back onPress={() => navigation.pop()} />
            </Container>
        </SafeAreaView>
    )
}

export default SignUpCompanyScreen

const styles = StyleSheet.create({})
