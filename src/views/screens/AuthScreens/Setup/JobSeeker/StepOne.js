import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { SafeAreaView, Text, TextInput, Button, SecondaryButton, Container, Dropdown } from '../../../../components/FiplyComponents'
import Colors from '../../../../../utils/Colors'
import { Formik } from 'formik'
import * as yup from 'yup'
import StepIndicator from '../../../../components/StepIndicator'
import DateTimePicker from '@react-native-community/datetimepicker';

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
        date: yup.string().trim().required('Date is required')
    })

    const jobList = [
        {
            id: "1",
            name: "Astronaut",
        },
        {
            id: "2",
            name: "Axie Scholar",
        },
        {
            id: "3",
            name: "Frontend Developer",
        },
        {
            id: "4",
            name: "Laravel Developer",
        },
        {
            id: "5",
            name: "UI/UX Designer",
        },
        {
            id: "6",
            name: "Web Designer",
        },
        {
            id: "7",
            name: "Full Stack Developer",
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


    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false)
    const onChange = (event, selectedDate, callback) => {
        setShowDatePicker(Platform.OS === 'ios');
        if(selectedDate){
            let stringDate = selectedDate.toLocaleDateString();
            callback(stringDate)
        }
      };
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 35 }}>
                <StepIndicator active/>
            </View>
            <Container center padding={20}>
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
                                <Dropdown
                                    label={"Most recent job"}
                                    value={values.recentJob}
                                    onChangeTextDelay={() => console.log('API CALLED')}
                                    onSubmit={(text) => setFieldValue('recentJob', text)}
                                    data={jobList}
                                    error={(touched.recentJob && errors.recentJob) ? true : false}
                                    errorMsg={(touched.recentJob && errors.recentJob) ? errors.recentJob : ''}
                                    style={{ marginBottom: 5 }}
                                />

                                <Dropdown
                                    label={"Employment Type"}
                                    value={values.employmentType}
                                    data={employmentTypeList}
                                    onChangeTextDelay={() => console.log('API CALLED')}
                                    onSubmit={(text) => setFieldValue('employmentType', text)}
                                    error={(touched.employmentType && errors.employmentType) ? true : false}
                                    errorMsg={(touched.employmentType && errors.employmentType) ? errors.employmentType : ''}
                                    style={{ marginBottom: 5 }}
                                    noTextInput
                                    dropdownIcon
                                />

                                <Dropdown
                                    label={"Most recent company"}
                                    value={values.recentCompany}
                                    data={companyList}
                                    onChangeTextDelay={() => console.log('API CALLED')}
                                    onSubmit={(text) => setFieldValue('recentCompany', text)}
                                    error={(touched.recentCompany && errors.recentCompany) ? true : false}
                                    errorMsg={(touched.recentCompany && errors.recentCompany) ? errors.recentCompany : ''}
                                    style={{ marginBottom: 5 }}
                                />

                                <Dropdown
                                    label={"Location"}
                                    value={values.location}
                                    data={locationList}
                                    onChangeTextDelay={() => console.log('API CALLED')}
                                    onSubmit={(text) => setFieldValue('location', text)}
                                    error={(touched.location && errors.location) ? true : false}
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
                                    disabled={(
                                        values.recentJob && 
                                        values.employmentType && 
                                        values.recentCompany && 
                                        values.location
                                    ) ? false : true
                                }
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
                                date: ''
                            }}
                            validationSchema={studentSchema}
                            onSubmit={(values) =>  navigation.navigate('StepTwo')}
                        >   

                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (

                            <View>

                                <Dropdown
                                    label={"School"}
                                    value={values.school}
                                    data={schoolList}
                                    style={{ marginBottom: 5 }}
                                    onChangeTextDelay={() => console.log('API CALLED')}
                                    onSubmit={(text) => setFieldValue('school', text)}
                                    error={(touched.school && errors.school) ? true : false}
                                    errorMsg={(touched.school && errors.school) ? errors.school : ''}
                                />

                                <Dropdown
                                    label={"Degree"}
                                    value={values.degree}
                                    data={degreeList}
                                    style={{ marginBottom: 5 }}
                                    onChangeTextDelay={() => console.log('API CALLED')}
                                    onSubmit={(text) => setFieldValue('degree', text)}
                                    error={(touched.degree && errors.degree) ? true : false}
                                    errorMsg={(touched.degree && errors.degree) ? errors.degree : ''}
                                />

                                <Dropdown
                                    label={"Field of study"}
                                    value={values.fieldOfStudy}
                                    data={fieldOfStudyList}
                                    style={{ marginBottom: 5 }}
                                    onChangeTextDelay={() => console.log('API CALLED')}
                                    onSubmit={(text) => setFieldValue('fieldOfStudy', text)}
                                    error={(touched.fieldOfStudy && errors.fieldOfStudy) ? true : false}
                                    errorMsg={(touched.fieldOfStudy && errors.fieldOfStudy) ? errors.fieldOfStudy : ''}
                                />
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={() => setShowDatePicker(true)}
                                >
                                    <TextInput
                                        label="Date"
                                        value={values.date}
                                        onChangeText={handleChange('date')}
                                        onBlur={ handleBlur('date')}
                                        error={(touched.date && errors.date) ? true : false}
                                        style={{ marginTop: 5 }}
                                        errorMsg={(touched.date && errors.date) ? errors.date : ''}
                                        nonEditable
                                    />
                                </TouchableOpacity>

                                {
                                    showDatePicker 
                                        ? 
                                            <DateTimePicker
                                                testID="dateTimePicker"
                                                value={date}
                                                display="default"
                                                onChange={(e, val) => onChange(e, val, (strVal) => {
                                                    setFieldValue('date', strVal)
                                                })}
                                            />
                                        : null
                                }
                                <SecondaryButton
                                    title="I'm not a student"
                                    onPress={() => setHideStudentForm(true)}
                                    style={{ marginVertical: 20 }}
                                />

                                <Button 
                                    title='Continue'
                                    onPress={() => handleSubmit()}
                                    disabled={(
                                            values.school && 
                                            values.degree && 
                                            values.fieldOfStudy && 
                                            values.date
                                        ) ? false : true
                                    }
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
