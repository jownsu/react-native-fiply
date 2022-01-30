import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { Text, SafeAreaView, Container, FlatList } from '../../views/components/FiplyComponents'
import Colors from '../../utils/Colors'
import Header from '../../views/components/headers/Header'
import TopNavigation from '../../views/components/headers/TopNavigation'
import { FontAwesome } from '@expo/vector-icons'
import SampleData from '../../utils/SampleData'

const HomeScreen = ({navigation}) => {

    const [navIndex, setNavIndex] = useState(0)

    const renderMessageList = (item) => (
        <TouchableOpacity activeOpacity={.7} style={styles.cardContainer} onPress={() => navigation.push('MessageScreen', {data: item})}>
            <View style={[styles.imgContainer, {borderColor: item.isActive ? Colors.primary : Colors.light } ]}>
                <Image 
                    source={item.image}
                    style={styles.img}
                    resizeMode='contain'
                />
            </View>

            <View style={styles.cardInfoContainer}>
                <Text weight='semi-bold'>{item.name}</Text>
                <Text 
                    size={12} 
                    color={item.isRead ? Colors.black : Colors.primary} 
                    weight={item.isRead ? 'light' : 'medium'}
                >
                    {item.lastMessage}
                </Text>
            </View>

            <Text>{item.date}</Text>
        </TouchableOpacity>
    )

    const renderList = (id) => {
        switch (id) {
            case 0:
                return <FlatList 
                            data={SampleData.messageAllList} 
                            renderItem={item => renderMessageList(item)}
                            noDataMessage='No Messages'
                        />
            case 1:
                return <FlatList 
                            data={SampleData.messageUnreadList} 
                            renderItem={item => renderMessageList(item)}
                            noDataMessage='Messages have already been received and read.'
                        />
            case 2:
                return <FlatList 
                            data={SampleData.messageForumList} 
                            renderItem={item => renderMessageList(item)}
                            noDataMessage='To view messages, join on forums'    
                        />
            case 3:
                return <FlatList 
                            data={SampleData.messageArchivedList} 
                            renderItem={item => renderMessageList(item)}
                            noDataMessage='There are no messages in archive'
                        />
            default:
                return <FlatList 
                            data={SampleData.messageAllList} 
                            renderItem={item => renderMessageList(item)}
                            noDataMessage='No Messages'
                        />
        }
    }

    return (
        <SafeAreaView statusBarColor={Colors.white} >
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

const styles = StyleSheet.create({
    imgContainer:{
        height: 50,
        width: 50,
        borderRadius: 100,
        borderWidth: 1,
        marginRight: 10,
        overflow: 'hidden',
        borderColor: Colors.light
    },
    img:{
        height: '100%',
        width: '100%',
        borderRadius: 100,
        backgroundColor: Colors.white,
    },
    cardContainer:{
        backgroundColor: Colors.white,
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderColor: Colors.light,
        elevation: 3,
        marginBottom: 5,
    },
    cardInfoContainer:{
        flex: 1,
    },
})
