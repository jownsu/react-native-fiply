import React, { useContext, useRef, useState } from 'react'
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native'
import { Avatar, Snackbar } from 'react-native-paper'

import { SafeAreaView, Text, Container, SecondaryButton } from '../../components/FiplyComponents'
import Header from '../../components/headers/Header'
import ProfileContext from '../../../api/context/profile/ProfileContext'
import SearchBar from '../../components/headers/SearchBar'
import Colors from '../../../utils/Colors'
import LoadMore from '../../components/lists/LoadMore'
import NoData from '../../components/NoData'
import FollowingAction from '../../components/modals/FollowingAction'
import FollowersAction from '../../components/modals/FollowersAction'
import FollowingItem from '../../components/lists/FollowingItem'
import FollowerItem from '../../components/lists/FollowerItem'
import { Tabs, TabScreen } from 'react-native-paper-tabs'

const FollowScreen = ({ navigation }) => {
    const {
        userInfo,
        followers,
        following,
        getFollowers,
        getFollowing,
        moreFollowers,
        moreFollowing,
        unFollow,
        removeFollower,
        loading,
        snackBarMessage,
        hideSnackBar,
    } = useContext(ProfileContext)
    const [showFollowingAction, setShowFollowingAction] = useState(false)
    const [showFollowerAction, setShowFollowerAction] = useState(false)
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

    const handleFollowingBtnPress = (item) => {
        setShowFollowingAction(true)
        setSelectedUser(item)
    }

    const handleFollowerBtnPress = (item) => {
        setShowFollowerAction(true)
        setSelectedUser(item)
    }

    const handleUnFollowPress = (id) => {
        unFollow(id)
        setShowFollowingAction(false)
    }

    const handleRemovePress = (id) => {
        removeFollower(id)
        setShowFollowerAction(false)
    }

    const renderFollowingItem = ({ item }) => {
        return <FollowingItem item={item} onFollowingBtnPress={handleFollowingBtnPress} />
    }

    const renderFollowerItem = ({ item }) => {
        return <FollowerItem item={item} onRemoveBtnPress={handleFollowerBtnPress} />
    }

    return (
        <SafeAreaView statusBarColor={Colors.white} flex>
            <Header
                title={userInfo.fullname}
                style={{ backgroundColor: Colors.white }}
                onBackPress={() => navigation.pop()}
            />
            <Tabs style={{ backgroundColor: '#fff', color: 'red' }} uppercase={false}>
                <TabScreen label={`${followers.meta.total} Follower`}>
                    <Container padding={10}>
                        <SearchBar
                            containerStyle={{ marginVertical: 10, paddingHorizontal: 0 }}
                            onSubmit={(text) => getFollowers(userInfo.id, text)}
                            onBlurClear={() => getFollowers(userInfo.id)}
                        />
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
                            renderItem={renderFollowerItem}
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
                        />
                    </Container>
                </TabScreen>
                <TabScreen label={`${following.meta.total} Following`}>
                    <Container padding={10}>
                        <SearchBar
                            containerStyle={{ marginVertical: 10, paddingHorizontal: 0 }}
                            onSubmit={(text) => getFollowing(userInfo.id, text)}
                            onBlurClear={() => getFollowing(userInfo.id)}
                        />
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={loading}
                                    onRefresh={() => getFollowing(userInfo.id)}
                                />
                            }
                            ref={flatListRef}
                            style={{ flex: 0 }}
                            data={following.data}
                            renderItem={renderFollowingItem}
                            showsVerticalScrollIndicator={false}
                            onEndReached={() => {
                                if (following.data.length < 30 && !loading) {
                                    moreFollowing()
                                }
                            }}
                            onEndReachedThreshold={0}
                            ListFooterComponent={
                                <LoadMore
                                    onLoadMorePress={() => {
                                        moreFollowing(true)
                                        scrollToTop()
                                    }}
                                    isLoading={following.data.length >= 30 && !loading}
                                />
                            }
                            ListEmptyComponent={ListEmptyComponent}
                        />
                    </Container>
                </TabScreen>
            </Tabs>
            {/* MODALS */}
            <FollowingAction
                visible={showFollowingAction}
                user={selectedUser}
                onDismiss={() => {
                    setShowFollowingAction(false)
                    setSelectedUser({})
                }}
                onUnFollowPress={handleUnFollowPress}
            />
            <FollowersAction
                visible={showFollowerAction}
                user={selectedUser}
                onDismiss={() => {
                    setShowFollowerAction(false)
                    setSelectedUser({})
                }}
                onRemovePress={handleRemovePress}
            />
            <Snackbar
                visible={snackBarMessage ? true : false}
                onDismiss={() => hideSnackBar()}
                duration={3000}
                style={{ backgroundColor: Colors.black }}
            >
                <Text color={Colors.white}>{snackBarMessage}</Text>
            </Snackbar>
        </SafeAreaView>
    )
}

export default FollowScreen

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
