import React, { useState, useContext, useEffect, useRef } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions, FlatList, RefreshControl } from 'react-native'
import { SafeAreaView, Text, Container, ActivityIndicator } from '../../components/FiplyComponents'
import NoData from '../../components/NoData'
import SearchHeader from '../../components/headers/SearchHeader'
import Colors from '../../../utils/Colors'
import { FontAwesome } from '@expo/vector-icons'
import TitleFilter from '../../components/headers/TitleFilter'
import TopNavigation from '../../components/headers/TopNavigation'
import CommunityContext from '../../../api/context/community/CommunityContext'
import LoadMore from '../../../views/components/lists/LoadMore'

import UserItem from '../../components/lists/UserItem'

const CommunityScreen = ({ navigation }, offset) => {
    const {
        users,
        followedUsers,
        getUsers,
        moreUsers,
        getFollowedUsers,
        moreFollowedUsers,
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
            onFollowPress={(id) => alert(`Followed ${id}`)}
            onViewPress={(id) => alert(`Viewed ${id}`)}
            showView={dataType != 'discover'}
        />
    )

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

            default:
                return <Text>Wala pa </Text>
        }
    }

    return (
        <SafeAreaView flex>
            <SearchHeader
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
                    navTitles={['Discover', 'Followed', 'Companies', 'Requests']}
                    onBtnPress={handleTopNavigationPress}
                />

                {renderFlatList(dataType)}
            </Container>
        </SafeAreaView>
    )
}

export default CommunityScreen
