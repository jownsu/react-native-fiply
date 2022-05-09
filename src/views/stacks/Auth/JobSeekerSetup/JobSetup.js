import React, { useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import {
    SafeAreaView,
    Container,
    Text,
    FiplyLogo,
    WaveHeader,
    Button,
    Dropdown,
} from '../../../components/FiplyComponents'
import Back from '../../../components/Back'
import useJobTitle from '../../../../api/hooks/useJobTitle'
import useEmploymentType from '../../../../api/hooks/useEmploymentType'
import useLocation from '../../../../api/hooks/useLocation'
import SignUpContext from '../../../../api/context/auth/SignUpContext'
import AuthContext from '../../../../api/context/auth/AuthContext'
import { Formik } from 'formik'
import * as yup from 'yup'

const JobSetup = ({ navigation }) => {
    const { jobTitles, loading: jobTitleLoading, getJobTitles } = useJobTitle()
    const {
        employmentTypes,
        loading: employmentTypeLoading,
        getEmploymentTypes,
    } = useEmploymentType()
    const { locations, loading: locationLoading, getLocations } = useLocation()

    const { setJobPreference, getAllSignUpData } = useContext(SignUpContext)
    const { verify, loading } = useContext(AuthContext)

    useEffect(() => {
        getJobTitles()
        getEmploymentTypes()
        getLocations()
    }, [])

    const formSchema = yup.object({
        job_title: yup.string().trim().min(2).required('Job title is required'),
        location: yup.string().trim().min(2).required('Location is required'),
        employment_type: yup.string().min(2).trim().required('Employment type is required'),
    })

    return (
        <SafeAreaView flex>
            <WaveHeader waveimg={require('../../../../assets/img/waves/4.png')} />
            <Container center padding={20}>
                <FiplyLogo />
                <Text center size={17} style={{ marginVertical: 25 }}>
                    What kind of job are you looking for?
                </Text>

                <Formik
                    initialValues={{
                        job_title: '',
                        location: '',
                        employment_type: '',
                    }}
                    validationSchema={formSchema}
                    onSubmit={(values) => {
                        setJobPreference(values)
                        const signupData = getAllSignUpData()
                        verify(signupData, () => navigation.navigate('ConfirmEmailScreen'))
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
                                label={'Job Title'}
                                value={values.job_title}
                                data={jobTitles}
                                style={{ marginBottom: 5 }}
                                isLoading={jobTitleLoading}
                                onSubmit={(text) => setFieldValue('job_title', text)}
                                error={touched.job_title && errors.job_title ? true : false}
                                errorMsg={
                                    touched.job_title && errors.job_title ? errors.job_title : ''
                                }
                            />
                            <Dropdown
                                label={'Location'}
                                value={values.location}
                                data={locations}
                                style={{ marginBottom: 5 }}
                                isLoading={locationLoading}
                                onSubmit={(text) => setFieldValue('location', text)}
                                error={touched.location && errors.location ? true : false}
                                errorMsg={
                                    touched.location && errors.location ? errors.location : ''
                                }
                            />
                            <Dropdown
                                label={'Employment Type'}
                                value={values.employment_type}
                                data={employmentTypes}
                                style={{ marginBottom: 5 }}
                                onSubmit={(text) => setFieldValue('employment_type', text)}
                                isLoading={employmentTypeLoading}
                                noTextInput
                                dropdownIcon
                                error={
                                    touched.employment_type && errors.employment_type ? true : false
                                }
                                errorMsg={
                                    touched.employment_type && errors.employment_type
                                        ? errors.employment_type
                                        : ''
                                }
                            />

                            <Button
                                title="Done"
                                style={{ marginVertical: 25 }}
                                disabled={
                                    values.job_title &&
                                    values.location &&
                                    values.employment_type &&
                                    !loading
                                        ? false
                                        : true
                                }
                                loading={loading}
                                onPress={handleSubmit}
                            />
                        </View>
                    )}
                </Formik>
            </Container>
            <Back onPress={() => navigation.pop()} />
        </SafeAreaView>
    )
}

export default JobSetup

const styles = StyleSheet.create({})
