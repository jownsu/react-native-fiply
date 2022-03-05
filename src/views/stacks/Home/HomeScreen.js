import React, { useCallback, useRef, useEffect, useState, memo, useMemo, useContext } from 'react'

import { StyleSheet, View, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import PostContext from '../../../api/context/posts/PostContext'
import CommentContext from '../../../api/context/comments/CommentContext'
import {
    SafeAreaView,
    Container,
    Text,
    BottomSheetModal,
    ActivityIndicator,
} from '../../components/FiplyComponents'
import NoData from '../../components/NoData'
import SearchHeader from '../../components/headers/SearchHeader'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'
import PostItem from '../../components/lists/PostItem'
import Comments from '../../components/modals/Comments'
import CreatePost from '../../components/modals/CreatePost'

const HomeScreen = ({ navigation }, offset) => {
    const { posts, getPosts, loading, morePosts, createPost, toggleUpVote } =
        useContext(PostContext)
    const { getComments, loading: commentLoading } = useContext(CommentContext)

    const [showComment, setShowComment] = useState(false)
    const [showCreatePost, setShowCreatePost] = useState(false)
    const flatListRef = useRef(null)

    // bottom sheet reference
    const bottomSheetModalRef = useRef(null)

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present()
    }, [])

    const handleClosePress = () => bottomSheetRef.current.close()

    //   const handleSheetChanges = useCallback((index) => {
    //     console.log('handleSheetChanges', index);
    //   }, []);

    const ListHeaderComponent = useMemo(() => {
        return (
            <View style={createPostySTyles.createPostContainer}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={createPostySTyles.textInputContainer}
                    onPress={() => setShowCreatePost(true)}
                >
                    <Text>Create a post</Text>
                </TouchableOpacity>

                <View style={createPostySTyles.postActionContainer}>
                    <TouchableOpacity
                        style={createPostySTyles.actionBtn}
                        onPress={() => navigation.navigate('CreateJobScreen')}
                    >
                        <FontAwesome name="briefcase" size={24} color={Colors.secondary} />
                        <Text weight="medium" style={styles.actionText}>
                            HIRE NOW
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={createPostySTyles.actionBtn}
                        onPress={() => navigation.navigate('CreateQuestionnaireScreen')}
                    >
                        <FontAwesome5 name="calendar-week" size={24} color={Colors.primary} />
                        <Text weight="medium" style={createPostySTyles.actionText}>
                            SET EVENT
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={createPostySTyles.actionBtn}>
                        <FontAwesome5 name="poll" size={24} color={Colors.grey} />
                        <Text weight="medium" style={createPostySTyles.actionText}>
                            POLL
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }, [])

    const ListFooterComponent = useMemo(() => {
        return posts.length >= 30 ? (
            <TouchableOpacity
                onPress={() => {
                    morePosts(true)
                    flatListRef.current.scrollToOffset({
                        animated: true,
                        offset: 0,
                    })
                }}
            >
                <Text
                    weight="medium"
                    color={Colors.secondary}
                    center
                    style={{ marginTop: 10, marginBottom: 20 }}
                >
                    Load More
                </Text>
            </TouchableOpacity>
        ) : (
            <ActivityIndicator visible={loading} />
        )
    }, [loading])

    const ListEmptyComponent = () => {
        return <NoData />
    }

    const renderItem = ({ item }) => {
        return (
            <PostItem
                data={item}
                onDotPress={handlePresentModalPress}
                onAvatarPress={handleAvatarPress}
                onCommentPress={handleCommentPress}
                onUpVotePress={handleUpVotePress}
            />
        )
    }

    const handleAvatarPress = (id) => navigation.navigate('ProfileStack', { userId: id })

    const handleCommentPress = (id) => {
        navigation.getParent().setOptions({
            tabBarStyle: { display: 'none' },
        })
        getComments(id)
        navigation.push('CommentScreen')
    }

    const handleUpVotePress = (id) => toggleUpVote(id)

    const onEndReached = () => {
        if (posts.length < 30 && !loading) {
            morePosts()
        }
    }

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

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <SafeAreaView flex>
            <SearchHeader
                // leftIcon={ () => <FontAwesome5 name="th-large" size={24} color={Colors.grey} />}
                leftIcon={() => (
                    <FontAwesome5
                        name="th-large"
                        size={24}
                        color={Colors.grey}
                        onPress={() => {
                            navigation.setOptions({
                                tabBarStyle: { display: 'none' },
                            })
                        }}
                    />
                )}
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
                {posts.length != 0 ? (
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={() => getPosts()} />
                        }
                        onScroll={(e) => onScroll(e)}
                        style={{ flex: 0 }}
                        ref={flatListRef}
                        data={posts}
                        renderItem={renderItem}
                        ListHeaderComponent={ListHeaderComponent}
                        ListFooterComponent={ListFooterComponent}
                        ListEmptyComponent={ListEmptyComponent}
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0}
                    />
                ) : (
                    <ActivityIndicator visible={true} />
                )}
            </Container>

            <CreatePost
                visible={showCreatePost}
                onPostPress={(postData) => {
                    createPost(postData)
                    setShowCreatePost(false)
                }}
                onRequestClose={() => setShowCreatePost(false)}
            />

            <BottomSheetModal bottomSheetModalRef={bottomSheetModalRef} pointsSnap={[225]}>
                <View style={styles.btmSheetContainer}>
                    <TouchableOpacity style={styles.btmActionContainer}>
                        <FontAwesome
                            name="bookmark"
                            size={28}
                            color={Colors.black}
                            style={styles.btmActionBtn}
                        />
                        <Text weight="medium" color={Colors.black}>
                            Bookmark
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btmActionContainer}>
                        <FontAwesome
                            name="share-alt"
                            size={28}
                            color={Colors.black}
                            style={styles.btmActionBtn}
                        />
                        <Text weight="medium" color={Colors.black}>
                            Share Via
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btmActionContainer}>
                        <FontAwesome5
                            name="font-awesome-flag"
                            size={28}
                            color={Colors.black}
                            style={styles.btmActionBtn}
                        />
                        <Text weight="medium" color={Colors.black}>
                            Report this post
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btmActionContainer}>
                        <FontAwesome
                            name="tasks"
                            size={28}
                            color={Colors.black}
                            style={styles.btmActionBtn}
                        />
                        <Text weight="medium" color={Colors.black}>
                            Improve my feed
                        </Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetModal>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    createPostContainer: {
        backgroundColor: Colors.white,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        borderRadius: 15,
    },
    postActionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    actionBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    actionText: {
        fontSize: 12,
        marginTop: 5,
    },
    textInputContainer: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 100,
        borderColor: Colors.light,
        marginVertical: 10,
    },
    btmSheetContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    btmActionContainer: {
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'center',
    },
    btmActionBtn: {
        width: 40,
    },
})

const createPostySTyles = StyleSheet.create({
    createPostContainer: {
        backgroundColor: Colors.white,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        borderRadius: 15,
        marginHorizontal: 10,
    },
    postActionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    actionBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    actionText: {
        fontSize: 12,
        marginTop: 5,
    },
    textInputContainer: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 100,
        borderColor: Colors.light,
        marginVertical: 10,
    },
    btmSheetContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    btmActionContainer: {
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'center',
    },
    btmActionBtn: {
        width: 40,
    },
})
