import React, { useState, useContext } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Snackbar } from 'react-native-paper'
import {
    Text,
    SafeAreaView,
    Container,
    FormContainer,
    Button,
    TextInput,
    Dropdown,
} from '../../components/FiplyComponents'
import { Formik } from 'formik'
import * as yup from 'yup'
import ProfileContext from '../../../api/context/profile/ProfileContext'
import DateTimePicker from '@react-native-community/datetimepicker'
import Header from '../../components/headers/Header'
import Colors from '../../../utils/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import moment from 'moment'

const EditAboutScreen = ({ navigation }) => {
    const { userInfo, updateProfile, loading, snackBarMessage, hideSnackBar } =
        useContext(ProfileContext)

    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState(false)
    const onChange = (event, selectedDate, callback) => {
        setShowDatePicker(Platform.OS === 'ios')
        if (selectedDate) {
            let stringDate = selectedDate.toLocaleDateString()
            callback(stringDate)
        }
    }

    const formSchema = yup.object({
        gender: yup.string().trim().min(2).nullable(),
        birthday: yup.string().trim().required('Birthday is required'),
        language: yup.string().trim().min(2).nullable(),
        mobile_no: yup.string().trim().min(2).nullable(),
        telephone_no: yup.string().trim().min(2).nullable(),
        website: yup.string().trim().min(2).nullable(),
        bio: yup.string().trim().min(2).nullable(),
    })

    return (
        <SafeAreaView flex statusBarColor={Colors.white}>
            <Header
                title={'Edit About'}
                style={{ backgroundColor: Colors.white }}
                onBackPress={() => navigation.pop()}
            />
            <Formik
                initialValues={{
                    gender: userInfo.gender,
                    birthday: userInfo.birthday,
                    language: userInfo.language,
                    mobile_no: userInfo.mobile_no,
                    telephone_no: userInfo.telephone_no,
                    website: userInfo.website,
                    bio: userInfo.bio,
                }}
                onSubmit={(values) => {
                    updateProfile(values)
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
                    <FormContainer>
                        <View style={styles.container}>
                            <Text weight="medium" size={16}>
                                Basic Information
                            </Text>
                            <TextInput
                                label={'Bio'}
                                value={values.bio}
                                onChangeText={handleChange('bio')}
                                onBlur={handleBlur('bio')}
                                error={touched.bio && errors.bio ? true : false}
                                errorMsg={touched.bio && errors.bio ? errors.bio : ''}
                                mode="flat"
                            />
                            <Dropdown
                                label={'Gender'}
                                value={values.gender}
                                onSubmit={handleChange('gender')}
                                onBlur={handleBlur('gender')}
                                error={touched.gender && errors.gender ? true : false}
                                errorMsg={touched.gender && errors.gender ? errors.gender : ''}
                                data={[
                                    { id: 1, name: 'Male' },
                                    { id: 2, name: 'Female' },
                                ]}
                                noTextInput
                                mode="flat"
                                dropdownIcon
                            />
                            <TouchableOpacity
                                activeOpacity={0.6}
                                onPress={() => {
                                    setShowDatePicker(true)
                                    setDate(new Date(userInfo.birthday))
                                }}
                            >
                                <TextInput
                                    label="Birthday"
                                    style={{ marginTop: 5 }}
                                    mode="flat"
                                    value={values.birthday}
                                    onChangeText={handleChange('birthday')}
                                    onBlur={handleBlur('birthday')}
                                    error={touched.birthday && errors.birthday ? true : false}
                                    errorMsg={
                                        touched.birthday && errors.birthday ? errors.birthday : ''
                                    }
                                    nonEditable
                                />
                            </TouchableOpacity>
                            <Dropdown
                                label={'Language'}
                                data={[
                                    { id: 1, name: 'English' },
                                    { id: 2, name: 'Filipino' },
                                ]}
                                value={values.language}
                                onChangeText={handleChange('language')}
                                onBlur={handleBlur('language')}
                                onSubmit={handleChange('language')}
                                error={touched.language && errors.language ? true : false}
                                errorMsg={
                                    touched.language && errors.language ? errors.language : ''
                                }
                                noTextInput
                                mode="flat"
                                dropdownIcon
                            />
                        </View>

                        <View style={styles.container} behavior="position">
                            <Text weight="medium" size={16}>
                                Contact Information
                            </Text>
                            <TextInput
                                label={'Mobile Number'}
                                value={values.mobile_no}
                                onChangeText={handleChange('mobile_no')}
                                onBlur={handleBlur('mobile_no')}
                                error={touched.mobile_no && errors.mobile_no ? true : false}
                                errorMsg={
                                    touched.mobile_no && errors.mobile_no ? errors.mobile_no : ''
                                }
                                mode="flat"
                            />
                            <TextInput
                                label={'Telephone Number'}
                                value={values.telephone_no}
                                onChangeText={handleChange('telephone_no')}
                                onBlur={handleBlur('telephone_no')}
                                error={touched.telephone_no && errors.telephone_no ? true : false}
                                errorMsg={
                                    touched.telephone_no && errors.telephone_no
                                        ? errors.telephone_no
                                        : ''
                                }
                                mode="flat"
                            />
                            <TextInput
                                label={'Website'}
                                value={values.website}
                                onChangeText={handleChange('website')}
                                onBlur={handleBlur('website')}
                                error={touched.website && errors.website ? true : false}
                                errorMsg={touched.website && errors.website ? errors.website : ''}
                                mode="flat"
                            />
                        </View>

                        <Button
                            title="Save"
                            disabled={loading}
                            loading={loading}
                            onPress={handleSubmit}
                            style={{ marginTop: 10, zIndex: 1 }}
                        />
                        {showDatePicker && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                display="spinner"
                                onChange={(e, val) =>
                                    onChange(e, val, (strVal) => {
                                        setFieldValue(
                                            'birthday',
                                            moment(strVal, 'MM/DD/YYYY').format('LL')
                                        )
                                    })
                                }
                            />
                        )}
                    </FormContainer>
                )}
            </Formik>

            <Snackbar
                visible={snackBarMessage ? true : false}
                onDismiss={() => hideSnackBar()}
                duration={3000}
                style={{ backgroundColor: Colors.black, zIndex: 99, elevation: 10 }}
            >
                <Text color={Colors.white}>{snackBarMessage}</Text>
            </Snackbar>
        </SafeAreaView>
    )
}

export default EditAboutScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        marginVertical: 5,
        padding: 20,
    },
})
