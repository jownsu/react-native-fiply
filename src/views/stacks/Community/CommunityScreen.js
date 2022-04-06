import React, { useState, useContext, useEffect, useRef } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions, FlatList, RefreshControl } from 'react-native'
import { SafeAreaView, Text, Container, ActivityIndicator } from '../../components/FiplyComponents'
import NoData from '../../components/NoData'
import SearchBar from '../../components/headers/SearchBar'
import Colors from '../../../utils/Colors'
import { FontAwesome } from '@expo/vector-icons'
import TitleFilter from '../../components/headers/TitleFilter'
import TopNavigation from '../../components/headers/TopNavigation'
import CommunityContext from '../../../api/context/community/CommunityContext'
import LoadMore from '../../../views/components/lists/LoadMore'
import { Snackbar } from 'react-native-paper'

import UserItem from '../../components/lists/UserItem'
import FollowerRequestItem from '../../components/lists/FollowerRequestItem'
import PendingRequestItem from '../../components/lists/PendingRequestItem'

const CommunityScreen = ({ navigation }, offset) => {
    const {
        users,
        followedUsers,
        followerRequests,
        pendingRequests,
        getUsers,
        moreUsers,
        follow,
        unFollow,
        getFollowedUsers,
        moreFollowedUsers,
        getFollowerRequests,
        moreFollowerRequests,
        getPendingRequests,
        morePendingRequests,
        acceptFollower,
        snackBarMessage,
        hideSnackBar,
        loading,
    } = useContext(CommunityContext)
    const [dataType, setDataType] = useState('discover')

    const flatListRef = useRef(null)

    useEffect(() => {
        getUsers()
    }, [])

    const scrollToTop = () => {
        flatListRef.current.scrollToOffset({
            animated: true,
            offset: 0,
        })
    }

    const renderItem = ({ item }) => (
        <UserItem
            data={item}
            onFollowPress={handleFollowPress}
            onViewPress={(id) => alert(`Viewed ${id}`)}
            showView={dataType != 'discover'}
        />
    )

    const handleFollowPress = (id) => {
        follow(id)
    }

    const renderPendingRequestItem = ({ item }) => (
        <PendingRequestItem data={item} onCancelPress={handleCancelPress} />
    )

    const handleCancelPress = (id) => {
        unFollow(id)
    }

    const renderFollowerRequestItem = ({ item }) => (
        <FollowerRequestItem
            data={item}
            onConfirmPress={handleConfirmPress}
            onDeletePress={(id) => {
                alert(id)
            }}
        />
    )

    const handleConfirmPress = (id) => {
        acceptFollower(id)
    }

    const handleTopNavigationPress = (id) => {
        switch (id) {
            case 0:
                if (users.length == 0) {
                    getUsers()
                }
                setDataType('discover')
                break
            case 1:
                if (followedUsers.data.length == 0) {
                    getFollowedUsers()
                }
                setDataType('followed')
                break
            case 2:
                if (pendingRequests.data.length == 0) {
                    getPendingRequests()
                }
                setDataType('pending_requests')
                break
            case 3:
                if (followerRequests.data.length == 0) {
                    getFollowerRequests()
                }
                setDataType('follower_requests')
                break
        }
        scrollToTop()
    }

    const ListEmptyComponent = () => (!loading ? <NoData /> : null)

    const onScroll = (e) => {
        const currentOffset = e.nativeEvent.contentOffset.y
        const dif = currentOffset - (offset || 0)

        if (dif < 0) {
            navigation.getParent().setOptions({
                tabBarStyle: {
                    display: 'flex',
                    borderTopWidth: 1,
                    elevation: 0,
                },
            })
        } else {
            navigation.getParent().setOptions({
                tabBarStyle: { display: 'none' },
            })
        }
        // console.log('dif=',dif);
        offset = currentOffset
    }

    const renderFlatList = () => {
        switch (dataType) {
            case 'discover':
                return (
                    <FlatList
                        key={1}
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={() => getUsers()} />
                        }
                        onScroll={(e) => onScroll(e)}
                        style={{ flex: 0 }}
                        ref={flatListRef}
                        data={users.data}
                        renderItem={renderItem}
                        onEndReached={() => {
                            if (users.data.length < 30 && !loading) {
                                moreUsers()
                            }
                        }}
                        onEndReachedThreshold={0}
                        ListFooterComponent={
                            <LoadMore
                                onLoadMorePress={() => {
                                    moreUsers(true)
                                    scrollToTop()
                                }}
                                isLoading={users.data.length >= 30 && !loading}
                            />
                        }
                        ListEmptyComponent={ListEmptyComponent}
                        numColumns={2}
                    />
                )

            case 'followed':
                return (
                    <FlatList
                        key={2}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={() => getFollowedUsers()}
                            />
                        }
                        onScroll={(e) => onScroll(e)}
                        style={{ flex: 0 }}
                        ref={flatListRef}
                        data={followedUsers.data}
                        renderItem={renderItem}
                        onEndReached={() => {
                            if (followedUsers.data.length < 30 && !loading) {
                                moreFollowedUsers()
                            }
                        }}
                        onEndReachedThreshold={0}
                        ListFooterComponent={
                            <LoadMore
                                onLoadMorePress={() => {
                                    moreFollowedUsers(true)
                                    scrollToTop()
                                }}
                                isLoading={followedUsers.data.length >= 30 && !loading}
                            />
                        }
                        ListEmptyComponent={ListEmptyComponent}
                        numColumns={2}
                    />
                )

            case 'pending_requests':
                return (
                    <FlatList
                        key={3}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={() => getPendingRequests()}
                            />
                        }
                        onScroll={(e) => onScroll(e)}
                        style={{ flex: 0 }}
                        ref={flatListRef}
                        data={pendingRequests.data}
                        renderItem={renderPendingRequestItem}
                        onEndReached={() => {
                            if (pendingRequests.data.length < 30 && !loading) {
                                morePendingRequests()
                            }
                        }}
                        onEndReachedThreshold={0}
                        ListFooterComponent={
                            <LoadMore
                                onLoadMorePress={() => {
                                    morePendingRequests(true)
                                    scrollToTop()
                                }}
                                isLoading={pendingRequests.data.length >= 30 && !loading}
                            />
                        }
                        ListEmptyComponent={ListEmptyComponent}
                        numColumns={1}
                    />
                )

            case 'follower_requests':
                return (
                    <FlatList
                        key={4}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={() => getFollowerRequests()}
                            />
                        }
                        onScroll={(e) => onScroll(e)}
                        style={{ flex: 0 }}
                        ref={flatListRef}
                        data={followerRequests.data}
                        renderItem={renderFollowerRequestItem}
                        onEndReached={() => {
                            if (followerRequests.data.length < 30 && !loading) {
                                moreFollowerRequests()
                            }
                        }}
                        onEndReachedThreshold={0}
                        ListFooterComponent={
                            <LoadMore
                                onLoadMorePress={() => {
                                    moreFollowerRequests(true)
                                    scrollToTop()
                                }}
                                isLoading={followerRequests.data.length >= 30 && !loading}
                            />
                        }
                        ListEmptyComponent={ListEmptyComponent}
                        numColumns={1}
                    />
                )

            default:
                return <Text>Wala pa </Text>
        }
    }

    return (
        <SafeAreaView flex>
            <SearchBar
                rightIcon={() => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MessageStack')}
                        activeOpacity={0.5}
                    >
                        <FontAwesome name="paper-plane" size={24} color={Colors.secondary} />
                    </TouchableOpacity>
                )}
            />

            <Container style={{ paddingHorizontal: 0 }}>
                <TitleFilter title="COMMUNITY" titleColor={Colors.primary} hideLine />

                <TopNavigation
                    navTitles={['Discover', 'Followed', 'Pending', 'Requests']}
                    onBtnPress={handleTopNavigationPress}
                />

                {renderFlatList(dataType)}
                <Snackbar
                    visible={snackBarMessage ? true : false}
                    onDismiss={() => hideSnackBar()}
                    duration={3000}
                    style={{ backgroundColor: Colors.black }}
                >
                    <Text color={Colors.white}>{snackBarMessage}</Text>
                </Snackbar>
            </Container>
        </SafeAreaView>
    )
}

export default CommunityScreen
