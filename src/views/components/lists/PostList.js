import React from 'react'
import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native'
import { Text } from '../FiplyComponents'
import { MaterialCommunityIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

const PostList = ({
        data, 
        optionOnPress = () => {}, 
        onHireNowPress = () => {},
        onSetEventPress = () => {},
        onPollPress = () => {}
    }) => {

    return (
        <View style={styles.container}>
            <FlatList
                data={data} 
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <View style={styles.postContainer}>
                        <View style={styles.postHeaderContainer}>
                            <View style={styles.postAuthorContainer} >
                                <Image 
                                    source={require('../../../assets/img/logo.png')} 
                                    style={styles.authorImg}    
                                    resizeMode='contain'
                                />
                                <Text weight="medium" >{item.author}{'\u30FB'}{item.posted_at}</Text>
                            </View>

                            <TouchableOpacity onPress={() => optionOnPress()}>
                                <MaterialCommunityIcons name="dots-horizontal" size={24} color={Colors.black} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.postBodyContainer}>
                            <Text>{item.post}</Text>
                            <Image 
                                source={require('../../../assets/img/postimg.png')}
                                style={styles.postImg}
                            />
                        </View>

                        <View style={styles.postFooterContainer}>
                            <TouchableOpacity style={styles.postAction}>
                                <FontAwesome5 style={{ marginRight: 5 }} name="caret-up" size={17} color={Colors.black} />
                                <Text>Up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.postAction}>
                                <FontAwesome style={{ marginRight: 5 }} name="commenting" size={17} color={Colors.primary} />
                                <Text>Comment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.postAction}>
                                <FontAwesome style={{ marginRight: 5 }} name="share" size={17} color={Colors.secondary} />
                                <Text>Share</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.postAction}>
                                <FontAwesome style={{ marginRight: 5 }} name="paper-plane" size={17} color={Colors.secondary} />
                                <Text>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                ListHeaderComponent={
                    <View style={styles.createPostContainer}>
                    <TouchableOpacity activeOpacity={.5} style={styles.textInputContainer} onPress={() => navigation.push('CreatePostScreen')}>
                        <Text>Create a post</Text>
                    </TouchableOpacity>

                    <View style={styles.postActionContainer}>
                        <TouchableOpacity style={styles.actionBtn} onPress={() => onHireNowPress()}>
                            <FontAwesome name="briefcase" size={24} color={Colors.secondary}/>
                            <Text weight='medium' style={styles.actionText}>HIRE NOW</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionBtn} onPress={() => onSetEventPress()}>
                            <FontAwesome5 name="calendar-week" size={24} color={Colors.primary} />
                            <Text weight='medium' style={styles.actionText}>SET EVENT</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionBtn} onPress={() => onPollPress()}>
                            <FontAwesome5 name="poll" size={24} color={Colors.grey} />
                            <Text weight='medium' style={styles.actionText}>POLL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                }
            />
        </View>
    )
}

export default PostList

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
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
