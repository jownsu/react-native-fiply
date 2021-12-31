import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView, Container, Text, FiplyLogo, WaveHeader, Button, Dropdown } from '../../../../components/FiplyComponents' 
const JobSetup = ({navigation}) => {

    const [showDropDown, setShowDropDown] = useState({jobTitle: false, jobLocation: false, jobType: false});
    const [jobTitle, setJobTitle] = useState('')
    const [jobLocation, setJobLocation] = useState('')
    const [jobType, setJobType] = useState('')

    const jobTitleList = [
        {
          label: "Fullstack Developer",
          value: "Fullstack Developer",
        },
        {
          label: "Backend Developer",
          value: "Backend Developer",
        },
        {
          label: "Frontend Developer",
          value: "Frontend Developer",
        },
      ];
    const jobLocationList = [
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
    const jobTypeList = [
        {
          label: "Full time",
          value: "Full time",
        },
        {
          label: "Part time",
          value: "Part time",
        },
        {
          label: "Work from home",
          value: "Work from home",
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
            <Container center>
                <FiplyLogo />
                <Text center size={17} style={{ marginVertical: 25 }}>What kind of job are you looking for?</Text>
                <Dropdown
                    label={"Job Title"}
                    visible={showDropDown.jobTitle}
                    showDropDown={() => setShowDropDown({...showDropDown, jobTitle: true})}
                    onDismiss={() => setShowDropDown({...showDropDown, jobTitle: false})}
                    value={jobTitle}
                    setValue={ value => handleSetValue('jobTitle', value)}
                    list={jobTitleList}
                    style={{ marginBottom: 10 }}
                />
                <Dropdown
                    label={"Job Location"}
                    visible={showDropDown.jobLocation}
                    showDropDown={() => setShowDropDown({...showDropDown, jobLocation: true})}
                    onDismiss={() => setShowDropDown({...showDropDown, jobLocation: false})}
                    value={jobLocation}
                    setValue={ value => handleSetValue('jobLocation', value)}
                    list={jobLocationList}
                    style={{ marginBottom: 10 }}
                />
                <Dropdown
                    label={"Job Type"}
                    visible={showDropDown.jobType}
                    showDropDown={() => setShowDropDown({...showDropDown, jobType: true})}
                    onDismiss={() => setShowDropDown({...showDropDown, jobType: false})}
                    value={jobType}
                    setValue={ value => handleSetValue('jobType', value)}
                    list={jobTypeList}
                    style={{ marginBottom: 10 }}
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
