import React, { useState, useContext } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import AuthContext from '../../../api/context/auth/AuthContext'
import SignUpContext from '../../../api/context/auth/SignUpContext'
import { Formik } from 'formik'
import * as yup from 'yup'
import Colors from '../../../utils/Colors'
import { TextInput as TxtInput } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import Back from '../../components/Back'

import {
    Text,
    FiplyLogo,
    WaveHeader,
    Container,
    Button,
    TextInput,
    SafeAreaView,
} from '../../components/FiplyComponents'

const SignUp2Screen = ({ navigation }) => {
    const { loading } = useContext(AuthContext)
    const { setUserInfo2 } = useContext(SignUpContext)

    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const onChange = (event, selectedDate, callback) => {
        setShowDatePicker(Platform.OS === 'ios')
        if (selectedDate) {
            let stringDate = selectedDate.toLocaleDateString()
            callback(stringDate)
        }
    }

    const signupSchema = yup.object({
        firstname: yup.string().trim().required('Firstname is required'),
        lastname: yup.string().trim().required('Lastname is required'),
        birthday: yup.string().trim().required('Birthday is required'),
    })

    return (
        <SafeAreaView>
            <WaveHeader waveimg={require('../../../assets/img/waves/2.png')} />
            <Container center padding={20}>
                <FiplyLogo style={{ marginBottom: 25 }} />

                <Formik
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        date: '',
                    }}
                    onSubmit={(values) => {
                        setUserInfo2(values)
                        navigation.push('SelectUserTypeScreen')
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
                                            display="default"
                                            onChange={(e, val) =>
                                                onChange(e, val, (strVal) => {
                                                    setFieldValue('birthday', strVal)
                                                })
                                            }
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

export default SignUp2Screen

const styles = StyleSheet.create({})
