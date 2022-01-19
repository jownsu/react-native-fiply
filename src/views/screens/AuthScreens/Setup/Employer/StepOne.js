import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView, Text, TextInput, Button, InputDropdown, Container } from '../../../../components/FiplyComponents'
import Colors from '../../../../../utils/Colors'
import { Formik } from 'formik'
import * as yup from 'yup'
import StepIndicator from '../../../../components/StepIndicator'

const StepOne = ({navigation}) => {

    const companySchema = yup.object({
        company: yup.string().trim().required('Company is required'),
        companyRegNum: yup.string().trim().required('Company Registration Number is required'),
        position: yup.string().trim().required('Position is required'),
        location : yup.string().trim().required('Location is required')
    })

    const [showDropDown, setShowDropDown] = useState({location: false});
    const locationList = [
        {
          id: "1",
          name: "Cavite",
        },
        {
          id: "2",
          name: "Quezon City",
        },
        {
          id: "3",
          name: "Caloocan City",
        },
      ];

    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 35 }}>
                <StepIndicator active/>
            </View>
            <Container center>
                <Text color={Colors.secondary} weight='medium' size={24} center style={{ marginBottom: 20 }}>Step 1</Text>
                        <Formik
                            initialValues={{ 
                                company: '', 
                                companyRegNum: '', 
                                position: '', 
                                location: ''
                            }}
                            validationSchema={companySchema}
                            onSubmit={(values) => navigation.navigate('StepTwo')}
                        >   

                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (

                            <View>
                                <TextInput
                                    label="Company"
                                    value={values.company}
                                    onChangeText={handleChange('company')}
                                    onBlur={ handleBlur('company')}
                                    error={(touched.company && errors.company) ? true : false}
                                    errorMsg={(touched.company && errors.company) ? errors.company : ''}
                                />
                                <TextInput
                                    label="Company Registration Number"
                                    value={values.companyRegNum}
                                    onChangeText={handleChange('companyRegNum')}
                                    onBlur={ handleBlur('companyRegNum')}
                                    error={(touched.companyRegNum && errors.companyRegNum) ? true : false}
                                    errorMsg={(touched.companyRegNum && errors.companyRegNum) ? errors.companyRegNum : ''}
                                />
                                <TextInput
                                    label="Position"
                                    value={values.position}
                                    onChangeText={handleChange('position')}
                                    onBlur={ handleBlur('position')}
                                    error={(touched.position && errors.position) ? true : false}
                                    errorMsg={(touched.position && errors.position) ? errors.position : ''}
                                />
                                <InputDropdown
                                    label={"Location"}
                                    visibleDropdown={showDropDown.location}
                                    value={values.location}
                                    data={locationList}
                                    onFocus={() => setShowDropDown({location: true})}
                                    style={{ marginBottom: 10 }}
                                    onChangeText={handleChange('location')}
                                    onListPress={name => {
                                        setFieldValue('location', name)
                                        setShowDropDown({...showDropDown, location: false})
                                    }}
                                    onBlur={ handleBlur('location')}
                                    error={(touched.location && errors.location) ? true : false}
                                    errorMsg={(touched.location && errors.location) ? errors.location : ''}
                                />
                                <Button 
                                    title='Continue'
                                    onPress={() => handleSubmit()}
                                    style={{ marginVertical: 25 }}
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