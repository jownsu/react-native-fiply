import React, { useCallback, useRef } from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView, Container, Text, FlatList, BottomSheetModal } from '../../components/FiplyComponents'
import SearchHeader from '../../components/headers/SearchHeader'
import { FontAwesome5, FontAwesome, MaterialCommunityIcons  } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'
import SampleData from '../../../utils/SampleData'


const HomeScreen = ({navigation}) => {

  // ref
  const bottomSheetModalRef = useRef(null);

  // variables

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

//   const handleSheetChanges = useCallback((index) => {
//     console.log('handleSheetChanges', index);
//   }, []);


    const renderPost = (item) => (
        <View style={postStyles.postContainer}>
            <View style={postStyles.postHeaderContainer}>
                <View style={postStyles.postAuthorContainer} >
                    <Image 
                        source={require('../../../assets/img/logo.png')} 
                        style={postStyles.authorImg}    
                        resizeMode='contain'
                    />
                    <Text weight="medium" >{item.author}{'\u30FB'}{item.posted_at}</Text>
                </View>

                <TouchableOpacity onPress={() => handlePresentModalPress()}>
                    <MaterialCommunityIcons name="dots-horizontal" size={24} color={Colors.black} />
                </TouchableOpacity>
            </View>

            <View style={postStyles.postBodyContainer}>
                <Text>{item.post}</Text>
                <Image 
                    source={require('../../../assets/img/postimg.png')}
                    style={postStyles.postImg}
                />
            </View>

            <View style={postStyles.postFooterContainer}>
                <TouchableOpacity style={postStyles.postAction}>
                    <FontAwesome5 style={{ marginRight: 5 }} name="caret-up" size={17} color={Colors.black} />
                    <Text>Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={postStyles.postAction}>
                    <FontAwesome style={{ marginRight: 5 }} name="commenting" size={17} color={Colors.primary} />
                    <Text>Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={postStyles.postAction}>
                    <FontAwesome style={{ marginRight: 5 }} name="share" size={17} color={Colors.secondary} />
                    <Text>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={postStyles.postAction}>
                    <FontAwesome style={{ marginRight: 5 }} name="paper-plane" size={17} color={Colors.secondary} />
                    <Text>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

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
            <Container style={{ paddingHorizontal: 10 }}>
                <FlatList 
                    data={SampleData.postList}
                    renderItem={item => renderPost(item)}
                    renderHeader={renderHeader()}
                    noDataMessage='No Posts'
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

const postStyles = StyleSheet.create({
    postContainer:{
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.light,
        borderRadius: 15,
        padding: 10,
        elevation: 2,
        marginVertical: 5
    },
    postHeaderContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    postAuthorContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    authorImg:{
        height: 35,
        width: 35,
        marginRight: 10
    },
    postBodyContainer:{

    },
    postImg:{
        width: '100%',
        marginVertical: 7
    },
    postFooterContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    postAction:{
        flexDirection: 'row',
        paddingHorizontal: 7,
    },
})

const createPostySTyles = StyleSheet.create({
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
