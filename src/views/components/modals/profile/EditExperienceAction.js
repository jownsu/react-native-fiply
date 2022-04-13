import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Dialog, Portal, Avatar } from 'react-native-paper'
import { Text, TextInput, Button, SecondaryButton, Dropdown } from '../../FiplyComponents'
import Colors from '../../../../utils/Colors'
import moment from 'moment'
import { Formik } from 'formik'
import * as yup from 'yup'

import useJobTitle from '../../../../api/hooks/useJobTitle'
import useEmploymentType from '../../../../api/hooks/useEmploymentType'
import useLocation from '../../../../api/hooks/useLocation'
import DateTimePicker from '@react-native-community/datetimepicker'

const EditExperienceAction = ({
    visible = false,
    type = 'add',
    data = {},
    onDismiss = () => {},
    onUpdatePress = () => {},
    onAddPress = () => {},
    loading = false,
}) => {
    const { jobTitles, loading: jobTitleLoading, getJobTitles } = useJobTitle()
    const {
        employmentTypes,
        loading: employmentTypeLoading,
        getEmploymentTypes,
    } = useEmploymentType()
    const { locations, loading: locationLoading, getLocations } = useLocation()

    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState({ modal: false, type: '' })
    const onChange = (event, selectedDate, callback) => {
        setShowDatePicker(Platform.OS === 'ios')
        if (selectedDate) {
            let stringDate = selectedDate.toLocaleDateString()
            callback(stringDate)
        }
    }

    const formSchema = yup.object({
        company: yup.string().trim().min(2),
        location: yup.string().trim().min(2),
        job_title: yup.string().trim().min(2),
        employment_type: yup.string().trim().min(2),
        starting_date: yup.string().trim().min(2),
        completion_date: yup.string().trim().min(2),
    })

    return (
        <View>
            <Portal>
                <Dialog style={styles.dialogContainer} visible={visible} onDismiss={onDismiss}>
                    <Formik
                        initialValues={{
                            id: data.id,
                            company: data.company,
                            location: data.location,
                            job_title: data.job_title,
                            employment_type: data.employment_type,
                            starting_date: data.starting_date,
                            completion_date: data.completion_date,
                        }}
                        onSubmit={(values) => {
                            type == 'add' ? onAddPress(values) : onUpdatePress(values)
                        }}
                        validationSchema={formSchema}
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
                                <TextInput
                                    label="Company"
                                    value={values.company}
                                    onChangeText={handleChange('company')}
                                    onBlur={handleBlur('company')}
                                    error={touched.company && errors.company ? true : false}
                                    errorMsg={
                                        touched.company && errors.company ? errors.company : ''
                                    }
                                    mode="flat"
                                />
                                <Dropdown
                                    data={locations}
                                    isLoading={locationLoading}
                                    onChangeTextDelay={(text) => getLocations(text)}
                                    onTextInputPress={() => {
                                        if (locations.length == 0) {
                                            getLocations()
                                        }
                                    }}
                                    onSubmit={handleChange('location')}
                                    label="Location"
                                    value={values.location}
                                    onBlur={handleBlur('location')}
                                    error={touched.location && errors.location ? true : false}
                                    errorMsg={
                                        touched.location && errors.location ? errors.location : ''
                                    }
                                    mode="flat"
                                />
                                <Dropdown
                                    data={jobTitles}
                                    isLoading={jobTitleLoading}
                                    onChangeTextDelay={(text) => getJobTitles(text)}
                                    onTextInputPress={() => {
                                        if (jobTitles.length == 0) {
                                            getJobTitles()
                                        }
                                    }}
                                    onSubmit={handleChange('job_title')}
                                    label="Job Title"
                                    value={values.job_title}
                                    onBlur={handleBlur('job_title')}
                                    error={touched.job_title && errors.job_title ? true : false}
                                    errorMsg={
                                        touched.job_title && errors.job_title
                                            ? errors.job_title
                                            : ''
                                    }
                                    mode="flat"
                                />
                                <Dropdown
                                    data={employmentTypes}
                                    isLoading={employmentTypeLoading}
                                    onTextInputPress={() => {
                                        if (employmentTypes.length == 0) {
                                            getEmploymentTypes()
                                        }
                                    }}
                                    onSubmit={handleChange('employment_type')}
                                    label="Employment Type"
                                    value={values.employment_type}
                                    onChangeText={handleChange('employment_type')}
                                    onBlur={handleBlur('employment_type')}
                                    error={
                                        touched.employment_type && errors.employment_type
                                            ? true
                                            : false
                                    }
                                    errorMsg={
                                        touched.employment_type && errors.employment_type
                                            ? errors.employment_type
                                            : ''
                                    }
                                    dropdownIcon
                                    noTextInput
                                    mode="flat"
                                />
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={() => {
                                        setShowDatePicker({ modal: true, type: 'starting_date' })
                                        if (values.starting_date) {
                                            setDate(new Date(values.starting_date))
                                        }
                                    }}
                                >
                                    <TextInput
                                        label="Starting Date"
                                        value={values.starting_date}
                                        onChangeText={handleChange('starting_date')}
                                        onBlur={handleBlur('starting_date')}
                                        error={
                                            touched.starting_date && errors.starting_date
                                                ? true
                                                : false
                                        }
                                        errorMsg={
                                            touched.starting_date && errors.starting_date
                                                ? errors.starting_date
                                                : ''
                                        }
                                        nonEditable
                                        mode="flat"
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    onPress={() => {
                                        setShowDatePicker({ modal: true, type: 'completion_date' })
                                        if (values.completion_date) {
                                            setDate(new Date(values.completion_date))
                                        }
                                    }}
                                >
                                    <TextInput
                                        label="Completion Date"
                                        value={values.completion_date}
                                        onChangeText={handleChange('completion_date')}
                                        onBlur={handleBlur('completion_date')}
                                        error={
                                            touched.completion_date && errors.completion_date
                                                ? true
                                                : false
                                        }
                                        errorMsg={
                                            touched.completion_date && errors.completion_date
                                                ? errors.completion_date
                                                : ''
                                        }
                                        nonEditable
                                        mode="flat"
                                    />
                                </TouchableOpacity>

                                {showDatePicker.modal && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        display="default"
                                        onChange={(e, val) =>
                                            onChange(e, val, (strVal) => {
                                                if (showDatePicker.type == 'starting_date') {
                                                    setFieldValue(
                                                        'starting_date',
                                                        moment(strVal, 'MM/DD/YYYY').format('LL')
                                                    )
                                                } else {
                                                    setFieldValue(
                                                        'completion_date',
                                                        moment(strVal, 'MM/DD/YYYY').format('LL')
                                                    )
                                                }
                                            })
                                        }
                                        // onChange={(e, val) =>
                                        //     onChange(e, val, (strVal) => {
                                        //         setFieldValue('birthday', strVal)
                                        //     })
                                        // }
                                    />
                                )}
                                <SecondaryButton
                                    title={type == 'add' ? 'Add' : 'Update'}
                                    loading={loading}
                                    disabled={loading}
                                    onPress={handleSubmit}
                                    style={{ marginVertical: 15, borderWidth: 0 }}
                                />
                            </>
                        )}
                    </Formik>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    dialogContainer: {
        borderRadius: 10,
        paddingHorizontal: 15,
    },
    headerContainer: {
        alignItems: 'center',
        paddingVertical: 25,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderColor: Colors.light,
    },
})

export default EditExperienceAction
