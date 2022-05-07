import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView, Text, Container, FlatList } from '../../components/FiplyComponents'
import SearchBar from '../../components/headers/SearchBar'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'
import TitleFilter from '../../components/headers/TitleFilter'
import SampleData from '../../../utils/SampleData'
import HeaderTitle from '../../components/headers/HeaderTitle'

const NotificationScreen = ({ navigation }) => {
    const renderNotificationList = (item) => (
        <View style={styles.cardContainer}>
            <Image source={item.image} style={styles.img} resizeMode="contain" />
            <View style={styles.cardInfoContainer}>
                <Text weight="semi-bold">{item.name}</Text>
                <Text>{item.description}</Text>
            </View>

            <View style={styles.rightContainer}>
                <Entypo name="dots-three-horizontal" size={24} color={Colors.black} />
                <Text size={10} color={Colors.grey}>
                    {item.time}
                </Text>
            </View>
        </View>
    )

    return (
        <SafeAreaView flex statusBarColor={Colors.white}>
            {/* <SearchBar
                rightIcon={() => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MessageStack')}
                        activeOpacity={0.5}
                    >
                        <FontAwesome name="paper-plane" size={24} color={Colors.secondary} />
                    </TouchableOpacity>
                )}
            /> */}
            <HeaderTitle
                title={'Notifications'}
                style={{ backgroundColor: Colors.white, marginBottom: 10, paddingHorizontal: 10 }}
            />
            <Container style={{ paddingHorizontal: 0 }}>
                {/* <TitleFilter title="NOTIFICATION" titleColor={Colors.primary} hideLine /> */}

                <FlatList
                    data={SampleData.notificationList}
                    renderItem={(item) => renderNotificationList(item)}
                    noDataMessage="No Notification"
                />
            </Container>
        </SafeAreaView>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    img: {
        height: 50,
        width: 50,
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: Colors.white,
        marginRight: 10,
    },
    cardContainer: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderColor: Colors.light,
        elevation: 3,
        marginVertical: 2,
    },
    cardInfoContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    rightContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
})
