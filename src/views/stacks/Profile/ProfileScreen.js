import React, { useState, useEffect, useCallback, useContext, useRef, memo, useMemo } from 'react'
import { StyleSheet, View, TouchableOpacity, RefreshControl, FlatList, Image } from 'react-native'
import { Snackbar } from 'react-native-paper'
import ProfileContext from '../../../api/context/profile/ProfileContext'
import PostContext from '../../../api/context/posts/PostContext'
import CommentContext from '../../../api/context/comments/CommentContext'
import {
    Text,
    BottomSheetModal,
    Container,
    ActivityIndicator,
} from '../../components/FiplyComponents'
import Colors from '../../../utils/Colors'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'
import LoadMore from '../../components/lists/LoadMore'

import ProfileHeader from '../../components/profile/ProfileHeader'
import CardInfo from '../../components/profile/CardInfo'
import TitleFilter from '../../components/headers/TitleFilter'
import TopNavigation from '../../components/headers/TopNavigation'
import PostFilterDialog from '../../components/dialog/PostFilterDialog'
import MyPostAction from '../../components/modals/MyPostAction'
import UnSavePostAction from '../../components/modals/UnSavePostAction'
import PostAction from '../../components/modals/PostAction'

import NoData from '../../components/NoData'
import { default as EditPost } from '../../components/modals/CreatePost'
import { default as DeleteConfirmation } from '../../components/dialog/Confirmation'
import PostItem from '../../components/lists/PostItem'

const ProfileScreen = ({ navigation, route }) => {
    const { userId } = route.params

    const {
        userInfo,
        getUserInfo,
        getExperiences,
        getEducationalBackgrounds,
        getFollowers,
        getFollowing,
        experiences,
        followers,
        following,
        educationalBackgrounds,
        loading,
    } = useContext(ProfileContext)
    const {
        posts,
        getPosts,
        loading: postLoading,
        morePosts,
        toggleUpVote,
        deletePost,
        savePost,
        updatePost,
        snackBarMessage,
        hideSnackBar,
    } = useContext(PostContext)
    const { getComments, loading: commentLoading } = useContext(CommentContext)

    const [showModal, setShowModal] = useState(false)
    const [navIndex, setNavIndex] = useState(0)
    const [postFilter, setPostFilter] = useState('Posts')
    const [postFilterIndex, setPostFilterIndex] = useState(0)

    const [showUnSaveAction, setShowUnSaveAction] = useState(false)
    const [showMyPostAction, setShowMyPostAction] = useState(false)
    const [showPostAction, setShowPostAction] = useState(false)

    const [showCreatePost, setShowCreatePost] = useState(false)
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
            />
        )
    }

    const handleDotPress = (postItem) => {
        setSelectedPost(postItem)

        if (!userInfo.is_me) {
            return setShowPostAction(true)
        }

        if (postFilter == 'Saved Posts') {
            return setShowUnSaveAction(true)
        } else {
            return setShowMyPostAction(true)
        }
    }

    const handleCommentPress = (item) => {
        getComments(item.id)
        navigation.push('CommentScreen', { post: item })
    }

    const renderBackgroundItem = ({ item, index }) => (
        <CardInfo
            key={index}
            title="Work Experience"
            headers={[
                'Company',
                'Location',
                'Title',
                'Employment Type',
                'Date Started',
                'Date Ended',
            ]}
            infos={{
                company: item.company,
                location: item.location,
                title: item.job_title,
                employment_type: item.employment_type,
                starting_date: item.starting_date,
                completion_date: item.completion_date,
            }}
        />
    )

    const renderEducationItem = ({ item, index }) => (
        <CardInfo
            key={index}
            title="Education"
            headers={['University', 'Degree', 'Field of Study', 'Starting Date', 'Completion Date']}
            infos={{
                university: item.university,
                degree: item.degree,
                fieldOfStudy: item.field_of_study,
                startingDate: item.starting_date,
                completionDate: item.completion_date,
            }}
        />
    )

    const handleUpVotePress = (id) => toggleUpVote(id)

    const About = () => {
        return (
            <Container padding={10}>
                {!loading ? (
                    <>
                        <CardInfo
                            title={'Basic Information'}
                            headers={['Gender', 'Age', 'Birthday', 'Language', 'Status']}
                            infos={{
                                gender: userInfo.gender,
                                age: userInfo.age,
                                birthday: userInfo.birthday,
                                language: userInfo.language,
                                status: userInfo.status,
                            }}
                        />
                        <CardInfo
                            title={'Contact Information'}
                            headers={['Mobile', 'Telephone', 'Email', 'Website']}
                            infos={{
                                mobile: userInfo.mobile_no,
                                telephone: userInfo.telephone_no,
                                email: userInfo.email,
                                website: userInfo.website,
                            }}
                        />
                    </>
                ) : (
                    <ActivityIndicator visible={true} />
                )}
            </Container>
        )
    }

    const Background = () => {
        return (
            <Container padding={10}>
                <FlatList
                    data={experiences}
                    renderItem={renderBackgroundItem}
                    ListEmptyComponent={!loading && experiences.length == 0 && <NoData />}
                />
            </Container>
        )
    }

    const Activity = () => {
        return (
            <View style={{ flex: 1 }}>
                <TitleFilter title={postFilter} onFilterPress={() => setShowModal(true)} />
                <FlatList
                    ref={flatListRef}
                    data={posts.data}
                    renderItem={renderPostItem}
                    nestedScrollEnabled={true}
                    onEndReached={onEndReachedActivity}
                    onEndReachedThreshold={0}
                    ListEmptyComponent={ListEmptyComponentActivity}
                    ListFooterComponent={ListFooterComponentActivity}
                />
            </View>
        )
    }

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

    const Education = () => {
        return (
            <Container padding={10}>
                <FlatList
                    data={educationalBackgrounds}
                    renderItem={renderEducationItem}
                    ListEmptyComponent={
                        !loading && educationalBackgrounds.length == 0 && <NoData />
                    }
                />
            </Container>
        )
    }

    const renderInfo = (id) => {
        switch (id) {
            case 0:
                return <Activity />
            case 1:
                return <About />
            case 2:
                return <Background />
            case 3:
                return <Education />
            default:
                break
        }
    }

    const getData = (id) => {
        switch (id) {
            case 0:
                getPosts('/posts', userId)
            case 2:
                getExperiences()
                break
            case 3:
                getEducationalBackgrounds()
                break
        }
    }

    return (
        <Container>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={postLoading}
                        onRefresh={() => {
                            getPosts('/posts', userId)
                            setPostFilter('Posts')
                            setPostFilterIndex(0)
                        }}
                    />
                }
                ListHeaderComponent={
                    <View>
                        <ProfileHeader
                            data={{
                                fullname: userInfo.fullname,
                                email: userInfo.email,
                                location: userInfo.location,
                                status: userInfo.status ?? 'Not Verified',
                                preview: userInfo.preview,
                                avatar: userInfo.avatar,
                                cover: userInfo.cover,
                                following_count: userInfo.following_count,
                                followers_count: userInfo.followers_count,
                                is_me: userInfo.is_me,
                            }}
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
                        />
                        <TopNavigation
                            navTitles={['Activity', 'About', 'Background', 'Education']}
                            onBtnPress={(i) => {
                                setNavIndex(i)
                                getData(i)
                            }}
                            index={navIndex}
                            style={{
                                marginHorizontal: 10,
                                borderRadius: 0,
                                padding: 0,
                                justifyContent: 'flex-start',
                                marginHorizontal: 0,
                                paddingVertical: 0,
                                borderWidth: 0,
                                borderColor: Colors.light,
                                borderBottomWidth: 2,
                            }}
                            btnStyles={{
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                            }}
                            activeBtnStyle={{
                                borderBottomWidth: 2,
                                borderColor: Colors.primary,
                            }}
                        />

                        {renderInfo(navIndex)}
                    </View>
                }
            />

            {/* MODALS */}

            <PostFilterDialog
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

            <EditPost
                visible={showCreatePost}
                edit
                onEditPress={(postData) => {
                    updatePost(selectedPost.id, postData)
                    setShowCreatePost(false)
                }}
                data={selectedPost}
                onRequestClose={() => {
                    setShowCreatePost(false)
                    setSelectedPost({})
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
                    setShowCreatePost(true)
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
