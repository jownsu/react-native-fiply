import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import {
    Text,
    SafeAreaView,
    Container,
    TextInput,
    Dropdown,
    Button,
    FiplyLogo,
} from '../components/FiplyComponents'

import useJob from '../../api/hooks/useJob'
import useJobTitle from '../../api/hooks/useJobTitle'
import useEmploymentType from '../../api/hooks/useEmploymentType'
import useLocation from '../../api/hooks/useLocation'
import usePositionLevel from '../../api/hooks/usePositionLevel'
import { Formik } from 'formik'
import * as yup from 'yup'
import Header from '../components/headers/Header'
import Colors from '../../utils/Colors'

const CreateJobScreen = ({ navigation }) => {
    const { jobTitles, loading: jobTitleLoading, getJobTitles } = useJobTitle()
    const {
        employmentTypes,
        loading: employmentTypeLoading,
        getEmploymentTypes,
    } = useEmploymentType()
    const { locations, loading: locationLoading, getLocations } = useLocation()
    const { positionLevels, loading: positionLevelsLoading, getPositionLevels } = usePositionLevel()

    const { createJob, loading: createJobLoading } = useJob()

    const formSchema = yup.object({
        title: yup.string().trim().required('Job Title is required'),
        employment_type: yup.string().trim().required('Job Type is required'),
        position_level: yup.string().trim().required('Position Level is required'),
        company: yup.string().trim().required('Company is requried'),
        location: yup.string().trim().required('Location is required'),
        job_responsibilities: yup.string().trim().required('Job Responsibilities is required'),
        qualifications: yup.string().trim().required('Qualifications is required'),
    })

    return (
        <SafeAreaView statusBarColor={Colors.white} flex>
            <Header
                title="Create a Job"
                centerTitle
                style={{ backgroundColor: Colors.white, marginBottom: 20 }}
                onBackPress={() => navigation.pop()}
            />
            <ScrollView style={{ flex: 1 }}>
                <Container padding={10}>
                    <Formik
                        initialValues={{
                            title: '',
                            employment_type: '',
                            position_level: '',
                            company: '',
                            location: '',
                            job_responsibilities: '',
                            qualifications: '',
                        }}
                        validationSchema={formSchema}
                        onSubmit={(values) => {
                            createJob(values, () => {
                                navigation.pop()
                                alert('Job created!')
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
                                <Dropdown
                                    label="Job Title"
                                    value={values.title}
                                    data={jobTitles}
                                    style={{ marginBottom: 5 }}
                                    onChangeTextDelay={(text) => getJobTitles(text)}
                                    onSubmit={(text) => setFieldValue('title', text)}
                                    error={touched.title && errors.title ? true : false}
                                    isLoading={jobTitleLoading}
                                    onTextInputPress={() => getJobTitles()}
                                    errorMsg={touched.title && errors.title ? errors.title : ''}
                                />
                                <Dropdown
                                    label={'Employment Type'}
                                    value={values.employment_type}
                                    data={employmentTypes}
                                    style={{ marginBottom: 5 }}
                                    onSubmit={(text) => setFieldValue('employment_type', text)}
                                    error={
                                        touched.employment_type && errors.employment_type
                                            ? true
                                            : false
                                    }
                                    isLoading={employmentTypeLoading}
                                    errorMsg={
                                        touched.employment_type && errors.employment_type
                                            ? errors.employment_type
                                            : ''
                                    }
                                    onTextInputPress={() => getEmploymentTypes()}
                                    noTextInput
                                    dropdownIcon
                                />
                                <Dropdown
                                    label={'Position Level'}
                                    value={values.position_level}
                                    data={positionLevels}
                                    style={{ marginBottom: 5 }}
                                    onSubmit={(text) => setFieldValue('position_level', text)}
                                    error={
                                        touched.position_level && errors.position_level
                                            ? true
                                            : false
                                    }
                                    isLoading={positionLevelsLoading}
                                    errorMsg={
                                        touched.position_level && errors.position_level
                                            ? errors.position_level
                                            : ''
                                    }
                                    onTextInputPress={() => getPositionLevels()}
                                    noTextInput
                                    dropdownIcon
                                />
                                {/* <Dropdown
                                label={'Company'}
                                value={values.company}
                                data={companyList}
                                style={{ marginBottom: 5 }}
                                onSubmit={(text) => setFieldValue('company', text)}
                                error={touched.company && errors.company ? true : false}
                                errorMsg={touched.company && errors.company ? errors.company : ''}
                            /> */}
                                <TextInput
                                    label="Company"
                                    multiline
                                    style={{ marginBottom: 5 }}
                                    value={values.company}
                                    onChangeText={handleChange('company')}
                                    onBlur={handleBlur('company')}
                                    error={touched.company && errors.company ? true : false}
                                    errorMsg={
                                        touched.company && errors.company ? errors.company : ''
                                    }
                                />
                                <Dropdown
                                    label={'Location'}
                                    value={values.location}
                                    data={locations}
                                    style={{ marginBottom: 5 }}
                                    onChangeTextDelay={(text) => getLocations(text)}
                                    onSubmit={(text) => setFieldValue('location', text)}
                                    error={touched.location && errors.location ? true : false}
                                    isLoading={locationLoading}
                                    onTextInputPress={() => getLocations()}
                                    errorMsg={
                                        touched.location && errors.location ? errors.location : ''
                                    }
                                />
                                <TextInput
                                    label="Job Responsibilities"
                                    multiline
                                    style={{ maxHeight: 150, marginBottom: 5 }}
                                    value={values.job_responsibilities}
                                    onChangeText={handleChange('job_responsibilities')}
                                    onBlur={handleBlur('job_responsibilities')}
                                    error={
                                        touched.job_responsibilities && errors.job_responsibilities
                                            ? true
                                            : false
                                    }
                                    errorMsg={
                                        touched.job_responsibilities && errors.job_responsibilities
                                            ? errors.job_responsibilities
                                            : ''
                                    }
                                />
                                <TextInput
                                    label="Qualifications"
                                    multiline
                                    style={{ maxHeight: 150, marginBottom: 5 }}
                                    value={values.qualifications}
                                    onChangeText={handleChange('qualifications')}
                                    onBlur={handleBlur('qualifications')}
                                    error={
                                        touched.qualifications && errors.qualifications
                                            ? true
                                            : false
                                    }
                                    errorMsg={
                                        touched.qualifications && errors.qualifications
                                            ? errors.qualifications
                                            : ''
                                    }
                                />

                                <Button
                                    title="Submit"
                                    style={{ marginVertical: 35 }}
                                    onPress={handleSubmit}
                                    disabled={
                                        values.title &&
                                        values.employment_type &&
                                        values.company &&
                                        values.location &&
                                        values.job_responsibilities &&
                                        values.qualifications
                                            ? false
                                            : true
                                    }
                                    loading={createJobLoading}
                                />
                            </View>
                        )}
                    </Formik>

                    <FiplyLogo style={{ flex: 1 }} textColor={Colors.secondary} />
                </Container>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreateJobScreen

const styles = StyleSheet.create({})
