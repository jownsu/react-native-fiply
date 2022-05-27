import {
    StyleSheet,
    View,
    FlatList,
    RefreshControl,
    TouchableOpacity,
    BackHandler,
} from 'react-native'
import React, { useState, useEffect, useMemo, useContext, useRef } from 'react'
import PostContext from '../../api/context/posts/PostContext'
import { Avatar } from 'react-native-paper'
import { Container, Text, SafeAreaView } from '../components/FiplyComponents'
import LoadMore from '../components/lists/LoadMore'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import Colors from '../../utils/Colors'
import NoData from '../components/NoData'

const UpVotesScreen = ({ navigation, route }) => {
    const { postId } = route.params
    const { upVotes, getUpVotes, moreUpVotes, loading } = useContext(PostContext)

    const flatListRef = useRef(null)

    const handleBackPress = () => {
        showBottomNav()
        navigation.pop()
    }

    const showBottomNav = () => {
        navigation.getParent().setOptions({
            tabBarStyle: {
                display: 'flex',
                borderTopWidth: 1,
                elevation: 0,
            },
        })
    }

    const scrollToTop = () => {
        flatListRef.current.scrollToOffset({
            animated: true,
            offset: 0,
        })
    }

    const onEndReached = () => {
        if (upVotes.data.length < 30 && !loading) {
            moreUpVotes()
        }
    }

    useEffect(() => {
        getUpVotes(postId)
        BackHandler.addEventListener('hardwareBackPress', showBottomNav)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', showBottomNav)
        }
    }, [])

    const renderItem = ({ item }) => {
        return (
            <View style={styles.listContainer}>
                <Avatar.Image
                    size={40}
                    source={{ uri: item.avatar }}
                    backgroundColor={Colors.light}
                    style={styles.avatarContainer}
                />
                <Text adjustsFontSizeToFit numberOfLines={1}>
                    {item.name}
                </Text>
            </View>
        )
    }

    const ListEmptyComponent = useMemo(() => {
        return <NoData noDataMessage="No Likes" />
    }, [])

    const ListFooterComponent = () => {
        return (
            <LoadMore
                onLoadMorePress={() => {
                    moreUpVotes(true)
                    scrollToTop()
                }}
                isLoading={upVotes.data.length >= 30 && !loading}
            />
        )
    }

    return (
        <SafeAreaView flex>
            <Container padding={10}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.backContainer}
                    onPress={handleBackPress}
                >
                    <MaterialIcons name="arrow-back" size={16} color={Colors.white} />
                </TouchableOpacity>
                <View style={styles.headerContainer}>
                    <Text weight="medium">{upVotes.meta.total}</Text>
                    <AntDesign
                        style={{ marginLeft: 5 }}
                        name="like1"
                        size={16}
                        color={Colors.secondary}
                    />
                </View>
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={() => getUpVotes(postId)} />
                    }
                    ref={flatListRef}
                    style={{ flex: 0 }}
                    data={upVotes.data}
                    renderItem={renderItem}
                    ListEmptyComponent={ListEmptyComponent}
                    ListFooterComponent={ListFooterComponent}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0}
                />
            </Container>
        </SafeAreaView>
    )
}

export default UpVotesScreen

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        marginBottom: 10,
    },
    listContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    commentContainer: {
        backgroundColor: Colors.lighter,
        borderWidth: 1,
        borderColor: Colors.light,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexGrow: 1,
        flex: 1,
        marginLeft: 10,
        borderRadius: 7,
    },
    closeBtn: { position: 'absolute', right: 0, padding: 10 },
    backContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 25,
        width: 25,
        backgroundColor: 'rgba(0,0,0,.5)',
        borderRadius: 50,
    },
    avatarContainer: {
        marginRight: 5,
    },
})
