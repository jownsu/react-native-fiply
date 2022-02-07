import React, { useCallback, useRef, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import usePost from '../../../api/hooks/usePost'
import { SafeAreaView, Container, Text, FlatList, BottomSheetModal } from '../../components/FiplyComponents'
import SearchHeader from '../../components/headers/SearchHeader'
import { FontAwesome5, FontAwesome  } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'
import SampleData from '../../../utils/SampleData'
import PostList from '../../components/lists/PostList'

const HomeScreen = ({navigation}) => {

    const { posts, getPosts, loading, morePosts } = usePost();

    const flatListRef = useRef(null)

    // bottom sheet reference
    const bottomSheetModalRef = useRef(null);

    const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

//   const handleSheetChanges = useCallback((index) => {
//     console.log('handleSheetChanges', index);
//   }, []);



    const renderHeader = () => (
        <View style={createPostySTyles.createPostContainer}>
            <TouchableOpacity activeOpacity={.5} style={createPostySTyles.textInputContainer} onPress={() => navigation.push('CreatePostScreen')}>
                <Text>Create a post</Text>
            </TouchableOpacity>

            <View style={createPostySTyles.postActionContainer}>
                <TouchableOpacity style={createPostySTyles.actionBtn} onPress={() => navigation.navigate('CreateJobScreen')}>
                    <FontAwesome name="briefcase" size={24} color={Colors.secondary}/>
                    <Text weight='medium' style={styles.actionText}>HIRE NOW</Text>
                </TouchableOpacity>

                <TouchableOpacity style={createPostySTyles.actionBtn} onPress={() => navigation.navigate('CreateQuestionnaireScreen')}>
                    <FontAwesome5 name="calendar-week" size={24} color={Colors.primary} />
                    <Text weight='medium' style={createPostySTyles.actionText}>SET EVENT</Text>
                </TouchableOpacity>

                <TouchableOpacity style={createPostySTyles.actionBtn}>
                    <FontAwesome5 name="poll" size={24} color={Colors.grey} />
                    <Text weight='medium' style={createPostySTyles.actionText}>POLL</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <SafeAreaView flex>
            <SearchHeader
                leftIcon={ () => <FontAwesome5 name="th-large" size={24} color={Colors.grey} />}
                rightIcon={ () => 
                    <TouchableOpacity onPress={() => navigation.navigate('MessageStack')} activeOpacity={.5}>
                        <FontAwesome name="paper-plane" size={24} color={Colors.secondary} />
                    </TouchableOpacity>
                }
            /> 
            <Container style={{ paddingHorizontal: 0 }}>
                <FlatList
                    flatlistref={flatListRef} 
                    data={posts}
                    renderItem={item => (
                        <PostList
                            data={item} 
                            handleDotPress={handlePresentModalPress} 
                            handleAvatarPress={(id) => navigation.navigate('ProfileScreen', {userId: id})}
                        />)
                    }
                    renderHeader={renderHeader()}
                    onEndReached={() => {
                        if(posts.length < 30){
                            morePosts()
                        }
                    }}
                    onEndReachedThreshold={0.3}
                    isLoading={loading}
                    ListFooterComponent={
                        (posts.length >= 30) 
                            ? 
                            <TouchableOpacity 
                                onPress={() => {
                                        morePosts(true)
                                        flatListRef.current.scrollToOffset({animated: true, offset: 0})
                                    }}>
                                <Text 
                                    weight='medium' 
                                    color={Colors.secondary} 
                                    center
                                    style={{ marginTop: 10, marginBottom: 20 }}
                                >
                                  Load More
                              </Text>            
                            </TouchableOpacity>

                            : null 
                    }
                />
            </Container>

            <BottomSheetModal 
                    bottomSheetModalRef={bottomSheetModalRef}
                    pointsSnap={[225]}
                >
                    <View style={styles.btmSheetContainer}>
                        <TouchableOpacity style={styles.btmActionContainer}>
                            <FontAwesome name="bookmark" size={28} color={Colors.black} style={styles.btmActionBtn}/>
                            <Text weight='medium' color={Colors.black}>Bookmark</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btmActionContainer}>
                            <FontAwesome name="share-alt" size={28} color={Colors.black} style={styles.btmActionBtn}/>
                            <Text weight='medium' color={Colors.black}>Share Via</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btmActionContainer}>
                            <FontAwesome5 name="font-awesome-flag" size={28} color={Colors.black} style={styles.btmActionBtn}/>
                            <Text weight='medium' color={Colors.black}>Report this post</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btmActionContainer}>
                            <FontAwesome name="tasks" size={28} color={Colors.black} style={styles.btmActionBtn}/>
                            <Text weight='medium' color={Colors.black}>Improve my feed</Text>
                        </TouchableOpacity>
                    </View>
            </BottomSheetModal>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    createPostContainer:{
        backgroundColor: Colors.white,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        borderRadius: 15
    },
    postActionContainer:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    actionBtn:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    actionText:{
        fontSize: 12,
        marginTop: 5
    },
    textInputContainer:{
        borderWidth: 1,
        padding: 10,
        borderRadius: 100,
        borderColor: Colors.light,
        marginVertical: 10
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



const createPostySTyles = StyleSheet.create({
    createPostContainer:{
        backgroundColor: Colors.white,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        borderRadius: 15,
        marginHorizontal: 10
    },
    postActionContainer:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    actionBtn:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    actionText:{
        fontSize: 12,
        marginTop: 5
    },
    textInputContainer:{
        borderWidth: 1,
        padding: 10,
        borderRadius: 100,
        borderColor: Colors.light,
        marginVertical: 10
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
