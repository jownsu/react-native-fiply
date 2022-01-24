import React, { useCallback, useMemo, useRef, useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { SafeAreaView, Container, Text, TextInput, Button, BottomSheetModal } from '../../components/FiplyComponents'
import SearchHeader from '../../components/headers/SearchHeader'
import { FontAwesome5, FontAwesome, MaterialCommunityIcons  } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'
import PostList from '../../components/lists/PostList'




const HomeScreen = ({navigation}) => {

    const postList = [
        {
            id: '1', 
            author: 'Saturn Inc.', 
            post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            posted_at: '10h'
        }, 
        {
            id: '2', 
            author: 'Saturn Inc.', 
            post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            posted_at: '10h'
        }, 
        {
            id: '3', 
            author: 'Saturn Inc.', 
            post: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            posted_at: '10h'
        }, 
    ]

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
                <PostList 
                    data={postList}
                    optionOnPress={() => handlePresentModalPress()}
                    onHireNowPress={() => navigation.navigate('CreateJobScreen')}
                    onSetEventPress={() => navigation.navigate('CreateQuestionnaireScreen')}
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
