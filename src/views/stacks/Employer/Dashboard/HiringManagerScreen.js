import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {
    Text,
    SafeAreaView,
    Container,
    TextInput,
    SecondaryButton,
    Button,
} from '../../../components/FiplyComponents'
import { TextInput as TxtInput, Avatar } from 'react-native-paper'
import Header from '../../../components/headers/Header'
import Colors from '../../../../utils/Colors'
import DashboardContext from '../../../../api/context/EMPLOYER/dashboard/DashboardContext'
import { Formik } from 'formik'
import * as yup from 'yup'
import usePickImage from '../../../../utils/usePIckImage'

const HiringManagerScreen = ({ navigation }) => {
    const { hiringManager, loading, updateHiringManager, deleteHiringManager } =
        useContext(DashboardContext)
    const [hidePassword, setHidePassword] = useState(true)
    const { pickImage, pickUri } = usePickImage()

    const formSchema = yup.object({
        firstname: yup.string().trim().min(2).required('Firstname is required'),
        lastname: yup.string().trim().min(2).required('Lastname is required'),
        email: yup.string().trim().min(2).email().required('Email is required'),
        contact_no: yup.string().trim().min(2).required('Contact Number is required'),
        code: yup.string().min(4).required('Pin Code is Required'),
    })

    const handeDeletePress = () => {
        deleteHiringManager(hiringManager.id, () => navigation.pop())
    }

    return (
        <SafeAreaView flex statusBarColor={Colors.white}>
            <Header
                title={hiringManager.name}
                onBackPress={() => navigation.pop()}
                style={{ backgroundColor: Colors.white }}
            />
            <ScrollView>
                <Container padding={20}>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            avatar: '',
                            firstname: hiringManager.firstname,
                            lastname: hiringManager.lastname,
                            email: hiringManager.email,
                            contact_no: hiringManager.contact_no,
                            code: hiringManager.code,
                        }}
                        validationSchema={formSchema}
                        onSubmit={(values) => {
                            updateHiringManager(hiringManager.id, values, () => {
                                navigation.pop()
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
                                <TouchableOpacity
                                    style={styles.uploadBtn}
                                    onPress={() => {
                                        pickImage([1, 1], (uri) => {
                                            setFieldValue('avatar', uri)
                                        })
                                    }}
                                >
                                    <Avatar.Image
                                        size={125}
                                        source={{ uri: pickUri ? pickUri : hiringManager.avatar }}
                                        backgroundColor={Colors.white}
                                    />
                                </TouchableOpacity>
                                <TextInput
                                    label="Firstname"
                                    value={values.firstname}
                                    onChangeText={handleChange('firstname')}
                                    onBlur={handleBlur('firstname')}
                                    error={touched.firstname && errors.firstname ? true : false}
                                    errorMsg={
                                        touched.firstname && errors.firstname
                                            ? errors.firstname
                                            : ''
                                    }
                                />
                                <TextInput
                                    label="Lastname"
                                    value={values.lastname}
                                    onChangeText={handleChange('lastname')}
                                    onBlur={handleBlur('lastname')}
                                    error={touched.lastname && errors.lastname ? true : false}
                                    errorMsg={
                                        touched.lastname && errors.lastname ? errors.lastname : ''
                                    }
                                />
                                <TextInput
                                    label="Email"
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    keyboardType="email-address"
                                    error={touched.email && errors.email ? true : false}
                                    errorMsg={touched.email && errors.email ? errors.email : ''}
                                />
                                <TextInput
                                    label="Contact Number"
                                    value={values.contact_no}
                                    onChangeText={handleChange('contact_no')}
                                    onBlur={handleBlur('contact_no')}
                                    keyboardType="number-pad"
                                    error={touched.contact_no && errors.contact_no ? true : false}
                                    errorMsg={
                                        touched.contact_no && errors.contact_no
                                            ? errors.contact_no
                                            : ''
                                    }
                                />
                                <TextInput
                                    label={'Pin Code'}
                                    value={values.code}
                                    onChangeText={(text) => {
                                        const re = /^[0-9\b]+$/
                                        if (text === '' || re.test(text)) {
                                            handleChange('code')(text)
                                        }
                                    }}
                                    onBlur={handleBlur('code')}
                                    error={touched.code && errors.code ? true : false}
                                    errorMsg={touched.code && errors.code ? errors.code : ''}
                                    keyboardType="numeric"
                                    secureTextEntry={hidePassword}
                                    right={
                                        <TxtInput.Icon
                                            name="eye"
                                            color={Colors.light}
                                            onPress={() => setHidePassword(!hidePassword)}
                                        />
                                    }
                                    maxLength={4}
                                />

                                <Button
                                    title="Update"
                                    onPress={handleSubmit}
                                    style={{ marginVertical: 15 }}
                                    loading={loading}
                                    disabled={
                                        values.firstname &&
                                        values.lastname &&
                                        values.email &&
                                        values.contact_no &&
                                        !loading
                                            ? false
                                            : true
                                    }
                                />
                                <SecondaryButton
                                    title="Delete"
                                    onPress={handeDeletePress}
                                    style={styles.deleteBtn}
                                    labelStyle={{ color: Colors.red }}
                                    loading={loading}
                                    disabled={
                                        values.firstname &&
                                        values.lastname &&
                                        values.email &&
                                        values.contact_no &&
                                        !loading
                                            ? false
                                            : true
                                    }
                                />
                            </View>
                        )}
                    </Formik>
                </Container>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HiringManagerScreen

const styles = StyleSheet.create({
    uploadBtn: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 15,
        borderColor: Colors.primary,
        alignItems: 'center',
        height: 125,
        width: 125,
        borderRadius: 100,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    uploadImgContainer: {
        flex: 1,
    },
    uploadImg: {
        height: '100%',
        width: '100%',
    },
    deleteBtn: {
        borderWidth: 0,
    },
})
