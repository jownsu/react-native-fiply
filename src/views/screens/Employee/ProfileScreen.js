import React, { useState, useEffect, useCallback, useRef }  from 'react'
import { StyleSheet, View, TouchableOpacity, RefreshControl, FlatList } from 'react-native'
import { Text, FlatList as FFlatList, BottomSheetModal } from '../../components/FiplyComponents'
import Colors from '../../../utils/Colors'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import ProfileHeader from '../../components/profile/ProfileHeader'
import CardInfo from '../../components/profile/CardInfo'
import TitleFilter from '../../components/headers/TitleFilter'
import TopNavigation from '../../components/headers/TopNavigation'
import PostFilterDialog from '../../components/dialog/PostFilterDialog'
import Comments from '../../components/modals/Comments'
import {default as EditPost} from '../../components/modals/CreatePost'
import {default as DeleteConfirmation} from '../../components/dialog/Confirmation'

import useProfile from '../../../api/hooks/user/useProfile'
import useExperience from '../../../api/hooks/user/useExperience'
import useEducationalBackground from '../../../api/hooks/user/useEducationalBackground'
import usePost from '../../../api/hooks/usePost'
import useComment from '../../../api/hooks/useComment'
import PostList from '../../components/lists/PostList'

const ProfileScreen = ({navigation, route}) => {

    const { userId } = route.params
    const [showModal, setShowModal] = useState(false)
    const [navIndex, setNavIndex] = useState(0)
    const [showComment, setShowComment] = useState(false)
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [selectedPost, setSelectedPost] = useState({content: ''})
    const [showConfirmation, setShowConfirmation] = useState(false)

    const { getUserInfo, profile, basicInfo, contactInfo, loading: profileLoading } = useProfile()
    const { getExperiences, experiences, loading : experienceLoading } = useExperience()
    const { getEducationalBackgrounds, educationalBackgrounds, loading: ebLoading } = useEducationalBackground()
    const { posts, getPosts, morePosts, updatePost, deletePost, loading: postLoading } = usePost()
    const { comments, getComments, resetComments, createComment, loading: commentLoading } = useComment()


    const bottomSheetModalRef = useRef(null);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleClosePress = () => bottomSheetModalRef.current.close()


    useEffect(() => {
        getUserInfo(userId)
    }, [])
    
    const renderList = (id) => {
        switch (id) {
            case 0:
                return (
                    <View>
                        <CardInfo
                            title={'Basic Information'}
                            headers={['Gender', 'Age', 'Birthday', 'Language', 'Status']}
                            infos={basicInfo}
                        />
                        <CardInfo
                            title={'Contact Information'}
                            headers={['Mobile', 'Telephone', 'Email', 'Website']}
                            infos={contactInfo}
                        />
                        {/* <CardInfo
                            title={'Job Locations'}
                            headers={['Job Title/s', 'Job Location']}
                            infos={SampleData.profileJobPreference}
                        /> */}
                    </View>
                )
            case 1: 
                return (
                    <View style={{ flex: 1 }}>
                        <TitleFilter 
                            title={'Posts'}
                            onFilterPress={() => setShowModal(true)}
                        />
                        
                        <FFlatList
                            data={posts}
                            renderItem={item => (
                                <PostList 
                                    data={item} 
                                    handleDotPress={(postItem) => {
                                        setSelectedPost(postItem)
                                        handlePresentModalPress()
                                    }} 
                                    onCommentPress={(id) => {
                                        getComments(id)
                                        setShowComment(true)
                                    }} 
                                />)}
                            nestedScrollEnabled={true} 
                            onEndReached={() => morePosts()}
                            onEndReachedThreshold={0.2}
                            isLoading={postLoading}
                        />

                        <PostFilterDialog 
                            visible={showModal}
                            onDismiss={() => setShowModal(false)}
                        />
                    </View>
                )
            case 2:
                return (
                    <View>
                        <FFlatList
                            data={experiences}
                            renderItem={(item, index) => (
                                <CardInfo 
                                    key={index}
                                    title='Work Experience'
                                    headers={['Company', 'Location', 'Title', 'Employment Type', 'Date Started', 'Date Ended']}
                                    infos={{
                                        company         : item.company,
                                        location        : item.location,
                                        title           : item.job_title,
                                        employment_type : item.employment_type,
                                        starting_date   : item.starting_date,
                                        completion_date : item.completion_date,
                                    }}
                                />
                            )}
                            isLoading={experienceLoading}
                        />
                    </View>
                )
            case 3:
                return (
                    <View>
                        <FFlatList
                            data={educationalBackgrounds}
                            renderItem={(item, index) => (
                                <CardInfo 
                                    key={index}
                                    title='Education'
                                    headers={['School', 'Degree', 'Field of Study', 'Starting Date', 'Completion Date']}
                                    infos={{ 
                                        school: item.school,
                                        degree: item.degree,
                                        fieldOfStudy: item.field_of_study,
                                        startingDate: item.starting_date,
                                        completionDate: item.completion_date,
                                    }}
                                />
                            )}
                            noDataMessage='No Education to show'
                            isLoading={ebLoading}

                        />
                    </View>
                )
            default:
                break;
        }
    }

    return (
        <View>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={profileLoading}
                        onRefresh={() => getUserInfo()}
                    />
                }
                ListHeaderComponent={
                    <View style={{ paddingTop: 30 }}>
                        <LinearGradient
                            colors={[Colors.primary, Colors.secondary]}
                            end={{ x: 1, y: 0 }}
                            style={styles.gradientView}
                        />
                        <View style={styles.cameraContainer}>
                            <FontAwesome5 name="camera" size={18} color={Colors.black} />
                        </View>
                        <ProfileHeader 
                            data={profile} 
                            onEditPress={() => navigation.push('EditProfileScreen')}    
                        />
                        <TopNavigation
                            navTitles={['About', 'Activity', 'Background', 'Education']}
                            onBtnPress={i => {
                                setNavIndex(i)
                                switch (i) {
                                    case 1:
                                        getPosts('/posts', userId)
                                    case 2:
                                        getExperiences()                                
                                        break;
                                    case 3:
                                        getEducationalBackgrounds()                                
                                        break;
                                }
                            }}
                            index={navIndex}
                            style={{ marginHorizontal: 0, marginTop: 5, marginBottom: 5 }}
                        />
                        { renderList(navIndex) }
                    </View>
 
                }
            />

            
            {/* MODALS */}

            <Comments 
                data={comments}
                visible={showComment}
                onRequestClose={() => {
                    setShowComment(false)
                    resetComments()
                }}
                isLoading={commentLoading}
                onSendPress={text => createComment(text)}
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
                dialogText='Are you sure to delete this post? It cannot be undone.'
                onDismiss={() => setShowConfirmation(false)}
                onOkPress={() => {
                    deletePost(selectedPost.id)
                    setShowConfirmation(false)
                }}
            />
            <BottomSheetModal 
                    bottomSheetModalRef={bottomSheetModalRef}
                    pointsSnap={[225]}
                >
                    <View style={styles.btmSheetContainer}>
                        <TouchableOpacity 
                            style={styles.btmActionContainer} 
                            onPress={() => {
                                setShowCreatePost(true)
                                handleClosePress()
                            }
                        }>
                            <FontAwesome5 name="edit" size={23} color={Colors.black} style={styles.btmActionBtn}/>
                            <Text weight='medium' color={Colors.black}>Edit Post</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.btmActionContainer}
                            onPress={() => {
                                setShowConfirmation(true)
                                handleClosePress()
                            }}    
                        >
                            <FontAwesome name="trash-o" size={29} color={Colors.black} style={styles.btmActionBtn}/>
                            <Text weight='medium' color={Colors.black}>Delete Post</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btmActionContainer}>
                            <FontAwesome5 name="font-awesome-flag" size={23} color={Colors.black} style={styles.btmActionBtn}/>
                            <Text weight='medium' color={Colors.black}>Report this post</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btmActionContainer}>
                            <FontAwesome name="tasks" size={23} color={Colors.black} style={styles.btmActionBtn}/>
                            <Text weight='medium' color={Colors.black}>Improve my feed</Text>
                        </TouchableOpacity>
                    </View>
            </BottomSheetModal>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    gradientView: {
        position: 'absolute',
        height: 125,
        width: '100%'
      },
      cameraContainer:{
        backgroundColor: Colors.light,
        borderRadius: 50,
        right: 0,
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginHorizontal: 10,
        marginBottom: 25
    },
      btmSheetContainer:{
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    btmActionContainer:{
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems : 'center',
    },
    btmActionBtn:{
        width: 40
    }
})