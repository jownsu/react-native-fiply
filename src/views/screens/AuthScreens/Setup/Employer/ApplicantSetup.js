import React, {useState} from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView, Container, Text, FiplyLogo, WaveHeader, Button, Dropdown, InputDropdown } from '../../../../components/FiplyComponents' 
const ApplicantSetup = ({navigation}) => {

    const [showDropDown, setShowDropDown] = useState({levelOfExperience: false, fieldOfExpertise: false, location: false});

    const [levelOfExperience, setLevelOfExperience] = useState('')
    const [fieldOfExpertise, setFieldOfExpertise] = useState('')
    const [location, setLocation] = useState('')

    const levelOfExperienceList = [
        {
          id: "1",
          name: "Entry Level",
        },
        {
          id: "2",
          name: "Intermediate",
        },
        {
          id: "3",
          name: "Mid Level",
        },
        {
          id: "4",
          name: "Senior Level",
        },
      ];
    const fieldOfExpertiseList = [
        {
          id: "1",
          name: "Business and Entrepreneurship",
        },
        {
          id: "2",
          name: "Creativity and Aesthetics",
        },
        {
          id: "3",
          name: "Math, Data and Computing",
        },
        {
          id: "4",
          name: "Technology and Realization",
        },
        {
          id: "5",
          name: "User and Society",
        },
      ];
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
            <Container center onPress={() => setShowDropDown({})}>
                <FiplyLogo />
                <Text center size={17} style={{ marginVertical: 25 }}>What kind of applicant are you looking for?</Text>

                <InputDropdown
                    label={"Level of experience"}
                    visibleDropdown={showDropDown.levelOfExperience}
                    value={levelOfExperience}
                    data={levelOfExperienceList}
                    onFocus={() => setShowDropDown({...showDropDown, levelOfExperience: true})}
                    style={{ marginBottom: 10 }}
                    onChangeText={setLevelOfExperience}
                    onListPress={name => {
                      setLevelOfExperience(name)
                      setShowDropDown({...showDropDown, levelOfExperience: false})
                    }}
                    nonEditable
                    onInputPress={() => setShowDropDown({...showDropDown, levelOfExperience: true})}
                    dropdownIcon
                />

                <InputDropdown
                    label={"Field of expertise"}
                    visibleDropdown={showDropDown.fieldOfExpertise}
                    value={fieldOfExpertise}
                    data={fieldOfExpertiseList}
                    onFocus={() => setShowDropDown({...showDropDown, fieldOfExpertise: true})}
                    style={{ marginBottom: 10 }}
                    onChangeText={setFieldOfExpertise}
                    onListPress={name => {
                      setFieldOfExpertise(name)
                      setShowDropDown({...showDropDown, fieldOfExpertise: false})
                    }}
                    nonEditable
                    onInputPress={() => setShowDropDown({...showDropDown, fieldOfExpertise: true})}
                    dropdownIcon
                />

                <InputDropdown
                    label={"Location"}
                    visibleDropdown={showDropDown.location}
                    value={location}
                    data={locationList}
                    onFocus={() => setShowDropDown({...showDropDown, location: true})}
                    style={{ marginBottom: 10 }}
                    onChangeText={setLocation}
                    onListPress={name => {
                      setLocation(name)
                      setShowDropDown({...showDropDown, location: false})
                    }}
                    nonEditable
                    onInputPress={() => setShowDropDown({...showDropDown, location: true})}
                    dropdownIcon
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
