import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, SafeAreaView, Container } from '../../views/components/FiplyComponents'
import Colors from '../../utils/Colors'
import Header from '../../views/components/headers/Header'
import TopNavigation from '../../views/components/headers/TopNavigation'
import { FontAwesome } from '@expo/vector-icons'
import MessageList from '../../views/components/lists/messages/MessageList'

const allMesageList = [
    {
        id: '1',
        name: 'Dan Kagi Briones',
        date: 'Dec 21',
        lastMessage: 'musta boi',
        image: require('../../assets/img/members/briones.png'),
        isRead: false,
        isActive: true,
    },
    {
        id: '2',
        name: 'Roy Ben Tumanon',
        date: 'Oct 12',
        lastMessage: 'send sauce',
        image: require('../../assets/img/members/tumanon.jpg'),
        isRead: false,
        isActive: false,
    },
    {
        id: '3',
        name: 'Macy Hular',
        date: 'June 01',
        lastMessage: 'Ang funny.',
        image: require('../../assets/img/members/hular.jpg'),
        isRead: true,
        isActive: true,
    },
]

const unreadMessageList = [
    {
        id: '1',
        name: 'Jerald Dionson',
        date: 'Sept 21',
        lastMessage: 'boss, pa isko',
        image: require('../../assets/img/members/dionson.png'),
        isRead: false
    },
    {
        id: '2',
        name: 'Marvin Ryan Velasquez',
        date: 'July 21',
        lastMessage: 'pa isko boss',
        image: require('../../assets/img/members/velasquez.png'),
        isRead: false
    },

]

const forumMessageList = [
    {
        id: '1',
        name: 'Backend Developers',
        date: 'Aug 21',
        lastMessage: 'See this link that might help you in developing your skills....',
        image: require('../../assets/img/forums/backend.png'),
        isRead: true,
        isActive: false
    },
    {
        id: '2',
        name: 'White Hackers 2021',
        date: 'Sept 21',
        lastMessage: 'Welcome White Hackers! Today is a very special day....',
        image: require('../../assets/img/forums/whitehacker.png'),
        isRead: true,
        isActive: false
    },
    {
        id: '3',
        name: 'UCC NORTH CSD',
        date: 'May 21',
        lastMessage: 'Announcement! No Final Defense for Thesis C...',
        image: require('../../assets/img/forums/csd.png'),
        isRead: true,
        isActive: true
    },
]

const archivedMessageList = [
    {
        id: '1',
        name: 'Ace Diendo',
        date: 'Aug 21',
        lastMessage: 'Papasa bold',
        image: require('../../assets/img/members/diendo.jpg'),
        isRead: false,
        isActive: false
    }
]

const HomeScreen = ({navigation}) => {

    const [navIndex, setNavIndex] = useState(0)

    const renderList = (id) => {
        switch (id) {
            case 0:
                return <MessageList 
                            data={allMesageList} 
                            onMessagePress={(item) => navigation.push('MessageScreen', {data: item})}
                        />
            case 1:
                return <MessageList 
                            data={unreadMessageList} 
                            onMessagePress={(item) => navigation.push('MessageScreen', {data: item})} 
                            noMessageText='Messages have already been received and read.'
                        />
            case 2:
                return <MessageList 
                            data={forumMessageList} 
                            onMessagePress={(item) => navigation.push('MessageScreen', {data: item})} 
                            noMessageText='To view messages, join on forums'    
                        />
            case 3:
                return <MessageList 
                            data={archivedMessageList} 
                            onMessagePress={(item) => navigation.push('MessageScreen', {data: item})} 
                            noMessageText='There are no messages in archive'
                        />
            default:
                return <MessageList 
                            data={allMesageList} 
                            onMessagePress={(item) => navigation.push('MessageScreen', {data: item})} 
                        />
        }
    }

    return (
        <SafeAreaView>
            <View style={{ backgroundColor: Colors.white, position: 'absolute',top: 0, height: 50, width: '100%'  }}/>
            <Header 
                title='Messaging'
                centerTitle
                rightIcon={() => <FontAwesome name="gear" size={24} color={Colors.black} />}
                style={{ backgroundColor: Colors.white }}
                onBackPress={() => navigation.pop()}
            />
            <TopNavigation 
                navTitles={['All', 'Unread', 'Forums', 'Archived']}
                index={navIndex}
                onBtnPress={i => setNavIndex(i) }
                style={{ marginVertical: 10 }} 
            />
            <Container style={{ paddingHorizontal: 0 }}>
                { renderList(navIndex) }
            </Container>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
