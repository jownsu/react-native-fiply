import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView, Text, TextInput, Button, SecondaryButton, Container } from '../../../../components/FiplyComponents'
import Colors from '../../../../../utils/Colors'
import { Formik } from 'formik'
import * as yup from 'yup'
import StepIndicator from '../../../../components/StepIndicator'

const StepOne = ({navigation}) => {

    const [hideStudentForm, setHideStudentForm] = useState(true)

    const experienceSchema = yup.object({
        recentJob: yup.string().trim().required('Most recent job is required'),
        employmentType: yup.string().trim().required('Employment type is required'),
        recentCompany: yup.string().trim().required('Recent company is required'),
        location : yup.string().trim().required('Location is required')
    })

    const studentSchema = yup.object({
        school: yup.string().trim().required('School is required'),
        degree: yup.string().trim().required('Degree is required'),
        fieldOfStudy: yup.string().trim().required('Field of study is required'),
        year: yup.string().trim().required('Year is required')
    })


    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 35 }}>
                <StepIndicator active/>
            </View>
            <Container center>
                <Text color={Colors.secondary} weight='medium' size={24} center style={{ marginBottom: 20 }}>Step 1</Text>
                    <View style={{ display: hideStudentForm ? 'flex' : 'none'}}>
                        <Formik
                            initialValues={{ 
                                recentJob: '', 
                                employmentType: '', 
                                recentCompany: '', 
                                location: ''
                            }}
                            validationSchema={experienceSchema}
                            onSubmit={(values) => navigation.navigate('StepTwo')}
                        >   

                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (

                            <View>
                                <TextInput
                                    label="Most recent job"
                                    value={values.recentJob}
                                    onChangeText={handleChange('recentJob')}
                                    onBlur={ handleBlur('recentJob')}
                                    error={(touched.recentJob && errors.recentJob) ? true : false}
                                    style={{ marginTop: 5 }}
                                    errorMsg={(touched.recentJob && errors.recentJob) ? errors.recentJob : ''}
                                />

                                <TextInput
                                    label="Employment Type"
                                    value={values.employmentType}
                                    onChangeText={handleChange('employmentType')}
                                    onBlur={ handleBlur('employmentType')}
                                    error={(touched.employmentType && errors.employmentType) ? true : false}
                                    style={{ marginTop: 5 }}
                                    errorMsg={(touched.employmentType && errors.employmentType) ? errors.employmentType : ''}
                                />
                                <TextInput
                                    label="Most recent company"
                                    value={values.recentCompany}
                                    onChangeText={handleChange('recentCompany')}
                                    onBlur={ handleBlur('recentCompany')}
                                    error={(touched.recentCompany && errors.recentCompany) ? true : false}
                                    style={{ marginTop: 5 }}
                                    errorMsg={(touched.recentCompany && errors.recentCompany) ? errors.recentCompany : ''}
                                />
                                <TextInput
                                    label="Location"
                                    value={values.location}
                                    onChangeText={handleChange('location')}
                                    onBlur={ handleBlur('location')}
                                    error={(touched.location && errors.location) ? true : false}
                                    style={{ marginTop: 5 }}
                                    errorMsg={(touched.location && errors.location) ? errors.location : ''}
                                />

                                <SecondaryButton 
                                    title="I'm a student"
                                    onPress={() => setHideStudentForm(false)}
                                    style={{ marginVertical: 20 }}
                                />

                                <Button 
                                    title='Continue'
                                    onPress={() => handleSubmit()}
                                />
                            </View>
                        )}
                        </Formik>
                    </View>
                    <View style={{ display: hideStudentForm ? 'none' : 'flex' }}>
                        <Formik
                            initialValues={{ 
                                school: '', 
                                degree: '', 
                                fieldOfStudy: '', 
                                year: ''
                            }}
                            validationSchema={studentSchema}
                            onSubmit={(values) =>  navigation.navigate('StepTwo')}
                        >   

                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (

                            <View>
                                <TextInput
                                    label="School"
                                    value={values.school}
                                    onChangeText={handleChange('school')}
                                    onBlur={ handleBlur('school')}
                                    error={(touched.school && errors.school) ? true : false}
                                    style={{ marginTop: 5 }}
                                    errorMsg={(touched.school && errors.school) ? errors.school : ''}
                                />
                                <TextInput
                                    label="Degree"
                                    value={values.degree}
                                    onChangeText={handleChange('degree')}
                                    onBlur={ handleBlur('degree')}
                                    error={(touched.degree && errors.degree) ? true : false}
                                    style={{ marginTop: 5 }}
                                    errorMsg={(touched.degree && errors.degree) ? errors.degree : ''}
                                />
                                <TextInput
                                    label="Field of study"
                                    value={values.fieldOfStudy}
                                    onChangeText={handleChange('fieldOfStudy')}
                                    onBlur={ handleBlur('fieldOfStudy')}
                                    error={(touched.fieldOfStudy && errors.fieldOfStudy) ? true : false}
                                    style={{ marginTop: 5 }}
                                    errorMsg={(touched.fieldOfStudy && errors.fieldOfStudy) ? errors.fieldOfStudy : ''}
                                />
                                <TextInput
                                    label="Year"
                                    value={values.year}
                                    onChangeText={handleChange('year')}
                                    onBlur={ handleBlur('year')}
                                    error={(touched.year && errors.year) ? true : false}
                                    style={{ marginTop: 5 }}
                                    errorMsg={(touched.year && errors.year) ? errors.year : ''}
                                />

                                <Button 
                                    title='Continue'
                                    onPress={() => handleSubmit()}
                                    style={{ marginVertical: 20 }}
                                />
                                <SecondaryButton
                                    title='Back'
                                    onPress={() => setHideStudentForm(true)}
                                />
                            </View>
                        )}
                        </Formik>
                    </View>
            </Container>
        </SafeAreaView>
    )
}

export default StepOne

const styles = StyleSheet.create({})
