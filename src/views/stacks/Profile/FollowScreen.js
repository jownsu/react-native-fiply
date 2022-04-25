import React, { useContext, useRef, useState } from 'react'
import { FlatList, RefreshControl, useWindowDimensions } from 'react-native'
import { Snackbar } from 'react-native-paper'

import { SafeAreaView, Text, Container, SecondaryButton } from '../../components/FiplyComponents'
import Header from '../../components/headers/Header'
import ProfileContext from '../../../api/context/profile/ProfileContext'
import FollowContext from '../../../api/context/follow/FollowContext'
import SearchBar from '../../components/headers/SearchBar'
import Colors from '../../../utils/Colors'
import LoadMore from '../../components/lists/LoadMore'
import NoData from '../../components/NoData'
import FollowingAction from '../../components/modals/FollowingAction'
import FollowersAction from '../../components/modals/FollowersAction'
import CancelFollowAction from '../../components/modals/CancelFollowAction'
import FollowingItem from '../../components/lists/FollowingItem'
import FollowerItem from '../../components/lists/FollowerItem'

import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

const FollowScreen = ({ navigation, route }) => {
    const { userInfo } = useContext(ProfileContext)
    const {
        followers,
        following,
        getFollowers,
        getFollowing,
        moreFollowers,
        moreFollowing,
        unFollow,
        follow,
        cancelFollowRequest,
        removeFollower,
        snackBarMessage,
        hideSnackBar,
        loading,
    } = useContext(FollowContext)

    const [showFollowingAction, setShowFollowingAction] = useState(false)
    const [showFollowerAction, setShowFollowerAction] = useState(false)
    const [showCancelFollowAction, setShowCancelFollowAction] = useState(false)
    const [selectedUser, setSelectedUser] = useState({ item: {}, type: {} })

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

    // modal functions

    const handleFollowingBtnPress = (item, type) => {
        setShowFollowingAction(true)
        setSelectedUser({ item, type })
    }

    const handleFollowerBtnPress = (item, type) => {
        setShowFollowerAction(true)
        setSelectedUser({ item, type })
    }

    const handlePendingBtnPress = (item, type) => {
        setShowCancelFollowAction(true)
        setSelectedUser({ item, type })
    }

    //actions functions

    const handleFollowBtnPress = (item, type) => {
        follow(item.id, type)
    }

    const handleUnFollowPress = (id) => {
        unFollow(id, userInfo.is_me, selectedUser.type)
        setSelectedUser({ item: {}, type: {} })
        setShowFollowingAction(false)
    }

    const handleRemovePress = (id) => {
        removeFollower(id)
        setSelectedUser({ item: {}, type: {} })
        setShowFollowerAction(false)
    }

    const handleCancelFollowPress = (id) => {
        cancelFollowRequest(id, selectedUser.type)
        setSelectedUser({ item: {}, type: {} })
        setShowCancelFollowAction(false)
    }

    const renderFollowingItem = ({ item }) => {
        return (
            <FollowingItem
                item={item}
                onPendingtBtnPress={(item) => handlePendingBtnPress(item, 'followingItem')}
                onFollowingBtnPress={(item) => handleFollowingBtnPress(item, 'followingItem')}
                onFollowBtnPress={(item) => handleFollowBtnPress(item, 'followingItem')}
            />
        )
    }

    const renderFollowerItem = ({ item }) => {
        return (
            <FollowerItem
                item={item}
                is_me={userInfo.is_me}
                onPendingtBtnPress={(item) => handlePendingBtnPress(item, 'followerItem')}
                onFollowingBtnPress={(item) => handleFollowingBtnPress(item, 'followerItem')}
                onFollowBtnPress={(item) => handleFollowBtnPress(item, 'followerItem')}
                onRemoveBtnPress={handleFollowerBtnPress}
            />
        )
    }

    const FollowersRoute = () => (
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
    )

    const FollowingRoute = () => (
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
    )

    const renderScene = SceneMap({
        following: FollowingRoute,
        follower: FollowersRoute,
    })

    const layout = useWindowDimensions()

    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'following', title: `Following` },
        { key: 'follower', title: `Followers` },
    ])

    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: Colors.primary }}
            style={{ backgroundColor: Colors.white }}
            labelStyle={{
                color: Colors.black,
                fontFamily: 'EncodeSansExpaded-Medium',
                textTransform: 'none',
            }}
            renderLabel={({ route }) => {
                return route.title == 'Following' ? (
                    <Text>
                        {following.meta.total} {route.title}
                    </Text>
                ) : (
                    <Text>
                        {followers.meta.total} {route.title}
                    </Text>
                )
            }}
            inactiveColor={'black'}
            activeColor={Colors.primary}
        />
    )

    return (
        <SafeAreaView statusBarColor={Colors.white} flex>
            <Header
                title={userInfo.name}
                style={{ backgroundColor: Colors.white }}
                onBackPress={() => navigation.pop()}
            />

            <TabView
                lazy
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />

            {/* MODALS */}

            <FollowingAction
                visible={showFollowingAction}
                user={selectedUser.item}
                onDismiss={() => {
                    setShowFollowingAction(false)
                    setSelectedUser({ item: {}, type: {} })
                }}
                onUnFollowPress={handleUnFollowPress}
            />

            <FollowersAction
                visible={showFollowerAction}
                user={selectedUser.item}
                onDismiss={() => {
                    setShowFollowerAction(false)
                    setSelectedUser({ item: {}, type: {} })
                }}
                onRemovePress={handleRemovePress}
            />

            <CancelFollowAction
                visible={showCancelFollowAction}
                user={selectedUser.item}
                onDismiss={() => {
                    setShowCancelFollowAction(false)
                    setSelectedUser({ item: {}, type: {} })
                }}
                onCancelFollow={handleCancelFollowPress}
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
