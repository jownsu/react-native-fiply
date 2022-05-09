import React, { useState, useContext } from 'react'
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
    FormContainer,
    Container,
    Button,
    TextInput,
    SafeAreaView,
} from '../../../components/FiplyComponents'

const SignUpProfileScreen = ({ navigation, route }) => {
    let { usertype } = route.params
    const { loading } = useContext(AuthContext)
    const { setProfile } = useContext(SignUpContext)

    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const onChange = (event, selectedDate, callback) => {
        setShowDatePicker(Platform.OS === 'ios')
        if (selectedDate) {
            let stringDate = selectedDate.toLocaleDateString()
            callback(stringDate)
        }
    }

    let sixteenYearsAgo = new Date()
    sixteenYearsAgo = sixteenYearsAgo.setFullYear(sixteenYearsAgo.getFullYear() - 18)

    const signupSchema = yup.object({
        firstname: yup.string().trim().required('Firstname is required'),
        lastname: yup.string().trim().required('Lastname is required'),
        birthday: yup
            .string()
            .trim()
            .required('Birthday is required')
            .test(
                'Validate 18 years above',
                'Age must be 18 years above.',
                (value) => new Date(value).getFullYear() <= new Date().getFullYear() - 18
            ),
    })

    return (
        <SafeAreaView flex>
            <WaveHeader waveimg={require('../../../../assets/img/waves/2.png')} />
            <Container center padding={20}>
                <FiplyLogo style={{ marginBottom: 25 }} />

                <Formik
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        birthday: '',
                    }}
                    onSubmit={(values) => {
                        if (usertype == 'jobseeker') {
                            setProfile(values)
                            navigation.push('JobSetup')
                        } else {
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
                            <View>
                                <View>
                                    <TextInput
                                        label={'Firstname'}
                                        value={values.firstname}
                                        onChangeText={handleChange('firstname')}
                                        onBlur={handleBlur('firstname')}
                                        autoCapitalize={'words'}
                                        error={touched.firstname && errors.firstname ? true : false}
                                        errorMsg={
                                            touched.firstname && errors.firstname
                                                ? errors.firstname
                                                : ''
                                        }
                                    />

                                    <TextInput
                                        label={'Lastname'}
                                        value={values.lastname}
                                        onChangeText={handleChange('lastname')}
                                        onBlur={handleBlur('lastname')}
                                        autoCapitalize={'words'}
                                        error={touched.lastname && errors.lastname ? true : false}
                                        errorMsg={
                                            touched.lastname && errors.lastname
                                                ? errors.lastname
                                                : ''
                                        }
                                    />

                                    <TouchableOpacity
                                        activeOpacity={0.6}
                                        onPress={() => setShowDatePicker(true)}
                                    >
                                        <TextInput
                                            label="Birthday"
                                            value={values.birthday}
                                            onChangeText={handleChange('birthday')}
                                            onBlur={handleBlur('birthday')}
                                            error={
                                                touched.birthday && errors.birthday ? true : false
                                            }
                                            style={{ marginTop: 5 }}
                                            errorMsg={
                                                touched.birthday && errors.birthday
                                                    ? errors.birthday
                                                    : ''
                                            }
                                            nonEditable
                                        />
                                    </TouchableOpacity>

                                    {showDatePicker && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date}
                                            display="spinner"
                                            onChange={(e, val) =>
                                                onChange(e, val, (strVal) => {
                                                    setFieldValue('birthday', strVal)
                                                })
                                            }
                                            minimumDate={new Date(1950, 0, 1)}
                                            maximumDate={sixteenYearsAgo}
                                        />
                                    )}

                                    <Button
                                        title={'Continue'}
                                        onPress={handleSubmit}
                                        style={{ marginTop: 30 }}
                                        disabled={
                                            values.firstname && values.lastname ? false : true
                                        }
                                        loading={loading}
                                    />
                                </View>
                            </View>
                        </View>
                    )}
                </Formik>

                <Back onPress={() => navigation.pop()} />
            </Container>
        </SafeAreaView>
    )
}

export default SignUpProfileScreen

const styles = StyleSheet.create({})
