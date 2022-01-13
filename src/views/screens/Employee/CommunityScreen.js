import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { SafeAreaView, Text, Container } from '../../components/FiplyComponents'
import SearchHeader from '../../components/headers/SearchHeader'
import Colors from '../../../utils/Colors'
import { FontAwesome, Fontisto } from '@expo/vector-icons'

import DiscoverList from '../../components/lists/DiscoverList'
import FellowList from '../../components/lists/FellowList'
import CompanyList from '../../components/lists/CompanyList'
import RequestList from '../../components/lists/RequestList'
import ForumList from '../../components/lists/ForumList'

const CommunityScreen = () => {

    const [navIndex, setNavIndex] = useState(0)

    const discoverList = [
        {
            id: '1',
            name: 'Jhones Digno',
            description: 'Graduate of Bachelor of Science in Computer Science',
            image: require('../../../assets/img/members/digno.jpg')
        },
        {
            id: '2',
            name: 'John Ace Diendo',
            description: 'Student of University of Caloocan City',
            image: require('../../../assets/img/members/diendo.jpg')
        },
        {
            id: '3',
            name: 'Marvin Ryan Velasquez',
            description: 'Current employed at Carja Tech',
            image: require('../../../assets/img/members/velasquez.png')
        },
        {
            id: '4',
            name: 'Dan Kagi Briones',
            description: 'Student of University of Caloocan City',
            image: require('../../../assets/img/members/briones.png')
        },
        {
            id: '5',
            name: 'Macy Hular',
            description: 'Current employed at Carja Tech',
            image: require('../../../assets/img/members/hular.jpg')
        },
        {
            id: '6',
            name: 'Roy Ben Tumanon',
            description: 'Student of University of Caloocan City',
            image: require('../../../assets/img/members/tumanon.jpg')
        },
        {
            id: '7',
            name: 'Jerald Dionson',
            description: 'Currently Employed as Prayer Warrior Boys',
            image: require('../../../assets/img/members/dionson.png')
        },
    ]

    const fellowList = [
        {
            id: '1',
            name: 'Dan Kagi Briones',
            description: 'Student of University of Caloocan City',
            image: require('../../../assets/img/members/briones.png')
        },
        {
            id: '2',
            name: 'Macy Hular',
            description: 'Current employed at Carja Tech',
            image: require('../../../assets/img/members/hular.jpg')
        },
        {
            id: '3',
            name: 'John Ace Diendo',
            description: 'Student of University of Caloocan City',
            image: require('../../../assets/img/members/diendo.jpg')
        },
        {
            id: '4',
            name: 'Jerald Dionson',
            description: 'Currently Employed as Prayer Warrior Boys',
            image: require('../../../assets/img/members/dionson.png')
        },
        {
            id: '5',
            name: 'Marvin Ryan Velasquez',
            description: 'Current employed at Carja Tech',
            image: require('../../../assets/img/members/velasquez.png')
        },
        {
            id: '6',
            name: 'Jhones Digno',
            description: 'Graduate of Bachelor of Science in Computer Science',
            image: require('../../../assets/img/members/digno.jpg')
        },
        {
            id: '7',
            name: 'Roy Ben Tumanon',
            description: 'Student of University of Caloocan City',
            image: require('../../../assets/img/members/tumanon.jpg')
        },
    ]

    const companyList = [
        {
            id: '1',
            name: 'Facebook, Inc.',
            description: 'Menlo Park, California',
            image: require('../../../assets/img/companies/facebook.png')
        },
        {
            id: '2',
            name: 'Apple, Inc.',
            description: 'Cupertino, California',
            image: require('../../../assets/img/companies/apple.png')
        },
        {
            id: '3',
            name: 'Google, Inc.',
            description: 'Mountain View, California, United States',
            image: require('../../../assets/img/companies/google.png')
        },
        {
            id: '4',
            name: 'Tesla, Inc.',
            description: 'Palo Alto, California, United States',
            image: require('../../../assets/img/companies/tesla.png')
        }
    ]

    const requestList = [
        {
            id: '1',
            name: 'Jhones Digno',
            date: 'Aug 21',
            image: require('../../../assets/img/members/digno.jpg')
        },
        {
            id: '2',
            name: 'Roy Ben Tumanon',
            date: 'Sep 01',
            image: require('../../../assets/img/members/tumanon.jpg')
        },
        {
            id: '3',
            name: 'Dan Kagi Briones',
            date: 'Dec 21',
            image: require('../../../assets/img/members/briones.png')
        }
    ]

    const forumList = [
        {
            id: '1',
            name: 'Backend Developers',
            description: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit',
            image: require('../../../assets/img/forums/backend.png')
        },
        {
            id: '2',
            name: 'White Hackers 2021',
            description: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit',
            image: require('../../../assets/img/forums/csd.png')
        },
        {
            id: '3',
            name: 'UCC NORTH CSD',
            description: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit',
            image: require('../../../assets/img/forums/whitehacker.png')
        },

    ]

    const renderList = (id) => {
        switch (id) {
            case 0:
                return <DiscoverList data={discoverList} />
            case 1: 
                return <FellowList data={fellowList} />
            case 2: 
                return <ForumList data={forumList} />
            case 3:
                return <CompanyList data={companyList} />
            case 4:
                return <RequestList data={requestList} />
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
                    <Text weight={'medium'} color={Colors.primary}>COMMUNITY</Text>
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
                            Fellows
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topNavigationBtn} onPress={() => setNavIndex(2)}>
                        <Text 
                            size={12}
                            color={navIndex == 2 ? Colors.primary : Colors.black}
                            weight={navIndex == 2 ? 'bold' : 'light'}
                        >
                            Forums
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
                            Companies
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topNavigationBtn} onPress={() => setNavIndex(4)}>
                        <Text 
                            size={12}
                            color={navIndex == 4 ? Colors.primary : Colors.black}
                            weight={navIndex == 4 ? 'bold' : 'light'}
                        >
                            Requests
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

export default CommunityScreen

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 20
    },
    topNavigationContainer:{
        flexDirection: 'row',
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.light
    },
    topNavigationBtn:{
        alignItems: 'center',
        paddingHorizontal: 5
    },
    activeBtn:{
        color: Colors.primary,
    }
})
