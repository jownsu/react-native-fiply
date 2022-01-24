import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { SafeAreaView, Container, Text } from '../../components/FiplyComponents'
import SearchHeader from '../../components/headers/SearchHeader'
import Colors from '../../../utils/Colors'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import DiscoverList from '../../components/lists/jobs/DiscoverList'
import PendingList from '../../components/lists/jobs/PendingList'
import TitleFilter from '../../components/headers/TitleFilter'
import TopNavigation from '../../components/headers/TopNavigation'

const JobsScreen = ({navigation}) => {

    const [navIndex, setNavIndex] = useState(0)

    const discoverList = [
        {
            id: '1',
            title: 'Frontend Developers',
            company: 'White Hackers Inc.',
            type: 'Full Time',
            location: 'National Capital Region',
            image: require('../../../assets/img/forums/whitehacker.png'),
            isSave: true,
            isApply: true
        },
        {
            id: '2',
            title: 'React Developers',
            company: '2GREEN2ORANGE',
            type: 'Part Time',
            location: 'Glori Bayan',
            image: require('../../../assets/img/forums/backend.png'),
            isSave: true,
            isApply: false
        },
        {
            id: '3',
            title: 'Laravel Developers',
            company: 'Facebook, Inc.',
            type: 'Part Time',
            location: 'Caloocan City',
            image: require('../../../assets/img/companies/google.png'),
            isSave: false,
            isApply: false
        },
    ]
    const savedList = [
        {
            id: '1',
            title: 'Laravel Developers',
            company: 'Facebook, Inc.',
            type: 'Part Time',
            location: 'Caloocan City',
            image: require('../../../assets/img/companies/facebook.png'),
            isSave: true,
            isApply: false
        },

    ]
    const appliedList = [
        {
            id: '1',
            title: 'Laravel Developers',
            company: 'Facebook, Inc.',
            type: 'Part Time',
            location: 'Caloocan City',
            image: require('../../../assets/img/companies/facebook.png'),
            isSave: true,
            isApply: true
        },
        {
            id: '2',
            title: 'React Developers',
            company: 'Google, Inc.',
            type: 'Part Time',
            location: 'Glori Bayan',
            image: require('../../../assets/img/companies/google.png'),
            isSave: true,
            isApply: true
        },
    ]
    const pendingList = [
        {
            id: '1',
            title: 'Laravel Developers',
            company: 'Facebook, Inc.',
            type: 'Part Time',
            location: 'Caloocan City',
            image: require('../../../assets/img/companies/google.png'),
            status: 'Initial Interview',
            questions: [
                {
                    id: 1,
                    questionType: 'paragraph',
                    question: 'Tell me about your self'
                },
                {
                    id: 2,
                    questionType: 'paragraph',
                    question: 'How do you keep up with the latest trends in this field?'
                },
                {
                    id: 3,
                    questionType: 'radiobutton',
                    question: 'Are you willing to relocate?',
                    options: ['Yes', 'No']
                },
                {
                    id: 4,
                    questionType: 'checkbox',
                    question: 'Languages that you are familiar with',
                    options: ['Javascript', 'React' , 'HTML/CSS', 'Laravel']
                }
            ]
        },
        {
            id: '2',
            title: 'React Native Developers',
            company: 'White Hackers Inc.',
            type: 'Full Time',
            location: 'National Capital Region',
            image: require('../../../assets/img/forums/whitehacker.png'),
            status: 'Video Call Interiview',
            when: '10/25/21 | 1PM - 2PM'

        }
    ]

    const renderList = (id) => {
        switch (id) {
            case 0:
                return <DiscoverList data={discoverList} />
            case 1: 
                return <DiscoverList data={savedList} />
            case 2: 
                return <DiscoverList data={appliedList} />
            case 3:
                return (
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.myInterviewContainer} activeOpacity={.7} onPress={() => navigation.navigate('MyInterviewScreen')}>
                            <FontAwesome5 name="calendar-alt" size={32} color={Colors.primary} style={{ marginRight: 10 }} />
                            <View style={styles.interviewDetailsContainer}>
                                <Text weight='medium' color={Colors.primary}>My Interviews</Text>
                                <Text size={9}>0 Pending, 0 Confirmed</Text>
                            </View>
                            <FontAwesome name="angle-right" size={38} color={Colors.light} />
                        </TouchableOpacity>
                        <PendingList 
                            data={pendingList} 
                            onProceedPress={(questions) => navigation.navigate('InitialInterviewScreen', {questions})}
                        />
                    </View>
                )
            default:
                return <DiscoverList data={discoverList} />
        }
    }

    return (
        <SafeAreaView flex>
            <SearchHeader
                rightIcon={ () => 
                    <TouchableOpacity onPress={() => navigation.navigate('MessageStack')} activeOpacity={.5}>
                        <FontAwesome name="paper-plane" size={24} color={Colors.secondary} />
                    </TouchableOpacity>
                }
            /> 

            <Container style={{ paddingHorizontal: 0 }}>
                <TitleFilter 
                    title='JOBS'
                    titleColor={Colors.primary}
                    hideLine
                />

                <TopNavigation
                    navTitles={['Discover', 'Saved', 'Applied', 'Pending']}
                    onBtnPress={i => setNavIndex(i)}
                />

                { renderList(navIndex) }

            </Container>



        </SafeAreaView>
    )
}

export default JobsScreen

const styles = StyleSheet.create({
    myInterviewContainer:{
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        flexDirection: 'row',
        marginLeft: 10,
        padding: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.light,
        width: 200,
        elevation: 3
    },
    interviewDetailsContainer:{
        marginRight: 10
    },
})
