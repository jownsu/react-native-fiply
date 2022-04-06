import React, { useContext, useRef, useState } from 'react'
import { StyleSheet, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import { Avatar, Searchbar } from 'react-native-paper'
import { SafeAreaView, Text, Container } from '../../components/FiplyComponents'
import Header from '../../components/headers/Header'
import ProfileContext from '../../../api/context/profile/ProfileContext'
import SearchBar from '../../components/headers/SearchBar'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'
import LoadMore from '../../components/lists/LoadMore'
import NoData from '../../components/NoData'
import FollowersAction from '../../components/modals/FollowersAction'

const FollowersScreen = ({ navigation }) => {
    const { userInfo, followers, loading, getFollowers, moreFollowers } = useContext(ProfileContext)
    const [showAction, setShowAction] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})

    const scrollToTop = () => {
        flatListRef.current.scrollToOffset({
            animated: true,
            offset: 0,
        })
    }

    const flatListRef = useRef(null)

    const ListEmptyComponent = () => {
        return followers.data == 0 ? <NoData /> : null
    }

    const onMorePress = (item) => {
        setShowAction(true)
        setSelectedUser(item)
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemBodyContainer}>
                    <Avatar.Image
                        source={{ uri: item.avatar }}
                        size={64}
                        backgroundColor={Colors.light}
                    />

                    <View style={styles.nameContainer}>
                        <Text weight="semi-bold" size={16} numberOfLines={1} adjustsFontSizeToFit>
                            {item.fullname}
                        </Text>
                        <Text size={12}>{item.preview}</Text>
                    </View>
                    <TouchableOpacity onPress={() => onMorePress(item)}>
                        <MaterialIcons name="more-horiz" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView statusBarColor={Colors.white} flex>
            <Header
                title={userInfo.fullname}
                style={{ backgroundColor: Colors.white }}
                onBackPress={() => navigation.pop()}
            />
            <SearchBar
                containerStyle={{ marginVertical: 10 }}
                onSubmit={(text) => getFollowers(userInfo.id, text)}
                onBlurClear={() => getFollowers(userInfo.id)}
            />
            <Container padding={20}>
                <Text weight="semi-bold">{followers.meta.total} Followers</Text>

                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={() => getFollowers(userInfo.id)}
                        />
                    }
                    ref={flatListRef}
                    style={{ flex: 0 }}
                    data={followers.data}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    onEndReached={() => {
                        if (followers.data.length < 30 && !loading) {
                            moreFollowers()
                        }
                    }}
                    onEndReachedThreshold={0}
                    ListFooterComponent={
                        <LoadMore
                            onLoadMorePress={() => {
                                moreFollowers(true)
                                scrollToTop()
                            }}
                            isLoading={followers.data.length >= 30 && !loading}
                        />
                    }
                    ListEmptyComponent={ListEmptyComponent}
                    // numColumns={2}
                />
            </Container>

            <FollowersAction
                visible={showAction}
                user={selectedUser}
                onDismiss={() => {
                    setShowAction(false)
                    setSelectedUser({})
                }}
            />
        </SafeAreaView>
    )
}

export default FollowersScreen

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    itemBodyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameContainer: {
        paddingHorizontal: 10,
        flex: 1,
    },
})
