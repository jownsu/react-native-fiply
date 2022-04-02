import React, { useState, useEffect, useCallback, useContext, useRef, memo, useMemo } from 'react'
import { StyleSheet, View, TouchableOpacity, RefreshControl, FlatList, Image } from 'react-native'
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

import ProfileHeader from '../../components/profile/ProfileHeader'
import CardInfo from '../../components/profile/CardInfo'
import TitleFilter from '../../components/headers/TitleFilter'
import TopNavigation from '../../components/headers/TopNavigation'
import PostFilterDialog from '../../components/dialog/PostFilterDialog'
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
    } = useContext(PostContext)
    const { getComments, loading: commentLoading } = useContext(CommentContext)

    const [showModal, setShowModal] = useState(false)
    const [navIndex, setNavIndex] = useState(0)
    const [showCreatePost, setShowCreatePost] = useState(false)
    const [selectedPost, setSelectedPost] = useState({ content: '' })
    const [showConfirmation, setShowConfirmation] = useState(false)

    const bottomSheetModalRef = useRef(null)
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present()
    }, [])

    const handleClosePress = () => bottomSheetModalRef.current.close()

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

    const handleDotPress = (postItem) => {
        setSelectedPost(postItem)
        handlePresentModalPress()
    }

    const handleCommentPress = (item) => {
        getComments(item.id)
        navigation.push('CommentScreen', { post: item })
    }

    const handleUpVotePress = (id) => toggleUpVote(id)

    const handleMorePostPress = () => {
        morePosts(true)
        flatListRef.current.scrollToOffset({
            animated: true,
            offset: 0,
        })
    }

    const ListFooterComponent = useMemo(() => {
        return posts.data.length >= 30 ? (
            <TouchableOpacity onPress={handleMorePostPress}>
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
            <ActivityIndicator visible={postLoading} />
        )
    }, [postLoading])

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
                <TitleFilter title={'Posts'} onFilterPress={() => setShowModal(true)} />
                <FlatList
                    data={posts.data}
                    renderItem={renderPostItem}
                    nestedScrollEnabled={true}
                    onEndReached={morePosts}
                    onEndReachedThreshold={0}
                    ListEmptyComponent={!postLoading && posts.data.length == 0 && <NoData />}
                    ListFooterComponent={ListFooterComponent}
                    progressViewOffset={10}
                />
                <PostFilterDialog visible={showModal} onDismiss={() => setShowModal(false)} />
            </View>
        )
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
                    <RefreshControl refreshing={loading} onRefresh={() => getUserInfo()} />
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
                            onFollowerPress={() => {
                                if (followers.data.length == 0) {
                                    getFollowers(userId)
                                }
                                navigation.push('FollowersScreen')
                            }}
                            onFollowingPress={() => {
                                if (following.data.length == 0) {
                                    getFollowing(userId)
                                }
                                navigation.push('FollowingScreen')
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

            <BottomSheetModal bottomSheetModalRef={bottomSheetModalRef} pointsSnap={[225]}>
                <View style={styles.btmSheetContainer}>
                    <TouchableOpacity
                        style={styles.btmActionContainer}
                        onPress={() => {
                            setShowCreatePost(true)
                            handleClosePress()
                        }}
                    >
                        <FontAwesome5
                            name="edit"
                            size={23}
                            color={Colors.black}
                            style={styles.btmActionBtn}
                        />
                        <Text weight="medium" color={Colors.black}>
                            Edit Post
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btmActionContainer}
                        onPress={() => {
                            setShowConfirmation(true)
                            handleClosePress()
                        }}
                    >
                        <FontAwesome
                            name="trash-o"
                            size={29}
                            color={Colors.black}
                            style={styles.btmActionBtn}
                        />
                        <Text weight="medium" color={Colors.black}>
                            Delete Post
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btmActionContainer}>
                        <FontAwesome5
                            name="font-awesome-flag"
                            size={23}
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
                            size={23}
                            color={Colors.black}
                            style={styles.btmActionBtn}
                        />
                        <Text weight="medium" color={Colors.black}>
                            Improve my feed
                        </Text>
                    </TouchableOpacity>
                </View>
            </BottomSheetModal>
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
