import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import {
    SafeAreaView,
    Text,
    TextInput,
    Button,
    SecondaryButton,
    Container,
    Dropdown,
} from '../../../components/FiplyComponents'
import Colors from '../../../../utils/Colors'
import { Formik } from 'formik'
import * as yup from 'yup'
import StepIndicator from '../../../components/StepIndicator'
import DateTimePicker from '@react-native-community/datetimepicker'

import SignUpContext from '../../../../api/context/auth/SignUpContext'
import useUniversity from '../../../../api/hooks/useUniversity'
import useDegree from '../../../../api/hooks/useDegree'
import useDegreeCategory from '../../../../api/hooks/useDegreeCategory'

const StepOneStudent = ({ navigation }) => {
    const { universities, getUniversities, loading: universityLoading } = useUniversity()
    const { degrees, getDegrees, getCategory, loading: degreeLoading } = useDegree()
    const {
        degreeCategories,
        getDegreeCategories,
        loading: degreeCategoryLoading,
    } = useDegreeCategory()
    const { setEducationalBackground } = useContext(SignUpContext)

    useEffect(() => {
        getUniversities()
        getDegrees()
        getDegreeCategories()
    }, [])

    const studentSchema = yup.object({
        university: yup.string().trim().required('University is required'),
        degree: yup.string().trim().required('Degree is required'),
        field_of_study: yup.string().trim().required('Field of study is required'),
        // date: yup.string().trim().required('Date is required'),
    })

    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)

    const onChange = (event, selectedDate, callback) => {
        setShowDatePicker(Platform.OS === 'ios')
        if (selectedDate) {
            let stringDate = selectedDate.toLocaleDateString()
            callback(stringDate)
        }
    }
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
                        university: '',
                        degree: '',
                        field_of_study: '',
                    }}
                    validationSchema={studentSchema}
                    onSubmit={(values) => {
                        setEducationalBackground(values)
                        navigation.navigate('StepTwo')
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
                            <Dropdown
                                label={'University'}
                                value={values.university}
                                data={universities}
                                style={{ marginBottom: 5 }}
                                isLoading={universityLoading}
                                onSubmit={(text) => setFieldValue('university', text)}
                                error={touched.university && errors.university ? true : false}
                                errorMsg={
                                    touched.university && errors.university ? errors.university : ''
                                }
                            />

                            <Dropdown
                                label={'Degree'}
                                value={values.degree}
                                data={degrees}
                                style={{ marginBottom: 5 }}
                                isLoading={degreeLoading}
                                onSubmit={(text, id) => {
                                    getCategory(id, (degreeCategory) => {
                                        setFieldValue('field_of_study', degreeCategory)
                                    })
                                    setFieldValue('degree', text)
                                }}
                                error={touched.degree && errors.degree ? true : false}
                                errorMsg={touched.degree && errors.degree ? errors.degree : ''}
                            />

                            <Dropdown
                                label={'Field of study'}
                                value={values.field_of_study}
                                data={degreeCategories}
                                style={{ marginBottom: 5 }}
                                onSubmit={(text) => setFieldValue('field_of_study', text)}
                                isLoading={degreeCategoryLoading}
                                error={
                                    touched.field_of_study && errors.field_of_study ? true : false
                                }
                                errorMsg={
                                    touched.field_of_study && errors.field_of_study
                                        ? errors.field_of_study
                                        : ''
                                }
                            />
                            <SecondaryButton
                                title="I'm not a student"
                                onPress={() => navigation.pop()}
                                style={{ marginVertical: 20 }}
                            />

                            <Button
                                title="Continue"
                                onPress={() => handleSubmit()}
                                disabled={
                                    values.university && values.degree && values.field_of_study
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

export default StepOneStudent

const styles = StyleSheet.create({})
