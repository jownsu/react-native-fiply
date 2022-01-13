import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView, Text, Container } from '../../components/FiplyComponents'
import SearchHeader from '../../components/headers/SearchHeader'
import { FontAwesome5, FontAwesome, Fontisto } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'
import NotificationList from '../../components/lists/NotificationList'

const NotificationScreen = () => {

    const notificationList = [
        {
            id: '1',
            name: 'Facebook, Inc.',
            description: 'Facebook, Inc. is now hiring fresh graduates developer.',
            time: '12:03 PM',
            image: require('../../../assets/img/companies/facebook.png')
        },
        {
            id: '2',
            name: 'White Hackers 2021',
            description: 'White hackers 2021 created an even near you',
            time: '12:06 PM',
            image: require('../../../assets/img/forums/whitehacker.png')
        },
        {
            id: '3',
            name: 'UCC NORTH CSD',
            description: 'Lorem Ipsum dolor sit amet, consectetur adipiscing elit',
            time: '1:03 PM',
            image: require('../../../assets/img/forums/csd.png')
        },
    ]


    return (
        <SafeAreaView>
            <SearchHeader
                rightIcon={ () => <FontAwesome name="paper-plane" size={24} color={Colors.secondary} />}
            /> 

            <Container style={{ paddingHorizontal: 0 }}>
                <View style={styles.headerContainer} >
                    <Text weight={'medium'} color={Colors.primary}>NOTIFICATION</Text>
                    <Fontisto name="equalizer" size={24} color="black" />
                </View>

                <NotificationList 
                    data={notificationList}
                />


            </Container>


        </SafeAreaView>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 20
    },
})
