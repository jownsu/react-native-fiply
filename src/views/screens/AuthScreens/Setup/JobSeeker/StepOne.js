import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView, Text, TextInput, Button, SecondaryButton, Container2, InputDropdown } from '../../../../components/FiplyComponents'
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

//

    const [showDropdown, setShowDropdown] = useState({
        recentJob: false, 
        employmentType: false, 
        recentCompany: false, 
        location: false,
        school: false,
        degree: false,
        fieldOfStudy: false
    })



    const jobList = [
        {
            id: "1",
            name: "Fullstack Developer",
        },
        {
            id: "2",
            name: "Backend Developer",
        },
        {
            id: "3",
            name: "Frontend Developer",
        },
    ]
    const employmentTypeList = [
        {
            id: "1",
            name: "Full time",
        },
        {
            id: "2",
            name: "Part time",
        },
        {
            id: "3",
            name: "Work from home",
        },
    ]
    const companyList = [
        {
            id: "1",
            name: "Carja Tech",
        },
        {
            id: "2",
            name: "Google",
        },
        {
            id: "3",
            name: "Logitech",
        },
    ]
    const locationList = [
        {
          id: "1",
          name: "Cavite",
        },
        {
          id: "2",
          name: "Quezon City",
        },
        {
          id: "3",
          name: "Caloocan City",
        },
    ]
    const schoolList = [
        {id: '1', name: 'University of Caloocan City - UCC'},
        {id: '2', name: "St. Theresa's School of Novaliches"},
        {id: '3', name: 'Dela Salle University'},
        {id: '4', name: 'Quezon City Polytechnic Univerity'},
        {id: '5', name: 'University of the Philippines'},
    ]
    const degreeList = [
        {id: '1', name: "Bachelor of Science in Computer Science"},
        {id: '2', name: "Bachelor of Science in Information Technology"},
        {id: '3', name: "Bachelor of Arts in Psychology"},
        {id: '4', name: "Bachelor of Science in Geology"},
        {id: '5', name: "Bachelor of Science in Agriculture"},
    ]
    const fieldOfStudyList = [
        {id: '1', name: 'Computer Software/Engineering'},
        {id: '2', name: 'Fine Art'},
        {id: '3', name: 'Accounting'},
        {id: '4', name: 'Civil Engineering'},
        {id: '5', name: 'Broadcast Media'},
    ]

    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 35 }}>
                <StepIndicator active/>
            </View>
            <Container2 center onPress={() => setShowDropdown({})} >
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

                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (

                            <View>
                                <InputDropdown
                                    label={"Most recent job"}
                                    visibleDropdown={showDropdown.recentJob}
                                    value={values.recentJob}
                                    data={jobList}
                                    onFocus={() => setShowDropdown({...showDropdown, recentJob: true})}
                                    style={{ marginBottom: 10 }}
                                    onChangeText={handleChange('recentJob')}
                                    onBlur={handleBlur('recentJob')}
                                    error={(touched.recentJob && errors.recentJob) ? true : false}
                                    errorMsg={(touched.recentJob && errors.recentJob) ? errors.recentJob : ''}
                                    onListPress={name => {
                                        setFieldValue('recentJob', name)
                                        setShowDropdown({...showDropdown, recentJob: false})
                                    }}
                                />

                                <InputDropdown
                                    label={"Employment Type"}
                                    visibleDropdown={showDropdown.employmentType}
                                    value={values.employmentType}
                                    data={employmentTypeList}
                                    onFocus={() => setShowDropdown({...showDropdown, employmentType: true})}
                                    style={{ marginBottom: 10 }}
                                    onChangeText={handleChange('employmentType')}
                                    onBlur={handleBlur('employmentType')}
                                    error={(touched.employmentType && errors.employmentType) ? true : false}
                                    errorMsg={(touched.employmentType && errors.employmentType) ? errors.employmentType : ''}
                                    onListPress={name => {
                                        setFieldValue('employmentType', name)
                                        setShowDropdown({...showDropdown, employmentType: false})
                                    }}
                                    onInputPress={() => setShowDropdown({...showDropdown, employmentType: true})}
                                    nonEditable
                                    dropdownIcon
                                />

                                <InputDropdown
                                    label={"Most recent company"}
                                    visibleDropdown={showDropdown.recentCompany}
                                    value={values.recentCompany}
                                    data={companyList}
                                    onFocus={() => setShowDropdown({...showDropdown, recentCompany: true})}
                                    style={{ marginBottom: 10 }}
                                    onChangeText={handleChange('recentCompany')}
                                    onBlur={handleBlur('recentCompany')}
                                    error={(touched.recentCompany && errors.recentCompany) ? true : false}
                                    errorMsg={(touched.recentCompany && errors.recentCompany) ? errors.recentCompany : ''}
                                    onListPress={name => {
                                        setFieldValue('recentCompany', name)
                                        setShowDropdown({...showDropdown, recentCompany: false})
                                    }}
                                />

                                <InputDropdown
                                    label={"Location"}
                                    visibleDropdown={showDropdown.location}
                                    value={values.location}
                                    data={locationList}
                                    onFocus={() => setShowDropdown({...showDropdown, location: true})}
                                    style={{ marginBottom: 10 }}
                                    onChangeText={handleChange('location')}
                                    onBlur={handleBlur('location')}
                                    error={(touched.location && errors.location) ? true : false}
                                    errorMsg={(touched.location && errors.location) ? errors.location : ''}
                                    onListPress={name => {
                                        // handleChange(name)
                                        setFieldValue('location', name)
                                        setShowDropdown({...showDropdown, location: false})
                                    }}
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

                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (

                            <View>

                                <InputDropdown
                                    label={"School"}
                                    visibleDropdown={showDropdown.school}
                                    value={values.school}
                                    data={schoolList}
                                    onFocus={() => setShowDropdown({...showDropdown, school: true})}
                                    style={{ marginBottom: 10 }}
                                    onChangeText={handleChange('school')}
                                    onBlur={handleBlur('school')}
                                    error={(touched.school && errors.school) ? true : false}
                                    errorMsg={(touched.school && errors.school) ? errors.school : ''}
                                    onListPress={name => {
                                        setFieldValue('school', name)
                                        setShowDropdown({...showDropdown, school: false})
                                    }}
                                />

                                <InputDropdown
                                    label={"Degree"}
                                    visibleDropdown={showDropdown.degree}
                                    value={values.degree}
                                    data={degreeList}
                                    onFocus={() => setShowDropdown({...showDropdown, degree: true})}
                                    style={{ marginBottom: 10 }}
                                    onChangeText={handleChange('degree')}
                                    onBlur={handleBlur('degree')}
                                    error={(touched.degree && errors.degree) ? true : false}
                                    errorMsg={(touched.degree && errors.degree) ? errors.degree : ''}
                                    onListPress={name => {
                                        setFieldValue('degree', name)
                                        setShowDropdown({...showDropdown, degree: false})
                                    }}
                                />

                                <InputDropdown
                                    label={"Field of study"}
                                    visibleDropdown={showDropdown.fieldOfStudy}
                                    value={values.fieldOfStudy}
                                    data={fieldOfStudyList}
                                    onFocus={() => setShowDropdown({...showDropdown, fieldOfStudy: true})}
                                    style={{ marginBottom: 10 }}
                                    onChangeText={handleChange('fieldOfStudy')}
                                    onBlur={handleBlur('fieldOfStudy')}
                                    error={(touched.fieldOfStudy && errors.fieldOfStudy) ? true : false}
                                    errorMsg={(touched.fieldOfStudy && errors.fieldOfStudy) ? errors.fieldOfStudy : ''}
                                    onListPress={name => {
                                        setFieldValue('fieldOfStudy', name)
                                        setShowDropdown({...showDropdown, fieldOfStudy: false})
                                    }}
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

                                <SecondaryButton
                                    title="I'm not a student"
                                    onPress={() => setHideStudentForm(true)}
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
            </Container2>
        </SafeAreaView>
    )
}

export default StepOne

const styles = StyleSheet.create({})
