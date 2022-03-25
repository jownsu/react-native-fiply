import React, { useContext, useState } from 'react'
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
import SignUpContext from '../../../../api/context/auth/SignUpContext'
import StepIndicator from '../../../components/StepIndicator'
import useJobTitle from '../../../../api/hooks/useJobTitle'
import useEmploymentType from '../../../../api/hooks/useEmploymentType'
import useLocation from '../../../../api/hooks/useLocation'

const StepOne = ({ navigation }) => {
    const { jobTitles, loading: jobTitleLoading, getJobTitles } = useJobTitle()
    const {
        employmentTypes,
        loading: employmentTypeLoading,
        getEmploymentTypes,
    } = useEmploymentType()
    const { setExperience } = useContext(SignUpContext)
    const { locations, loading: locationLoading, getLocations } = useLocation()

    const experienceSchema = yup.object({
        job_title: yup.string().trim().required('Most recent job is required').min(2),
        employment_type: yup.string().trim().required('Employment type is required').min(5),
        company: yup.string().trim().required('Recent company is required').min(5),
        location: yup.string().trim().required('Location is required').min(5),
    })

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
                        job_title: '',
                        employment_type: '',
                        company: '',
                        location: '',
                    }}
                    validationSchema={experienceSchema}
                    onSubmit={(values) => {
                        setExperience(values)
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
                                label={'Most recent job'}
                                value={values.job_title}
                                onChangeTextDelay={(text) => getJobTitles(text)}
                                onTextInputPress={() => getJobTitles()}
                                isLoading={jobTitleLoading}
                                onSubmit={(text) => setFieldValue('job_title', text)}
                                data={jobTitles}
                                error={touched.job_title && errors.job_title ? true : false}
                                errorMsg={
                                    touched.job_title && errors.job_title ? errors.job_title : ''
                                }
                                style={{ marginBottom: 5 }}
                            />

                            <Dropdown
                                label={'Employment Type'}
                                value={values.employment_type}
                                data={employmentTypes}
                                isLoading={employmentTypeLoading}
                                onChangeTextDelay={(text) => getEmploymentTypes(text)}
                                onTextInputPress={() => getEmploymentTypes()}
                                onSubmit={(text) => setFieldValue('employment_type', text)}
                                error={
                                    touched.employment_type && errors.employment_type ? true : false
                                }
                                errorMsg={
                                    touched.employment_type && errors.employment_type
                                        ? errors.employment_type
                                        : ''
                                }
                                style={{ marginBottom: 5 }}
                                noTextInput
                                dropdownIcon
                            />

                            <TextInput
                                label={'Most recent company'}
                                value={values.company}
                                onChangeText={handleChange('company')}
                                onSubmit={(text) => setFieldValue('company', text)}
                                onBlur={handleBlur('company')}
                                error={touched.company && errors.company ? true : false}
                                errorMsg={touched.company && errors.company ? errors.company : ''}
                                style={{ marginBottom: 5 }}
                            />

                            {/* <Dropdown
                                label={'Most recent company'}
                                value={values.recentCompany}
                                data={companyList}
                                onChangeTextDelay={() => console.log('API CALLED')}
                                onSubmit={(text) => setFieldValue('recentCompany', text)}
                                error={touched.recentCompany && errors.recentCompany ? true : false}
                                errorMsg={
                                    touched.recentCompany && errors.recentCompany
                                        ? errors.recentCompany
                                        : ''
                                }
                                style={{ marginBottom: 5 }}
                            /> */}

                            <Dropdown
                                label={'Location'}
                                value={values.location}
                                data={locations}
                                isLoading={locationLoading}
                                onChangeTextDelay={(text) => getLocations(text)}
                                onTextInputPress={() => getLocations()}
                                onSubmit={(text) => setFieldValue('location', text)}
                                error={touched.location && errors.location ? true : false}
                                errorMsg={
                                    touched.location && errors.location ? errors.location : ''
                                }
                            />

                            <SecondaryButton
                                title="I'm a student"
                                onPress={() => navigation.push('StepOneStudent')}
                                style={{ marginVertical: 20 }}
                            />

                            <Button
                                title="Continue"
                                onPress={handleSubmit}
                                disabled={
                                    values.job_title &&
                                    values.employment_type &&
                                    values.company &&
                                    values.location
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
