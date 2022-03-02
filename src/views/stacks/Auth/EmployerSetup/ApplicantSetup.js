import React from 'react'
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
import { Formik } from 'formik'
import * as yup from 'yup'

const ApplicantSetup = ({ navigation }) => {
    const levelOfExperienceList = [
        {
            id: '1',
            name: 'Entry Level',
        },
        {
            id: '2',
            name: 'Intermediate',
        },
        {
            id: '3',
            name: 'Mid Level',
        },
        {
            id: '4',
            name: 'Senior Level',
        },
    ]
    const fieldOfExpertiseList = [
        {
            id: '1',
            name: 'Business and Entrepreneurship',
        },
        {
            id: '2',
            name: 'Creativity and Aesthetics',
        },
        {
            id: '3',
            name: 'Math, Data and Computing',
        },
        {
            id: '4',
            name: 'Technology and Realization',
        },
        {
            id: '5',
            name: 'User and Society',
        },
    ]
    const locationList = [
        {
            id: '1',
            name: 'Cavite',
        },
        {
            id: '2',
            name: 'Quezon City',
        },
        {
            id: '3',
            name: 'Caloocan City',
        },
    ]

    const formSchema = yup.object({
        levelOfExperience: yup.string().trim().required('Level of experience required'),
        fieldOfExpertise: yup.string().trim().required('Field of expertise required'),
        location: yup.string().trim().required('Location is required'),
    })

    return (
        <SafeAreaView>
            <WaveHeader waveimg={require('../../../../assets/img/waves/4.png')} />
            <Container center padding={20}>
                <FiplyLogo />
                <Text center size={17} style={{ marginVertical: 25 }}>
                    What kind of applicant are you looking for?
                </Text>

                <Formik
                    initialValues={{
                        levelOfExperience: '',
                        fieldOfExpertise: '',
                        location: '',
                    }}
                    validationSchema={formSchema}
                    onSubmit={(values) => navigation.navigate('BasicUser')}
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
                                label={'Level of experience'}
                                value={values.levelOfExperience}
                                data={levelOfExperienceList}
                                style={{ marginBottom: 5 }}
                                onSubmit={(text) => setFieldValue('levelOfExperience', text)}
                                noTextInput
                                dropdownIcon
                                error={
                                    touched.levelOfExperience && errors.levelOfExperience
                                        ? true
                                        : false
                                }
                                errorMsg={
                                    touched.levelOfExperience && errors.levelOfExperience
                                        ? errors.levelOfExperience
                                        : ''
                                }
                            />

                            <Dropdown
                                label={'Field of expertise'}
                                value={values.fieldOfExpertise}
                                data={fieldOfExpertiseList}
                                style={{ marginBottom: 5 }}
                                onChangeTextDelay={() => console.log('API CALLED')}
                                onSubmit={(text) => setFieldValue('fieldOfExpertise', text)}
                                error={
                                    touched.fieldOfExpertise && errors.fieldOfExpertise
                                        ? true
                                        : false
                                }
                                errorMsg={
                                    touched.fieldOfExpertise && errors.fieldOfExpertise
                                        ? errors.fieldOfExpertise
                                        : ''
                                }
                            />

                            <Dropdown
                                label={'Location'}
                                value={values.location}
                                data={locationList}
                                style={{ marginBottom: 5 }}
                                onChangeTextDelay={() => console.log('API CALLED')}
                                onSubmit={(text) => setFieldValue('location', text)}
                                dropdownIcon
                                error={touched.location && errors.location ? true : false}
                                errorMsg={
                                    touched.location && errors.location ? errors.location : ''
                                }
                            />

                            <Button
                                title="Done"
                                style={{ marginVertical: 25 }}
                                disabled={
                                    values.levelOfExperience &&
                                    values.fieldOfExpertise &&
                                    values.location
                                        ? false
                                        : true
                                }
                                onPress={handleSubmit}
                            />
                        </View>
                    )}
                </Formik>
            </Container>
        </SafeAreaView>
    )
}

export default ApplicantSetup

const styles = StyleSheet.create({})
