import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {
    SafeAreaView,
    Text,
    TextInput,
    Button,
    Dropdown,
    Container,
} from '../../../components/FiplyComponents'
import Colors from '../../../../utils/Colors'
import { Formik } from 'formik'
import * as yup from 'yup'
import StepIndicator from '../../../components/StepIndicator'
import useRegister from '../../../../api/hooks/auth/useRegister'

const StepOne = ({ navigation }) => {
    const companySchema = yup.object({
        firstname: yup.string().trim().min(2).required('Firstname is required'),
        lastname: yup.string().trim().min(2).required('Lastname is required'),
        email: yup.string().trim().min(2).email().required('Email is required'),
        contact_no: yup.string().trim().min(2).required('Contact Number is required'),
    })

    const { createHiringManager, loading } = useRegister()

    return (
        <SafeAreaView>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 35,
                }}
            >
                <StepIndicator active />
            </View>
            <Container center padding={20}>
                <Text
                    color={Colors.secondary}
                    weight="medium"
                    size={24}
                    center
                    style={{ marginBottom: 20 }}
                >
                    Step 1
                </Text>
                <Formik
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        email: '',
                        contact_no: '',
                    }}
                    validationSchema={companySchema}
                    onSubmit={(values) => {
                        createHiringManager(values, () => {
                            navigation.navigate('StepTwo')
                        })
                    }}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        setFieldValue,
                    }) => (
                        <View>
                            <TextInput
                                label="Firstname"
                                value={values.firstname}
                                onChangeText={handleChange('firstname')}
                                onBlur={handleBlur('firstname')}
                                error={touched.firstname && errors.firstname ? true : false}
                                errorMsg={
                                    touched.firstname && errors.firstname ? errors.firstname : ''
                                }
                            />
                            <TextInput
                                label="Lastname"
                                value={values.lastname}
                                onChangeText={handleChange('lastname')}
                                onBlur={handleBlur('lastname')}
                                error={touched.lastname && errors.lastname ? true : false}
                                errorMsg={
                                    touched.lastname && errors.lastname ? errors.lastname : ''
                                }
                            />
                            <TextInput
                                label="Email"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                keyboardType="email-address"
                                error={touched.email && errors.email ? true : false}
                                errorMsg={touched.email && errors.email ? errors.email : ''}
                            />
                            <TextInput
                                label="Contact Number"
                                value={values.contact_no}
                                onChangeText={handleChange('contact_no')}
                                onBlur={handleBlur('contact_no')}
                                keyboardType="number-pad"
                                error={touched.contact_no && errors.contact_no ? true : false}
                                errorMsg={
                                    touched.contact_no && errors.contact_no ? errors.contact_no : ''
                                }
                            />

                            <Button
                                title="Continue"
                                onPress={handleSubmit}
                                style={{ marginVertical: 25 }}
                                loading={loading}
                                disabled={
                                    values.firstname &&
                                    values.lastname &&
                                    values.email &&
                                    values.contact_no &&
                                    !loading
                                        ? false
                                        : true
                                }
                            />
                        </View>
                    )}
                </Formik>
            </Container>
        </SafeAreaView>
    )
}

export default StepOne

const styles = StyleSheet.create({})
