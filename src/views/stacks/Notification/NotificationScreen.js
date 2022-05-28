import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, TouchableOpacity, RefreshControl, FlatList } from 'react-native'
import NotificationContext from '../../../api/context/notifications/NotificationContext'
import { SafeAreaView, Text, Container } from '../../components/FiplyComponents'
import { Avatar } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'
import SampleData from '../../../utils/SampleData'
import HeaderTitle from '../../components/headers/HeaderTitle'

const NotificationScreen = ({ navigation }) => {
    const { notifications, loading, getNotifications, deleteNotification } =
        useContext(NotificationContext)

    useEffect(() => {
        getNotifications()
    }, [])

    const renderNotificationList = ({ item }) => (
        <View style={styles.cardContainer}>
            <Avatar.Image
                source={require('../../../assets/img/icon.png')}
                size={64}
                style={styles.icon}
            />
            <View style={styles.cardInfoContainer}>
                <Text weight="semi-bold">{item.title}</Text>
                <Text>{item.message}</Text>
            </View>

            <View style={styles.rightContainer}>
                <Text size={10} color={Colors.grey}>
                    {item.date}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.deleteIcon}
                    onPress={() => handleDeleteNotification(item.id)}
                >
                    <MaterialIcons name="delete" size={24} color={Colors.red} />
                </TouchableOpacity>
            </View>
        </View>
    )

    const handleDeleteNotification = (id) => {
        deleteNotification(id)
    }

    return (
        <SafeAreaView flex statusBarColor={Colors.white}>
            <HeaderTitle
                title={'Notifications'}
                style={{ backgroundColor: Colors.white, marginBottom: 10, paddingHorizontal: 10 }}
            />
            <Container style={{ paddingHorizontal: 0 }}>
                {/* <TitleFilter title="NOTIFICATION" titleColor={Colors.primary} hideLine /> */}

                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={() => getNotifications()} />
                    }
                    data={notifications}
                    renderItem={renderNotificationList}
                    noDataMessage="No Notification"
                />
            </Container>
        </SafeAreaView>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    icon: {
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
        alignItems: 'flex-end',
    },
    deleteIcon: {
        marginTop: 'auto',
        marginBottom: 'auto',
    },
})
