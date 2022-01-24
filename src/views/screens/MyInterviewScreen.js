import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Text, SafeAreaView, Container } from '../components/FiplyComponents'
import Header from '../components/headers/Header'
import TopNavigation from '../components/headers/TopNavigation'
import InterviewList from '../components/lists/jobs/InterviewList'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const MyInterviewScreen = ({ navigation }) => {

    const [navIndex, setNavIndex] = useState(0)

    const pendingList = [
        {
            id: '1',
            title: 'Frontend Developers',
            company: 'White Hackers Inc.',
            type: 'Full Time',
            location: 'National Capital Region',
            image: require('../../assets/img/forums/whitehacker.png'),
            employer: 'Derald Jionson',
            when: '10/25/21 - 1 PM - 2PM'
        },
        {
            id: '2',
            title: 'React Developers',
            company: '2GREEN2ORANGE',
            type: 'Part Time',
            location: 'Glori Bayan',
            image: require('../../assets/img/forums/backend.png'),
            employer: 'Varmin Melasquez',
            when: '10/25/22 - 12 AM - 3AM'
        },
        {
            id: '3',
            title: 'Laravel Developers',
            company: 'Facebook, Inc.',
            type: 'Part Time',
            location: 'Caloocan City',
            image: require('../../assets/img/companies/google.png'),
            employer: 'Dhones Jigno',
            when: '05/03/21 - 10 AM - 12PM'
        },
    ]

    const confirmedList = [
        {
            id: '1',
            title: 'Laravel Developers',
            company: 'Facebook, Inc.',
            type: 'Part Time',
            location: 'Caloocan City',
            image: require('../../assets/img/companies/facebook.png'),
            employer: 'Cesar Chavez',
            when: '12/25/22 - 1 PM - 2PM'
        },

    ]

    const renderList = (id) => {
        switch (id) {
            case 0:
                return <InterviewList data={pendingList} />
            case 1:
                return <InterviewList data={confirmedList} />
            default:
                return <InterviewList data={pendingList} />
        }
    }

  return (
    <SafeAreaView flex>
        <View style={{ backgroundColor: Colors.white, position: 'absolute',top: 0, height: 50, width: '100%'  }}/>
        <Header
            title='My Interviews'
            onBackPress={() => navigation.pop()}
            style={{ backgroundColor: Colors.white, marginBottom: 10 }}
        />
        <Container style={{ paddingHorizontal: 0 }}>
            <TopNavigation
                navTitles={['Pending', 'Confirmed']}
                onBtnPress={i => setNavIndex(i)}
            />

            { renderList(navIndex) }
        </Container>
    </SafeAreaView>
  );
};

export default MyInterviewScreen;

const styles = StyleSheet.create({});
