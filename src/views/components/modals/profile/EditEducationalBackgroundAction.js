import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Dialog, Portal, Avatar } from 'react-native-paper'
import { Text, TextInput, Dropdown, Button, SecondaryButton } from '../../FiplyComponents'
import Colors from '../../../../utils/Colors'

import moment from 'moment'
import { Formik } from 'formik'
import * as yup from 'yup'

import useUniversity from '../../../../api/hooks/useUniversity'
import useDegree from '../../../../api/hooks/useDegree'
import DateTimePicker from '@react-native-community/datetimepicker'
import useDegreeCategory from '../../../../api/hooks/useDegreeCategory'

const EditEducationalBackgroundAction = ({
    visible = false,
    data = {},
    type = '',
    onDismiss = () => {},
    onUpdatePress = () => {},
    onAddPress = () => {},
    loading = false,
}) => {
    const { universities, getUniversities, loading: universityLoading } = useUniversity()
    const { degrees, getDegrees, loading: degreeLoading, getCategory } = useDegree()
    const {
        degreeCategories,
        getDegreeCategories,
        loading: degreeCategoryLoading,
    } = useDegreeCategory()

    useEffect(() => {
        getUniversities()
        getDegrees()
        getDegreeCategories()
    }, [])

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
        university: yup.string().trim().min(2),
        degree: yup.string().trim().min(2),
        field_of_study: yup.string().trim().min(2),
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
                            university: data.university,
                            degree: data.degree,
                            field_of_study: data.field_of_study,
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
                                <Dropdown
                                    data={universities}
                                    isLoading={universityLoading}
                                    onSubmit={handleChange('university')}
                                    label="University"
                                    value={values.university}
                                    onBlur={handleBlur('university')}
                                    error={touched.university && errors.university ? true : false}
                                    errorMsg={
                                        touched.university && errors.university
                                            ? errors.university
                                            : ''
                                    }
                                    mode="flat"
                                />
                                <Dropdown
                                    data={degrees}
                                    isLoading={degreeLoading}
                                    value={values.degree}
                                    onBlur={handleBlur('degree')}
                                    error={touched.degree && errors.degreee ? true : false}
                                    errorMsg={touched.degree && errors.degree ? errors.degree : ''}
                                    onSubmit={(text, id) => {
                                        getCategory(id, (degreeCategory) => {
                                            setFieldValue('field_of_study', degreeCategory)
                                        })
                                        setFieldValue('degree', text)
                                    }}
                                    label="Degree"
                                    mode="flat"
                                />
                                <Dropdown
                                    data={degreeCategories}
                                    isLoading={degreeCategoryLoading}
                                    value={values.field_of_study}
                                    onBlur={handleBlur('field_of_study')}
                                    error={
                                        touched.field_of_study && errors.field_of_study
                                            ? true
                                            : false
                                    }
                                    errorMsg={
                                        touched.field_of_study && errors.field_of_study
                                            ? errors.field_of_study
                                            : ''
                                    }
                                    onSubmit={handleChange('field_of_study')}
                                    label="Field of study"
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
                                        display="spinner"
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
                                    onPress={handleSubmit}
                                    loading={loading}
                                    disabled={loading}
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

export default EditEducationalBackgroundAction
