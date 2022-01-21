import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Text, SafeAreaView, Container2, TextInput, InputDropdown, Button, FiplyLogo } from '../components/FiplyComponents'
import { Formik } from 'formik'
import * as yup from 'yup'
import Header from '../components/headers/Header'
import Colors from '../../utils/Colors'

const CreateJobScreen = ({navigation}) => {

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
  const locationList = [
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
  const companyList = [
    {
        id: "1",
        name: "Carja Tech",
    },
    {
        id: "2",
        name: "Google",
    },
    {
        id: "3",
        name: "Logitech",
    },
  ]

  const [showDropDown, setShowDropDown] = useState({
      jobTitle: false, 
      jobType: false, 
      location: false, 
      company: false
    })

  const formSchema = yup.object({
    jobTitle: yup.string().trim().required('Job Title is required'),
    jobType: yup.string().trim().required('Job Type is required'),
    company: yup.string().trim().required('Company is requried'),
    location: yup.string().trim().required('Location is required'),
    description: yup.string().trim().required('Description is required'),
  })



  return (
    <SafeAreaView>
      <View style={{ backgroundColor: Colors.white, position: 'absolute',top: 0, height: 50, width: '100%'  }}/>
      <Header 
        title='Create a Job'
        centerTitle
        style={{ backgroundColor: Colors.white, marginBottom: 20 }}
        onBackPress={() => navigation.pop()}
      />

      <Container2 onPress={() => setShowDropDown({})}>

            <Formik
              initialValues={{ 
                jobTitle: '',
                jobType: '',
                company: '',
                location: '',
                description: ''
              }}
              validationSchema={formSchema}
              onSubmit={(values) => {
                console.log(values)
              }}
            >

              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <View>
                  <InputDropdown 
                    label='Job Title'
                    visibleDropdown={showDropDown.jobTitle}
                    value={values.jobTitle}
                    data={jobTitleList}
                    onFocus={() => setShowDropDown({...showDropDown, jobTitle: true})}
                    style={{ marginBottom: 5 }}
                    onChangeText={handleChange('jobTitle')}
                    onListPress={name => {
                      setFieldValue('jobTitle', name)
                      setShowDropDown({...showDropDown, jobTitle: false})
                    }}
                    onInputPress={() => setShowDropDown({...showDropDown, jobTitle: true})}
                    dropdownIcon
                    onBlur={handleBlur('jobTitle')}
                    error={(touched.jobTitle && errors.jobTitle) ? true : false}
                    errorMsg={(touched.jobTitle && errors.jobTitle) ? errors.jobTitle : ''}
                  />
                  <InputDropdown
                    label={"Job Type"}
                    visibleDropdown={showDropDown.jobType}
                    value={values.jobType}
                    data={jobTypeList}
                    onFocus={() => setShowDropDown({...showDropDown, jobType: true})}
                    style={{ marginBottom: 5 }}
                    onChangeText={handleChange('jobType')}
                    onListPress={name => {
                      setFieldValue('jobType', name)
                      setShowDropDown({...showDropDown, jobType: false})
                    }}
                    onInputPress={() => setShowDropDown({...showDropDown, jobType: true})}
                    nonEditable
                    dropdownIcon
                    onBlur={handleBlur('jobType')}
                    error={(touched.jobType && errors.jobType) ? true : false}
                    errorMsg={(touched.jobType && errors.jobType) ? errors.jobType : ''}
                  />
                  <InputDropdown
                    label={"Company"}
                    visibleDropdown={showDropDown.company}
                    value={values.company}
                    data={companyList}
                    onFocus={() => setShowDropDown({...showDropDown, company: true})}
                    style={{ marginBottom: 5 }}
                    onChangeText={handleChange('company')}
                    onListPress={name => {
                      setFieldValue('company', name)
                      setShowDropDown({...showDropDown, company: false})
                  }}
                    onInputPress={() => setShowDropDown({...showDropDown, company: true})}
                    dropdownIcon
                    onBlur={handleBlur('company')}
                    error={(touched.company && errors.company) ? true : false}
                    errorMsg={(touched.company && errors.company) ? errors.company : ''}
                  />
                  <InputDropdown
                    label={"Location"}
                    visibleDropdown={showDropDown.location}
                    value={values.location}
                    data={locationList}
                    onFocus={() => setShowDropDown({...showDropDown, location: true})}
                    style={{ marginBottom: 5 }}
                    onChangeText={handleChange('location')}
                    onListPress={name => {
                      setFieldValue('location', name)
                      setShowDropDown({...showDropDown, location: false})
                  }}
                    onInputPress={() => setShowDropDown({...showDropDown, location: true})}
                    dropdownIcon
                    onBlur={handleBlur('location')}
                    error={(touched.location && errors.location) ? true : false}
                    errorMsg={(touched.location && errors.location) ? errors.location : ''}
                  />
                  <TextInput
                    label='Description'
                    multiline
                    style={{ maxHeight: 150, marginBottom: 5 }}
                    value={values.description}
                    onChangeText={handleChange('description')}
                    onBlur={handleBlur('description')}
                    error={(touched.description && errors.description) ? true : false}
                    errorMsg={(touched.description && errors.description) ? errors.description : ''}
                  />

                  <Button
                    title='Submit'
                    style={{ marginTop: 35 }}
                    onPress={handleSubmit}
                  />
                </View>
              )}

              </Formik>

              <FiplyLogo style={{ flex: 1 }} textColor={Colors.secondary} />

      </Container2>
    </SafeAreaView>
  );
};

export default CreateJobScreen;

const styles = StyleSheet.create({});
