import React, { useRef, useEffect, useState, useMemo, useContext } from 'react'

import { StyleSheet, View, TouchableOpacity, FlatList, RefreshControl, Alert } from 'react-native'
import { Snackbar } from 'react-native-paper'
import PostContext from '../../../api/context/posts/PostContext'
import CommentContext from '../../../api/context/comments/CommentContext'
import AuthContext from '../../../api/context/auth/AuthContext'
import { SafeAreaView, Container, Text, ActivityIndicator } from '../../components/FiplyComponents'
import NoData from '../../components/NoData'
import SearchBar from '../../components/headers/SearchBar'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'
import PostItem from '../../components/lists/PostItem'
import LoadMore from '../../components/lists/LoadMore'
import PostAction from '../../components/modals/PostAction'
import CreatePostBar from '../../components/headers/CreatePostBar'

const HomeScreen = ({ navigation }, offset) => {
    const {
        posts,
        getPosts,
        loading,
        morePosts,
        toggleUpVote,
        savePost,
        snackBarMessage,
        hideSnackBar,
    } = useContext(PostContext)
    const { getComments } = useContext(CommentContext)
    const { user } = useContext(AuthContext)
    const [selectedPostId, setSelectedPostId] = useState(0)
    const [showPostActions, setShowPostActions] = useState(false)
    const flatListRef = useRef(null)

    const handleDotPress = (id) => {
        setSelectedPostId(id)
        setShowPostActions(true)
    }

    const handleCreatePostPress = () => {
        if (user.account_level == 0) {
            Alert.alert('Not Verified', 'This is not available for basic users')
        } else {
            //setShowCreatePost(true)
            navigation.getParent().setOptions({
                tabBarStyle: { display: 'none' },
            })
            navigation.push('CreatePostScreen')
        }
    }

    const ListHeaderComponent = useMemo(() => {
        return (
            <CreatePostBar
                onPhotoPress={() => navigation.push('CreateJobScreen')}
                onVideoPress={() => navigation.push('CreateQuestionnaireScreen')}
                onFilePress={() => {}}
                onInputPress={handleCreatePostPress}
                style={{ marginHorizontal: 10, marginTop: 10, borderRadius: 10 }}
            />
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
                {posts.data.length != 0 ? (
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={() => getPosts()} />
                        }
                        onScroll={(e) => onScroll(e)}
                        style={{ flex: 0 }}
                        ref={flatListRef}
                        data={posts.data}
                        keyExtractor={(item) => item.id}
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
})
