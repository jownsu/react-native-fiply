import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView, Container, Text, FiplyLogo, WaveHeader, Button, Dropdown } from '../../../../components/FiplyComponents' 
import { Formik } from 'formik'
import * as yup from 'yup'

const JobSetup = ({navigation}) => {

    const jobTitleList = [
        {
          id: "Fullstack Developer",
          name: "Fullstack Developer",
        },
        {
          id: "Backend Developer",
          name: "Backend Developer",
        },
        {
          id: "Frontend Developer",
          name: "Frontend Developer",
        },
      ];
    const jobLocationList = [
        {
          id: "Cavite",
          name: "Cavite",
        },
        {
          id: "Quezon City",
          name: "Quezon City",
        },
        {
          id: "Caloocan City",
          name: "Caloocan City",
        },
      ];
    const employmentTypeList = [
        {
          id: "Full time",
          name: "Full time",
        },
        {
          id: "Part time",
          name: "Part time",
        },
        {
          id: "Work from home",
          name: "Work from home",
        },
      ];
      
      const formSchema = yup.object({
        jobTitle: yup.string().trim().required('Job title is required'),
        jobLocation: yup.string().trim().required('Job location is required'),
        employmentType: yup.string().trim().required('Employment type is required')
      })


    return (
        <SafeAreaView>
            <WaveHeader waveimg={require('../../../../../assets/img/waves/4.png')} />
            <Container center padding={20} >
                <FiplyLogo />
                <Text center size={17} style={{ marginVertical: 25 }}>What kind of job are you looking for?</Text>

                <Formik
                  initialValues={{ 
                    jobTitle: '',
                    jobLocation: '',
                    employmentType: ''
                  }}
                  validationSchema={formSchema}
                  onSubmit={values => navigation.navigate('BasicUser')}
                >

                  {({handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue}) => (
                    <View>
                      <Dropdown
                          label={"Job Title"}
                          value={values.jobTitle}
                          data={jobTitleList}
                          style={{ marginBottom: 5 }}
                          onChangeTextDelay={() => console.log('API CALLED')}
                          onSubmit={(text) => setFieldValue('jobTitle', text)}
                          error={(touched.jobTitle && errors.jobTitle) ? true : false}
                          errorMsg={(touched.jobTitle && errors.jobTitle) ? errors.jobTitle : ''}
                      />
                      <Dropdown
                          label={"Location"}
                          value={values.jobLocation}
                          data={jobLocationList}
                          style={{ marginBottom: 5 }}
                          onChangeTextDelay={() => console.log('API CALLED')}
                          onSubmit={(text) => setFieldValue('jobLocation', text)}
                          error={(touched.jobLocation && errors.jobLocation) ? true : false}
                          errorMsg={(touched.jobLocation && errors.jobLocation) ? errors.jobLocation : ''}
                      />
                      <Dropdown
                          label={"Employment Type"}
                          value={values.employmentType}
                          data={employmentTypeList}
                          style={{ marginBottom: 5 }}
                          onSubmit={(text) => setFieldValue('employmentType', text)}
                          noTextInput
                          dropdownIcon
                          error={(touched.employmentType && errors.employmentType) ? true : false}
                          errorMsg={(touched.employmentType && errors.employmentType) ? errors.employmentType : ''}
                      />
                      
                      <Button 
                          title="Done" 
                          style={{ marginVertical: 25 }} 
                          disabled={( 
                            values.jobTitle && 
                            values.jobLocation && 
                            values.employmentType 
                          ) ? false : true
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

export default JobSetup

const styles = StyleSheet.create({})
