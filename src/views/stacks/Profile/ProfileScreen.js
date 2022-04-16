import React, { useState, useEffect, useContext, useRef } from 'react'
import { StyleSheet, FlatList, Alert } from 'react-native'
import { Snackbar } from 'react-native-paper'
import ProfileContext from '../../../api/context/profile/ProfileContext'
import PostContext from '../../../api/context/posts/PostContext'
import CommentContext from '../../../api/context/comments/CommentContext'
import FollowContext from '../../../api/context/follow/FollowContext'
import { Text, Container } from '../../components/FiplyComponents'
import Colors from '../../../utils/Colors'
import LoadMore from '../../components/lists/LoadMore'
import CreatePostBar from '../../components/headers/CreatePostBar'

import ProfileHeader from '../../components/profile/ProfileHeader'
import TitleFilter from '../../components/headers/TitleFilter'
import PostFilterAction from '../../components/modals/PostFilterAction'
import MyPostAction from '../../components/modals/MyPostAction'
import UnSavePostAction from '../../components/modals/UnSavePostAction'
import PostAction from '../../components/modals/PostAction'
import EditProfileAction from '../../components/modals/EditProfileAction'

import FollowingAction from '../../components/modals/FollowingAction'
import CancelFollowAction from '../../components/modals/CancelFollowAction'

import NoData from '../../components/NoData'
import { default as DeleteConfirmation } from '../../components/dialog/Confirmation'
import PostItem from '../../components/lists/PostItem'

const ProfileScreen = ({ navigation, route }) => {
    const { userId } = route.params

    const {
        userInfo,
        getUserInfo,
        follow,
        unFollow,
        cancelFollowRequest,
        loading,
        getJobPreference,
    } = useContext(ProfileContext)

    const { followers, following, getFollowers, getFollowing } = useContext(FollowContext)
    const {
        posts,
        getPosts,
        loading: postLoading,
        morePosts,
        toggleUpVote,
        deletePost,
        savePost,
        snackBarMessage,
        hideSnackBar,
    } = useContext(PostContext)
    const { getComments, loading: commentLoading } = useContext(CommentContext)

    const [showModal, setShowModal] = useState(false)
    const [postFilter, setPostFilter] = useState('Posts')
    const [postFilterIndex, setPostFilterIndex] = useState(0)

    const [showUnSaveAction, setShowUnSaveAction] = useState(false)
    const [showMyPostAction, setShowMyPostAction] = useState(false)
    const [showPostAction, setShowPostAction] = useState(false)
    const [showEditProfileAction, setShowEditProfileAction] = useState(false)

    const [showFollowingAction, setShowFollowingAction] = useState(false)
    const [showCancelFollowAction, setShowCancelFollowAction] = useState(false)

    const [selectedPost, setSelectedPost] = useState({ content: '' })
    const [showConfirmation, setShowConfirmation] = useState(false)

    const flatListRef = useRef(null)

    const scrollToTop = () => {
        flatListRef.current.scrollToOffset({
            animated: true,
            offset: 0,
        })
    }

    useEffect(() => {
        getUserInfo(userId)
        getPosts('/posts', userId)
    }, [])

    const renderPostItem = ({ item }) => {
        return (
            <PostItem
                data={item}
                onDotPress={handleDotPress}
                onCommentPress={() => handleCommentPress(item)}
                onUpVotePress={handleUpVotePress}
                is_me={userInfo.is_me}
            />
        )
    }

    const handleDotPress = (postItem) => {
        setSelectedPost(postItem)

        switch (true) {
            case postFilter == 'Saved Posts':
                return setShowUnSaveAction(true)
            case userInfo.is_me:
                return setShowMyPostAction(true)
            case !userInfo.is_me:
                return setShowPostAction(true)
            default:
                break
        }
    }

    const handleCommentPress = (item) => {
        getComments(item.id)
        navigation.push('CommentScreen', { post: item })
    }

    const handleUpVotePress = (id) => toggleUpVote(id)

    const onEndReachedActivity = () => {
        if (posts.data.length < 30 && !loading) {
            morePosts()
        }
    }

    const ListFooterComponentActivity = () => {
        return (
            <LoadMore
                onLoadMorePress={() => {
                    morePosts(true)
                    scrollToTop()
                }}
                isLoading={posts.data.length >= 30 && !loading}
            />
        )
    }

    const ListEmptyComponentActivity = () => {
        return !postLoading && posts.data.length == 0 && <NoData />
    }

    const handleUnFollowPress = () => {
        unFollow()
        setShowFollowingAction(false)
    }

    const handleCancelFollowPress = () => {
        cancelFollowRequest()
        setShowCancelFollowAction(false)
    }

    const handleFollowPress = () => {
        follow()
    }

    const handleCreatePostBarInputPress = () => {
        if (userInfo.account_level == 0) {
            Alert.alert('Not Verified', 'This is not available for basic users')
        } else {
            navigation.push('CreatePostScreen')
        }
    }

    return (
        <Container>
            <FlatList
                ref={flatListRef}
                data={posts.data}
                renderItem={renderPostItem}
                ListHeaderComponent={
                    <>
                        <ProfileHeader
                            data={userInfo}
                            onBackPress={() => navigation.pop()}
                            onFollowCountsPress={() => {
                                if (following.data.length == 0) {
                                    getFollowing(userId)
                                }
                                if (followers.data.length == 0) {
                                    getFollowers(userId)
                                }
                                navigation.push('FollowScreen')
                            }}
                            onFollowingPress={() => setShowFollowingAction(true)}
                            onPendingPress={() => setShowCancelFollowAction(true)}
                            onFollowPress={handleFollowPress}
                            // onSettingPress={() => setShowEditProfileAction(true)}
                            onEditProfilePress={() => navigation.push('EditProfileScreen')}
                            onSeeDetailsPress={() => navigation.push('ProfileInfoScreen')}
                        />
                        {userInfo.is_me ? (
                            <CreatePostBar
                                onInputPress={handleCreatePostBarInputPress}
                                style={{ marginTop: 10 }}
                            />
                        ) : null}

                        <TitleFilter title={postFilter} onFilterPress={() => setShowModal(true)} />
                    </>
                }
                nestedScrollEnabled={true}
                onEndReached={onEndReachedActivity}
                onEndReachedThreshold={0}
                ListEmptyComponent={ListEmptyComponentActivity}
                ListFooterComponent={ListFooterComponentActivity}
            />

            {/* MODALS */}

            <PostFilterAction
                visible={showModal}
                onDismiss={() => {
                    setShowModal(false)
                }}
                isMe={userInfo.is_me}
                filterIndex={postFilterIndex}
                onMyPostPress={(text, index) => {
                    getPosts('/posts', userId)
                    setPostFilter(text)
                    setPostFilterIndex(index)
                }}
                onSharedPostPress={() => {}}
                onSavedPostPress={(text, index) => {
                    getPosts('/savedPosts', userId)
                    setPostFilter(text)
                    setPostFilterIndex(index)
                }}
                onMostUpVotedPress={(text, index) => {
                    getPosts('/posts?q=mostUpVoted', userId)
                    setPostFilter(text)
                    setPostFilterIndex(index)
                }}
                onLeastUpVotedPress={(text, index) => {
                    getPosts('/posts?q=leastUpVoted', userId)
                    setPostFilter(text)
                    setPostFilterIndex(index)
                }}
            />

            <DeleteConfirmation
                visible={showConfirmation}
                dialogText="Are you sure to delete this post? It cannot be undone."
                onDismiss={() => setShowConfirmation(false)}
                onOkPress={() => {
                    deletePost(selectedPost.id)
                    setShowConfirmation(false)
                }}
            />

            <MyPostAction
                visible={showMyPostAction}
                onDismiss={() => {
                    setShowMyPostAction(false)
                }}
                onEditPress={() => {
                    navigation.push('CreatePostScreen', { edit: true, data: selectedPost })
                    // setShowEditPost(true)
                    setShowMyPostAction(false)
                }}
                onDeletePress={() => {
                    setShowConfirmation(true)
                    setShowMyPostAction(false)
                }}
            />

            <PostAction
                visible={showPostAction}
                onDismiss={() => {
                    setShowPostAction(false)
                }}
                onSavePress={() => {
                    savePost(selectedPost.id)
                    setShowPostAction(false)
                }}
            />

            <UnSavePostAction
                visible={showUnSaveAction}
                onDismiss={() => {
                    setShowUnSaveAction(false)
                }}
                onUnsavePress={() => {
                    savePost(selectedPost.id, 'unSave')
                    setShowUnSaveAction(false)
                }}
            />

            <FollowingAction
                visible={showFollowingAction}
                user={userInfo}
                onDismiss={() => {
                    setShowFollowingAction(false)
                }}
                onUnFollowPress={handleUnFollowPress}
            />

            <CancelFollowAction
                visible={showCancelFollowAction}
                user={userInfo}
                onDismiss={() => {
                    setShowCancelFollowAction(false)
                }}
                onCancelFollow={handleCancelFollowPress}
            />

            <EditProfileAction
                visible={showEditProfileAction}
                onDismiss={() => setShowEditProfileAction(false)}
                onEditProfilePress={() => {
                    setShowEditProfileAction(false)
                    navigation.push('EditProfileScreen')
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
        </Container>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    gradientView: {
        position: 'absolute',
        height: 125,
        width: '100%',
    },
    cameraContainer: {
        backgroundColor: Colors.light,
        borderRadius: 50,
        right: 0,
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginHorizontal: 10,
        marginBottom: 25,
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
