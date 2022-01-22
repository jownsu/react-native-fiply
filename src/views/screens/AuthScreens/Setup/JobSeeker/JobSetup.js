import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView, Container, Text, FiplyLogo, WaveHeader, Button, Dropdown } from '../../../../components/FiplyComponents' 
import { Formik } from 'formik'
import * as yup from 'yup'

const JobSetup = ({navigation}) => {

    const [jobTitle, setJobTitle] = useState('')
    const [jobLocation, setJobLocation] = useState('')
    const [jobType, setJobType] = useState('')

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
    const jobTypeList = [
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
        jobType: yup.string().trim().required('Job type is required')
      })


    return (
        <SafeAreaView>
            <WaveHeader waveimg={require('../../../../../assets/img/waves/4.png')} />
            <Container center >
                <FiplyLogo />
                <Text center size={17} style={{ marginVertical: 25 }}>What kind of job are you looking for?</Text>

                <Formik
                  initialValues={{ 
                    jobTitle: '',
                    jobLocation: '',
                    jobType: ''
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
                          onChangeText={handleChange('jobTitle')}
                          error={(touched.jobTitle && errors.jobTitle) ? true : false}
                          errorMsg={(touched.jobTitle && errors.jobTitle) ? errors.jobTitle : ''}
                      />
                      <Dropdown
                          label={"Job Location"}
                          value={values.jobLocation}
                          data={jobLocationList}
                          style={{ marginBottom: 5 }}
                          onChangeText={handleChange('jobLocation')}
                          error={(touched.jobLocation && errors.jobLocation) ? true : false}
                          errorMsg={(touched.jobLocation && errors.jobLocation) ? errors.jobLocation : ''}
                      />
                      <Dropdown
                          label={"Job Type"}
                          value={values.jobType}
                          data={jobTypeList}
                          style={{ marginBottom: 5 }}
                          onChangeText={handleChange('jobType')}
                          noTextInput
                          dropdownIcon
                          error={(touched.jobType && errors.jobType) ? true : false}
                          errorMsg={(touched.jobType && errors.jobType) ? errors.jobType : ''}
                      />
                      
                      <Button 
                          title="Done" 
                          style={{ marginVertical: 25 }} 
                          disabled={( 
                            values.jobTitle && 
                            values.jobLocation && 
                            values.jobType 
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
