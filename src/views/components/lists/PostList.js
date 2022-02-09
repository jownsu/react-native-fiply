import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Text } from '../FiplyComponents'
import React, { memo } from 'react';
import { Avatar } from 'react-native-paper'
import { FontAwesome5, FontAwesome, MaterialCommunityIcons  } from '@expo/vector-icons'
import Colors from '../../../utils/Colors';
import FastImage from 'react-native-fast-image';
const PostList = ({
        data, 
        handleDotPress = () => {}, 
        handleAvatarPress = () => {}, 
        onCommentPress = () => {}
    }) => {
  return (
        <View style={postStyles.postContainer}>
            <View style={postStyles.postHeaderContainer}>
                <View style={postStyles.postAuthorContainer} >
                    <TouchableOpacity activeOpacity={.7} style={postStyles.authorImgContainer} onPress={() => handleAvatarPress(data.user_id)}>
                        <Avatar.Image 
                            size={42}
                            source={{ uri: data.avatar }}
                            backgroundColor={Colors.light}
                        />
                    </TouchableOpacity>

                    <View style={{ flex: 1}}>
                        <Text weight="medium">{data.posted_by}</Text>
                        <Text>{data.date}</Text>
                    </View>
                    
                <TouchableOpacity onPress={() => handleDotPress(data)}>
                    <MaterialCommunityIcons name="dots-horizontal" size={24} color={Colors.black} />
                </TouchableOpacity>
                </View>
            </View>

            <View style={postStyles.postBodyContainer}>
                <Text>{data.content}</Text>

                {
                    data.image 
                        ?   <Image 
                                source={{ uri: data.image }}
                                style={postStyles.postImg} 
                            />
                        : null
                }

            </View>

            <View style={postStyles.postFooterContainer}>
                <TouchableOpacity style={postStyles.postAction}>
                    <FontAwesome5 style={{ marginRight: 5 }} name="caret-up" size={21} color={Colors.black} />
                    <Text>Up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={postStyles.postAction} onPress={() => onCommentPress(data.id)}>
                    <FontAwesome style={{ marginRight: 5 }} name="commenting" size={17} color={Colors.primary} />
                    <Text>Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={postStyles.postAction}>
                    <FontAwesome style={{ marginRight: 5 }} name="share" size={17} color={Colors.secondary} />
                    <Text>Share</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={postStyles.postAction}>
                    <FontAwesome style={{ marginRight: 5 }} name="paper-plane" size={17} color={Colors.secondary} />
                    <Text>Send</Text>
                </TouchableOpacity> */}
            </View>
        </View>
  );
};

export default memo(PostList);

const postStyles = StyleSheet.create({
    postContainer:{
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.light,
        paddingTop: 10,
        paddingHorizontal: 10,
        elevation: 2,
        marginVertical: 5
    },
    postHeaderContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    postAuthorContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    authorImgContainer:{
        marginRight: 10,
    },
    postBodyContainer:{
        marginVertical: 10
    },
    postImg:{
        marginVertical: 7,
        borderWidth: 1,
        height: 250
    },
    postFooterContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderTopWidth: 1,
        borderColor: Colors.light,
        paddingVertical: 7
    },
    postAction:{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center'
    },
})