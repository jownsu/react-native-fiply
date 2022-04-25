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
import useLocation from '../../../../api/hooks/useLocation'
import usePositionLevel from '../../../../api/hooks/usePositionLevel'
import useJobCategory from '../../../../api/hooks/useJobCategory'

import { Formik } from 'formik'
import * as yup from 'yup'

const ApplicantSetup = ({ navigation }) => {
    const { locations, loading: locationLoading, getLocations } = useLocation()
    const { positionLevels, loading: positionLevelsLoading, getPositionLevels } = usePositionLevel()
    const { jobCategories, loading: jobCategoriesLoading, getJobCategories } = useJobCategory()

    const { setApplicantPreference, getAllSignUpData } = useContext(SignUpContext)
    const { verify, loading } = useContext(AuthContext)

    const formSchema = yup.object({
        level_of_experience: yup.string().min(2).trim().required('Level of experience required'),
        field_of_expertise: yup.string().min(2).trim().required('Field of expertise required'),
        location: yup.string().trim().min(2).required('Location is required'),
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
                        level_of_experience: '',
                        field_of_expertise: '',
                        location: '',
                    }}
                    validationSchema={formSchema}
                    onSubmit={(values) => {
                        setApplicantPreference(values)
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
                                label={'Level of experience'}
                                value={values.level_of_experience}
                                data={positionLevels}
                                onTextInputPress={() => getPositionLevels()}
                                isLoading={positionLevelsLoading}
                                style={{ marginBottom: 5 }}
                                onSubmit={(text) => setFieldValue('level_of_experience', text)}
                                noTextInput
                                dropdownIcon
                                error={
                                    touched.level_of_experience && errors.level_of_experience
                                        ? true
                                        : false
                                }
                                errorMsg={
                                    touched.level_of_experience && errors.level_of_experience
                                        ? errors.level_of_experience
                                        : ''
                                }
                            />

                            <Dropdown
                                label={'Field of expertise'}
                                value={values.field_of_expertise}
                                data={jobCategories}
                                onTextInputPress={() => getJobCategories()}
                                isLoading={jobCategoriesLoading}
                                onChangeTextDelay={(text) => getJobCategories(text)}
                                style={{ marginBottom: 5 }}
                                onSubmit={(text) => setFieldValue('field_of_expertise', text)}
                                error={
                                    touched.field_of_expertise && errors.field_of_expertise
                                        ? true
                                        : false
                                }
                                errorMsg={
                                    touched.field_of_expertise && errors.field_of_expertise
                                        ? errors.field_of_expertise
                                        : ''
                                }
                            />

                            <Dropdown
                                label={'Location'}
                                value={values.location}
                                data={locations}
                                onTextInputPress={() => getLocations()}
                                isLoading={locationLoading}
                                onChangeTextDelay={(text) => getLocations(text)}
                                style={{ marginBottom: 5 }}
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
                                    values.level_of_experience &&
                                    values.field_of_expertise &&
                                    values.location &&
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
        </SafeAreaView>
    )
}

export default ApplicantSetup

const styles = StyleSheet.create({})
