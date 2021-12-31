import React, {useState} from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView, Container, Text, FiplyLogo, WaveHeader, Button, Dropdown } from '../../../../components/FiplyComponents' 
const ApplicantSetup = ({navigation}) => {

    const [showDropDown, setShowDropDown] = useState({levelOfExperience: false, fieldOfExpertise: false, location: false});

    const [levelOfExperience, setLevelOfExperience] = useState('')
    const [fieldOfExpertise, setFieldOfExpertise] = useState('')
    const [location, setLocation] = useState('')

    const levelOfExperienceList = [
        {
          label: "Entry Level",
          value: "Entry Level",
        },
        {
          label: "Intermediate",
          value: "Intermediate",
        },
        {
          label: "Mid Level",
          value: "Mid Level",
        },
        {
          label: "Senior Level",
          value: "Senior Level",
        },
      ];
    const fieldOfExpertiseList = [
        {
          label: "Business and Entrepreneurship",
          value: "Business and Entrepreneurship",
        },
        {
          label: "Creativity and Aesthetics",
          value: "Creativity and Aesthetics",
        },
        {
          label: "Math, Data and Computing",
          value: "Math, Data and Computing",
        },
        {
          label: "Technology and Realization",
          value: "Technology and Realization",
        },
        {
          label: "User and Society",
          value: "User and Society",
        },
      ];
    const locationList = [
        {
            label: "Cavite",
            value: "Cavite",
        },
        {
            label: "Quezon City",
            value: "Quezon City",
        },
        {
            label: "Caloocan City",
            value: "Caloocan City",
        },
      ];

      const handleSetValue = (field, value) => {
        switch (field) {
            case 'levelOfExperience':
                setLevelOfExperience(value)
                break
            case 'fieldOfExpertise':
                setFieldOfExpertise(value)
            case 'location':
                setLocation(value)
                break
            default:
                alert('Select Field')
                break;
        }
      }

    return (
        <SafeAreaView>
            <WaveHeader waveimg={require('../../../../../assets/img/waves/4.png')} />
            <Container center>
                <FiplyLogo />
                <Text center size={17} style={{ marginVertical: 25 }}>What kind of applicant are you looking for?</Text>
                <Dropdown
                    label={"Level of experience"}
                    visible={showDropDown.levelOfExperience}
                    showDropDown={() => setShowDropDown({...showDropDown, levelOfExperience: true})}
                    onDismiss={() => setShowDropDown({...showDropDown, levelOfExperience: false})}
                    value={levelOfExperience}
                    setValue={ value => handleSetValue('levelOfExperience', value)}
                    list={levelOfExperienceList}
                    style={{ marginBottom: 10 }}
                />
                <Dropdown
                    label={"Field of expertise"}
                    visible={showDropDown.fieldOfExpertise}
                    showDropDown={() => setShowDropDown({...showDropDown, fieldOfExpertise: true})}
                    onDismiss={() => setShowDropDown({...showDropDown, fieldOfExpertise: false})}
                    value={fieldOfExpertise}
                    setValue={ value => handleSetValue('fieldOfExpertise', value)}
                    list={fieldOfExpertiseList}
                    style={{ marginBottom: 10 }}
                />
                <Dropdown
                    label={"Location"}
                    visible={showDropDown.location}
                    showDropDown={() => setShowDropDown({...showDropDown, location: true})}
                    onDismiss={() => setShowDropDown({...showDropDown, location: false})}
                    value={location}
                    setValue={ value => handleSetValue('location', value)}
                    list={locationList}
                    style={{ marginBottom: 10 }}
                />


                <Button 
                    title="Done" 
                    style={{ marginVertical: 25 }} 
                    disabled={( levelOfExperience && fieldOfExpertise && location ) ? false : true} 
                    onPress={() => navigation.navigate('BasicUser')}    
                />
            </Container>


        </SafeAreaView>
    )
}

export default ApplicantSetup

const styles = StyleSheet.create({})
