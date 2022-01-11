import React, { useCallback, useMemo, useRef, useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { SafeAreaView, Container, Text, TextInput, Button, BottomSheetModal } from '../../components/FiplyComponents'
import SearchHeader from '../../components/headers/SearchHeader'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'
import PostList from '../../components/lists/PostList'




const HomeScreen = () => {

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

    const [index, setIndex] = useState(-1)


    return (
        <SafeAreaView>

            <SearchHeader
                leftIcon={ () => (<FontAwesome5 name="th-large" size={24} color={Colors.grey} />)}
                rightIcon={ () => <FontAwesome name="paper-plane" size={24} color={Colors.secondary} />}
            /> 
            <Container style={{ paddingHorizontal: 10 }}>
                <View style={styles.createPostContainer}>
                    <TextInput 
                        label={'Create a Post'}
                        style={styles.txtInputStyle}
                        multiline
                        roundness={25}
                    />

                    <View style={styles.postActionContainer}>
                        <TouchableOpacity style={styles.actionBtn}>
                            <FontAwesome name="briefcase" size={24} color={Colors.secondary} />
                            <Text weight='medium' style={styles.actionText}>HIRE NOW</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionBtn}>
                            <FontAwesome5 name="calendar-week" size={24} color={Colors.primary} />
                            <Text weight='medium' style={styles.actionText}>SET EVENT</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionBtn}>
                            <FontAwesome5 name="poll" size={24} color={Colors.grey} />
                            <Text weight='medium' style={styles.actionText}>POLL</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <PostList 
                    optionOnPress={() => handlePresentModalPress()}
                />


            </Container>

            <BottomSheetModal 
                bottomSheetModalRef={bottomSheetModalRef}
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
    txtInputStyle:{
        marginBottom: 20,
        maxHeight: 200
    },
    btmSheetContainer:{
        paddingVertical: 10,
        paddingHorizontal: 20
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
