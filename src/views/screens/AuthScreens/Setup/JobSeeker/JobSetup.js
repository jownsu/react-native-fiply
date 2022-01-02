import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView, Container, Text, FiplyLogo, WaveHeader, Button, Dropdown, InputDropdown } from '../../../../components/FiplyComponents' 
const JobSetup = ({navigation}) => {

    const [showDropDown, setShowDropDown] = useState({jobTitle: false, jobLocation: false, jobType: false});
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

      const handleSetValue = (field, value) => {
        switch (field) {
            case 'jobTitle':
                setJobTitle(value)
                break
            case 'jobLocation':
                setJobLocation(value)
            case 'jobType':
                setJobType(value)
                break
            default:
                alert('Select Field')
                break;
        }
      }

    return (
        <SafeAreaView>
            <WaveHeader waveimg={require('../../../../../assets/img/waves/4.png')} />
            <Container center onPress={() => setShowDropDown({jobTitle: false, jobLocationList: false})}>
                <FiplyLogo />
                <Text center size={17} style={{ marginVertical: 25 }}>What kind of job are you looking for?</Text>
                <InputDropdown
                    label={"Job Title"}
                    visibleDropdown={showDropDown.jobTitle}
                    value={jobTitle}
                    data={jobTitleList}
                    onFocus={() => setShowDropDown({...showDropDown, jobTitle: true})}
                    style={{ marginBottom: 10 }}
                    onChangeText={setJobTitle}
                    onListPress={name => {
                      setJobTitle(name)
                      setShowDropDown({...showDropDown, jobTitle: false})
                    }}
                />
                <InputDropdown
                    label={"Job Location"}
                    visibleDropdown={showDropDown.jobLocation}
                    value={jobLocation}
                    data={jobLocationList}
                    onFocus={() => setShowDropDown({...showDropDown, jobLocation: true})}
                    style={{ marginBottom: 10 }}
                    onChangeText={setJobLocation}
                    onListPress={name => {
                      setJobLocation(name)
                      setShowDropDown({...showDropDown, jobLocation: false})
                    }}
                />
                <InputDropdown
                    label={"Job Type"}
                    visibleDropdown={showDropDown.jobType}
                    value={jobType}
                    data={jobTypeList}
                    onFocus={() => setShowDropDown({...showDropDown, jobType: true})}
                    style={{ marginBottom: 10 }}
                    onChangeText={setJobType}
                    onListPress={name => {
                      setJobType(name)
                      setShowDropDown({...showDropDown, jobType: false})
                    }}
                    nonEditable
                    onInputPress={() => setShowDropDown({...showDropDown, jobType: true})}
                    dropdownIcon
                />
                
                <Button 
                    title="Done" 
                    style={{ marginVertical: 25 }} 
                    disabled={( jobTitle && jobLocation && jobType ) ? false : true} 
                    onPress={() => navigation.navigate('BasicUser')}    
                />
            </Container>
        </SafeAreaView>
    )
}

export default JobSetup

const styles = StyleSheet.create({})
