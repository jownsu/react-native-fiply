import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import {
    Text,
    SafeAreaView,
    Container,
    TextInput,
    Dropdown,
    Button,
    FiplyLogo,
} from '../components/FiplyComponents'
import { Formik } from 'formik'
import * as yup from 'yup'
import Header from '../components/headers/Header'
import Colors from '../../utils/Colors'

const CreateJobScreen = ({ navigation }) => {
    const jobTitleList = [
        {
            id: 'Fullstack Developer',
            name: 'Fullstack Developer',
        },
        {
            id: 'Backend Developer',
            name: 'Backend Developer',
        },
        {
            id: 'Frontend Developer',
            name: 'Frontend Developer',
        },
    ]
    const locationList = [
        {
            id: 'Cavite',
            name: 'Cavite',
        },
        {
            id: 'Quezon City',
            name: 'Quezon City',
        },
        {
            id: 'Caloocan City',
            name: 'Caloocan City',
        },
    ]
    const jobTypeList = [
        {
            id: 'Full time',
            name: 'Full time',
        },
        {
            id: 'Part time',
            name: 'Part time',
        },
        {
            id: 'Work from home',
            name: 'Work from home',
        },
    ]
    const companyList = [
        {
            id: '1',
            name: 'Carja Tech',
        },
        {
            id: '2',
            name: 'Google',
        },
        {
            id: '3',
            name: 'Logitech',
        },
    ]

    const formSchema = yup.object({
        jobTitle: yup.string().trim().required('Job Title is required'),
        jobType: yup.string().trim().required('Job Type is required'),
        company: yup.string().trim().required('Company is requried'),
        location: yup.string().trim().required('Location is required'),
        description: yup.string().trim().required('Description is required'),
    })

    return (
        <SafeAreaView statusBarColor={Colors.white}>
            <Header
                title="Create a Job"
                centerTitle
                style={{ backgroundColor: Colors.white, marginBottom: 20 }}
                onBackPress={() => navigation.pop()}
            />

            <Container>
                <Formik
                    initialValues={{
                        jobTitle: '',
                        jobType: '',
                        company: '',
                        location: '',
                        description: '',
                    }}
                    validationSchema={formSchema}
                    onSubmit={(values) => {
                        console.log(values)
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
                                label="Job Title"
                                value={values.jobTitle}
                                data={jobTitleList}
                                style={{ marginBottom: 5 }}
                                onChangeTextDelay={() =>
                                    console.log('API CALLED')
                                }
                                onSubmit={(text) =>
                                    setFieldValue('jobTitle', text)
                                }
                                error={
                                    touched.jobTitle && errors.jobTitle
                                        ? true
                                        : false
                                }
                                errorMsg={
                                    touched.jobTitle && errors.jobTitle
                                        ? errors.jobTitle
                                        : ''
                                }
                            />
                            <Dropdown
                                label={'Job Type'}
                                value={values.jobType}
                                data={jobTypeList}
                                style={{ marginBottom: 5 }}
                                onSubmit={(text) =>
                                    setFieldValue('jobType', text)
                                }
                                error={
                                    touched.jobType && errors.jobType
                                        ? true
                                        : false
                                }
                                errorMsg={
                                    touched.jobType && errors.jobType
                                        ? errors.jobType
                                        : ''
                                }
                                noTextInput
                                dropdownIcon
                            />
                            <Dropdown
                                label={'Company'}
                                value={values.company}
                                data={companyList}
                                style={{ marginBottom: 5 }}
                                onChangeTextDelay={() =>
                                    console.log('API CALLED')
                                }
                                onSubmit={(text) =>
                                    setFieldValue('company', text)
                                }
                                error={
                                    touched.company && errors.company
                                        ? true
                                        : false
                                }
                                errorMsg={
                                    touched.company && errors.company
                                        ? errors.company
                                        : ''
                                }
                            />
                            <Dropdown
                                label={'Location'}
                                value={values.location}
                                data={locationList}
                                style={{ marginBottom: 5 }}
                                onChangeTextDelay={() =>
                                    console.log('API CALLED')
                                }
                                onSubmit={(text) =>
                                    setFieldValue('location', text)
                                }
                                error={
                                    touched.location && errors.location
                                        ? true
                                        : false
                                }
                                errorMsg={
                                    touched.location && errors.location
                                        ? errors.location
                                        : ''
                                }
                            />
                            <TextInput
                                label="Description"
                                multiline
                                style={{ maxHeight: 150, marginBottom: 5 }}
                                value={values.description}
                                onChangeText={handleChange('description')}
                                onBlur={handleBlur('description')}
                                error={
                                    touched.description && errors.description
                                        ? true
                                        : false
                                }
                                errorMsg={
                                    touched.description && errors.description
                                        ? errors.description
                                        : ''
                                }
                            />

                            <Button
                                title="Submit"
                                style={{ marginTop: 35 }}
                                onPress={handleSubmit}
                                disabled={
                                    values.jobTitle &&
                                    values.jobType &&
                                    values.company &&
                                    values.location &&
                                    values.description
                                        ? false
                                        : true
                                }
                            />
                        </View>
                    )}
                </Formik>

                <FiplyLogo style={{ flex: 1 }} textColor={Colors.secondary} />
            </Container>
        </SafeAreaView>
    )
}

export default CreateJobScreen

const styles = StyleSheet.create({})
