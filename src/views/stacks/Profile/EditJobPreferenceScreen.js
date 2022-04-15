import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { Snackbar } from 'react-native-paper'
import {
    Text,
    SafeAreaView,
    Container,
    SecondaryButton,
    TextInput,
    Dropdown,
    Button,
} from '../../components/FiplyComponents'

import CardInfo from '../../components/profile/CardInfo'
import ProfileContext from '../../../api/context/profile/ProfileContext'
import Header from '../../components/headers/Header'
import Colors from '../../../utils/Colors'
import useEmploymentType from '../../../api/hooks/useEmploymentType'
import useJobTitle from '../../../api/hooks/useJobTitle'
import useLocation from '../../../api/hooks/useLocation'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import { Formik } from 'formik'
import * as yup from 'yup'

const EditJobPreferenceScreen = ({ navigation }) => {
    const {
        jobPreference,
        updateJobPreference,
        loading,
        getJobPreference,
        snackBarMessage,
        hideSnackBar,
    } = useContext(ProfileContext)
    const { getEmploymentTypes, employmentTypes, loading: empTypeLoading } = useEmploymentType()
    const { jobTitles, loading: jobTitleLoading, getJobTitles } = useJobTitle()
    const { locations, loading: locationLoading, getLocations } = useLocation()

    useEffect(() => {
        if (Object.keys(jobPreference).length === 0) {
            getJobPreference()
        }
        getEmploymentTypes()
    }, [])

    const formSchema = yup.object({
        job_title: yup.string().trim().min(2).required('Job Title is required'),
        location: yup.string().trim().required('Location is required'),
        employment_type: yup.string().trim().min(2).required('Employment Type is required'),
    })

    return (
        <SafeAreaView statusBarColor={Colors.white}>
            <Header
                title={'Edit Job Preference'}
                style={{ backgroundColor: Colors.white }}
                onBackPress={() => navigation.pop()}
            />
            <Formik
                enableReinitialize
                initialValues={{
                    job_title: jobPreference.job_title,
                    location: jobPreference.location,
                    employment_type: jobPreference.employment_type,
                }}
                validationSchema={formSchema}
                onSubmit={(values) => updateJobPreference(values)}
            >
                {({
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    setFieldValue,
                }) => (
                    <>
                        <View style={styles.container}>
                            <Text weight="medium" size={16}>
                                Job Preference
                            </Text>
                            <Dropdown
                                data={jobTitles}
                                label="Job Title"
                                value={values.job_title}
                                onTextInputPress={() => getJobTitles()}
                                onChangeTextDelay={(text) => getJobTitles(text)}
                                isLoading={jobTitleLoading}
                                onSubmit={handleChange('job_title')}
                                onBlur={handleBlur('job_title')}
                                error={touched.job_title && errors.job_title ? true : false}
                                errorMsg={
                                    touched.job_title && errors.job_title ? errors.job_title : ''
                                }
                                mode="flat"
                            />
                            <Dropdown
                                data={locations}
                                label="Location"
                                value={values.location}
                                onTextInputPress={() => getLocations()}
                                onChangeTextDelay={(text) => getLocations(text)}
                                isLoading={locationLoading}
                                onSubmit={handleChange('location')}
                                onBlur={handleBlur('location')}
                                error={touched.location && errors.location ? true : false}
                                errorMsg={
                                    touched.location && errors.location ? errors.location : ''
                                }
                                mode="flat"
                            />
                            <Dropdown
                                label="Employment Type"
                                value={values.employment_type}
                                onChangeText={handleChange('employment_type')}
                                onBlur={handleBlur('employment_type')}
                                error={
                                    touched.employment_type && errors.employment_type ? true : false
                                }
                                errorMsg={
                                    touched.employment_type && errors.employment_type
                                        ? errors.employment_type
                                        : ''
                                }
                                mode="flat"
                                onSubmit={handleChange('employment_type')}
                                data={employmentTypes}
                                isLoading={empTypeLoading}
                                noTextInput
                                dropdownIcon
                            />
                        </View>
                        <Button
                            title={'Save'}
                            onPress={handleSubmit}
                            disabled={loading}
                            loading={loading}
                        />
                    </>
                )}
            </Formik>
            <Snackbar
                visible={snackBarMessage ? true : false}
                onDismiss={() => hideSnackBar()}
                duration={3000}
                style={{ backgroundColor: Colors.black }}
            >
                <Text color={Colors.white}>{snackBarMessage}</Text>
            </Snackbar>
        </SafeAreaView>
    )
}

export default EditJobPreferenceScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        marginVertical: 5,
        paddingVertical: 25,
        paddingHorizontal: 10,
    },
    headerContainer: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
