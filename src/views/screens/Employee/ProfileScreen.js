import React, { useState }  from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView, Text, Container } from '../../components/FiplyComponents'
import Colors from '../../../utils/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome5 } from '@expo/vector-icons';
import ProfileHeader from '../../components/profile/ProfileHeader'
import CardInfo from '../../components/profile/CardInfo'
import PostList from '../../components/lists/PostList'
import TitleFilter from '../../components/headers/TitleFilter'
import TopNavigation from '../../components/headers/TopNavigation'
import PostFilterDialog from '../../components/dialog/PostFilterDialog'

const ProfileScreen = () => {

    const [showModal, setShowModal] = useState(false)

    const profileInfo = {
        fullname: 'Jhones Digno',
        description: 'Student at University of Caloocan City',
        address: 'Caloocan City, National Capital Region, Philippines',
        status: 'Ready to work',
        showExp: ['Laravel Developer', 'React Native Developer']
    }

    const basicInformation = {
        gender: 'Male',
        age: 21,
        birthday: 'May 03, 2000',
        language: 'Filipino, English',
        status: 'Looking for a job' 
    }

    const contactInfo = {
        mobile: '09263414237',
        telephone: '012-111-485-1564',
        email: 'jhonesdigno777@gmail.com',
        website: 'https://www.jownsu.com',
    }

    const jobPreference = {
        jobTitle: 'Laravel Developer, React Native Developer',
        jobLocation: 'National Capital Region, Metro Manila, Caloocan City'
    }

    const educationInfo = {
        school: 'University of Caloocan City',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        year: '2020 - 2021',
        credentials: 'digno_diploma.pdf'
    }

    const workExperience = {
        company: 'Carja Tech',
        location: 'Taguig, NCR, Philippines',
        title: 'Laravel Developer',
        employmentType: 'Work from home',
        dateStarted: 'October 2021',
        dateEnded: 'July 2022'
    }

    const certificationInfo={
        title: 'Advance Certified React Native Boi',
        organization: 'Zuitt Bootcamp, Inc.',
        date: 'July 22, 2022',
        credentials: 'ZB_Jhones.pdf '
    }

    const publication={
        title: 'Fiply Mobile App',
        author: 'Jhones Digno',
        publisher: 'Carja Tech',
        date: 'October 2021',
        url: 'https://www.carja.tech.com'
    }

    const postList = [
        {
            id: '1', 
            author: 'Saturn Inc.', 
            post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            posted_at: '10h'
        }, 
        {
            id: '2', 
            author: 'Saturn Inc.', 
            post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            posted_at: '10h'
        }, 
        {
            id: '3', 
            author: 'Saturn Inc.', 
            post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            posted_at: '10h'
        }, 
    ]

    const [navIndex, setNavIndex] = useState(0)

    const renderList = (id) => {
        switch (id) {
            case 0:
                return (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <CardInfo
                            title={'Basic Information'}
                            headers={['Gender', 'Age', 'Birthday', 'Language', 'Status']}
                            infos={basicInformation}
                        />
                        <CardInfo
                            title={'Contact Information'}
                            headers={['Mobile', 'Telephone', 'Email', 'Website']}
                            infos={contactInfo}
                        />
                        <CardInfo
                            title={'Job Locations'}
                            headers={['Job Title/s', 'Job Location']}
                            infos={jobPreference}
                        />
                    </ScrollView>
                )
            case 1: 
                return (
                    <View style={{ flex: 1 }}>
                        <TitleFilter 
                            title={'Posts'}
                            onFilterPress={() => setShowModal(true)}
                        />
                        
                        <PostList
                            data={postList}
                        />

                        <PostFilterDialog 
                            visible={showModal}
                            onDismiss={() => setShowModal(false)}
                        />
                    </View>
                )
            case 2:
                return (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <CardInfo 
                            title='Education'
                            headers={['School', 'Degree', 'Field of Study', 'Year', 'Credentials']}
                            infos={educationInfo}
                        />
                        <CardInfo 
                            title='Work Experience'
                            headers={['Company', 'Location', 'Title', 'Employment Type', 'Date Started', 'Date Ended']}
                            infos={workExperience}
                        />
                        <CardInfo 
                            title='Certifications'
                            headers={['Title', 'Organization', 'Date', 'Credentials']}
                            infos={certificationInfo}
                        />

                    </ScrollView>
                )
            case 3:
                return (
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <CardInfo 
                            title='Publications'
                            headers={['Title', 'Author', 'Publisher', 'Date', 'URL']}
                            infos={publication}
                        />
                    </ScrollView>

                )
            default:
                break;
        }
    }


    return (
        <SafeAreaView>
            <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                end={{ x: 1, y: 0 }}
                style={styles.gradientView}
            />

            <View style={styles.cameraContainer}>
                <FontAwesome5 name="camera" size={18} color={Colors.black} />
            </View>

            <Container style={{ paddingHorizontal: 10 }}>
                <ProfileHeader data={profileInfo} />

                <TopNavigation
                    navTitles={['About', 'Activity', 'Background', 'Attainment']}
                    onBtnPress={i => setNavIndex(i)}
                    index={navIndex}
                    style={{ marginHorizontal: 0, marginTop: 5, marginBottom: 5 }}
                    btnStyles={{ paddingHorizontal: 10 }}
                />

                { renderList(navIndex) }
                
            </Container>

        </SafeAreaView>

        
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    gradientView: {
        position: 'absolute',
        height: 125,
        width: '100%'
      },
      cameraContainer:{
        backgroundColor: Colors.light,
        borderRadius: 50,
        right: 0,
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginHorizontal: 10,
        marginBottom: 25
      },
})
