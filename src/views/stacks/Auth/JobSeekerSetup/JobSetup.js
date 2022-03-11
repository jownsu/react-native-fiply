import React, { useContext } from 'react'
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
import SignUpContext from '../../../../api/context/auth/SignUpContext'
import AuthContext from '../../../../api/context/auth/AuthContext'
import { Formik } from 'formik'
import * as yup from 'yup'

const JobSetup = ({ navigation }) => {
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
    const jobLocationList = [
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
    const employmentTypeList = [
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

    const { setJobPreference, getAllSignUpData } = useContext(SignUpContext)
    const { verify, loading } = useContext(AuthContext)

    const formSchema = yup.object({
        job_title: yup.string().trim().required('Job title is required'),
        location: yup.string().trim().required('Location is required'),
        employment_type: yup.string().trim().required('Employment type is required'),
    })

    return (
        <SafeAreaView>
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
                                data={jobTitleList}
                                style={{ marginBottom: 5 }}
                                onChangeTextDelay={() => console.log('API CALLED')}
                                onSubmit={(text) => setFieldValue('job_title', text)}
                                error={touched.job_title && errors.job_title ? true : false}
                                errorMsg={
                                    touched.job_title && errors.job_title ? errors.job_title : ''
                                }
                            />
                            <Dropdown
                                label={'Location'}
                                value={values.location}
                                data={jobLocationList}
                                style={{ marginBottom: 5 }}
                                onChangeTextDelay={() => console.log('API CALLED')}
                                onSubmit={(text) => setFieldValue('location', text)}
                                error={touched.location && errors.location ? true : false}
                                errorMsg={
                                    touched.location && errors.location ? errors.location : ''
                                }
                            />
                            <Dropdown
                                label={'Employment Type'}
                                value={values.employment_type}
                                data={employmentTypeList}
                                style={{ marginBottom: 5 }}
                                onSubmit={(text) => setFieldValue('employment_type', text)}
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
                                    values.job_title && values.location && values.employment_type
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
        </SafeAreaView>
    )
}

export default JobSetup

const styles = StyleSheet.create({})
