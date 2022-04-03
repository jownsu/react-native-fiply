import React, { useCallback, useRef, useEffect, useState, memo, useMemo, useContext } from 'react'

import { StyleSheet, View, TouchableOpacity, FlatList, RefreshControl, Alert } from 'react-native'
import { Snackbar } from 'react-native-paper'
import PostContext from '../../../api/context/posts/PostContext'
import CommentContext from '../../../api/context/comments/CommentContext'
import AuthContext from '../../../api/context/auth/AuthContext'
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
import CreatePost from '../../components/modals/CreatePost'
import LoadMore from '../../components/lists/LoadMore'
import PostAction from '../../components/modals/PostAction'

const HomeScreen = ({ navigation }, offset) => {
    const {
        posts,
        getPosts,
        loading,
        morePosts,
        createPost,
        toggleUpVote,
        savePost,
        snackBarMessage,
        hideSnackBar,
    } = useContext(PostContext)
    const { getComments } = useContext(CommentContext)
    const { user } = useContext(AuthContext)
    const [selectedPostId, setSelectedPostId] = useState(0)
    const [showCreatePost, setShowCreatePost] = useState(false)
    const [showPostActions, setShowPostActions] = useState(false)
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

    const handleDotPress = (id) => {
        setSelectedPostId(id)
        setShowPostActions(true)
    }

    const handleCreatePostPress = () => {
        if (user.account_level == 0) {
            Alert.alert('Not Verified', 'This is not available for basic users')
        } else {
            setShowCreatePost(true)
        }
    }

    const ListHeaderComponent = useMemo(() => {
        return (
            <View style={createPostySTyles.createPostContainer}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={[
                        createPostySTyles.textInputContainer,
                        user.account_level == 0 ? { backgroundColor: Colors.light } : {},
                    ]}
                    onPress={handleCreatePostPress}
                >
                    <Text>Create a post</Text>
                </TouchableOpacity>

                <View style={createPostySTyles.postActionContainer}>
                    <TouchableOpacity
                        style={createPostySTyles.actionBtn}
                        onPress={() => navigation.navigate('CreateJobScreen')}
                    >
                        <FontAwesome name="picture-o" size={24} color={Colors.secondary} />
                        <Text weight="medium" size={12} style={styles.actionText}>
                            Photo
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={createPostySTyles.actionBtn}
                        onPress={() => navigation.navigate('CreateQuestionnaireScreen')}
                    >
                        <FontAwesome name="video-camera" size={24} color={Colors.black} />
                        <Text weight="medium" size={12} style={styles.actionText}>
                            Video
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={createPostySTyles.actionBtn}>
                        <FontAwesome5 name="paperclip" size={24} color={Colors.primary} />
                        <Text weight="medium" size={12} style={styles.actionText}>
                            File
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }, [])

    const scrollToTop = () => {
        flatListRef.current.scrollToOffset({
            animated: true,
            offset: 0,
        })
    }

    const ListEmptyComponent = () => {
        return <NoData />
    }

    const renderItem = ({ item }) => {
        return (
            <PostItem
                data={item}
                // onDotPress={handlePresentModalPress}
                onDotPress={() => handleDotPress(item.id)}
                onAvatarPress={handleAvatarPress}
                onCommentPress={() => handleCommentPress(item)}
                onUpVotePress={handleUpVotePress}
            />
        )
    }

    const handleAvatarPress = (id) => navigation.navigate('ProfileStack', { userId: id })

    const handleCommentPress = (item) => {
        navigation.getParent().setOptions({
            tabBarStyle: { display: 'none' },
        })
        getComments(item.id)
        navigation.push('CommentScreen', { post: item })
    }

    const handleUpVotePress = (id) => toggleUpVote(id)

    const onEndReached = () => {
        if (posts.data.length < 30 && !loading) {
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
                {posts.data.length != 0 ? (
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={() => getPosts()} />
                        }
                        onScroll={(e) => onScroll(e)}
                        style={{ flex: 0 }}
                        ref={flatListRef}
                        data={posts.data}
                        renderItem={renderItem}
                        ListHeaderComponent={ListHeaderComponent}
                        ListFooterComponent={
                            <LoadMore
                                onLoadMorePress={() => {
                                    morePosts(true)
                                    scrollToTop()
                                }}
                                isLoading={posts.data.length >= 30 && !loading}
                            />
                        }
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

            <PostAction
                visible={showPostActions}
                onDismiss={() => {
                    setSelectedPostId(0)
                    setShowPostActions(false)
                }}
                onSavePress={() => {
                    savePost(selectedPostId)
                    setShowPostActions(false)
                }}
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
        marginLeft: 5,
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
        flexDirection: 'row',
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
