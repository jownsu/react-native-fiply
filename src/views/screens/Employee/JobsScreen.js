import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { SafeAreaView, Text, Container } from '../../components/FiplyComponents'
import SearchHeader from '../../components/headers/SearchHeader'
import Colors from '../../../utils/Colors'
import { FontAwesome, Fontisto } from '@expo/vector-icons'
import DiscoverList from '../../components/lists/jobs/DiscoverList'
import PendingList from '../../components/lists/jobs/PendingList'

const JobsScreen = () => {

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
                return <PendingList data={pendingList} />
            default:
                return <DiscoverList data={discoverList} />
        }
    }

    return (
        <SafeAreaView>
            <SearchHeader
                rightIcon={ () => <FontAwesome name="paper-plane" size={24} color={Colors.secondary} />}
            /> 

            <Container style={{ paddingHorizontal: 0 }}>
                <View style={styles.headerContainer} >
                    <Text weight={'medium'} color={Colors.primary}>JOBS</Text>
                    <Fontisto name="equalizer" size={24} color="black" />
                </View>

                <View style={styles.topNavigationContainer}>
                    <TouchableOpacity 
                        style={styles.topNavigationBtn} 
                        onPress={() => {
                                setNavIndex(0)
                            }}>
                        <Text 
                            size={12}
                            color={navIndex == 0 ? Colors.primary : Colors.black}
                            weight={navIndex == 0 ? 'bold' : 'light'}
                        >
                            Discover
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.topNavigationBtn} 
                        onPress={() => {
                                setNavIndex(1)
                            }}>
                        <Text 
                            size={12}
                            color={navIndex == 1 ? Colors.primary : Colors.black}
                            weight={navIndex == 1 ? 'bold' : 'light'}
                        >
                            Saved
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topNavigationBtn} onPress={() => setNavIndex(2)}>
                        <Text 
                            size={12}
                            color={navIndex == 2 ? Colors.primary : Colors.black}
                            weight={navIndex == 2 ? 'bold' : 'light'}
                        >
                            Applied
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.topNavigationBtn} 
                        onPress={() => {
                                setNavIndex(3)
                            }}>
                        <Text 
                            size={12}
                            color={navIndex == 3 ? Colors.primary : Colors.black}
                            weight={navIndex == 3 ? 'bold' : 'light'}
                        >
                            Pending
                        </Text>
                    </TouchableOpacity>
                </View>

                {
                    renderList(navIndex)
                }

            </Container>



        </SafeAreaView>
    )
}

export default JobsScreen

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 5,
        marginHorizontal: 10
    },
    topNavigationContainer:{
        flexDirection: 'row',
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        marginBottom: 10
    },
    topNavigationBtn:{
        alignItems: 'center',
        paddingHorizontal: 15
    },
    activeBtn:{
        color: Colors.primary,
    }
})
