import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Text } from '../FiplyComponents'
import React, { memo } from 'react';
import { FontAwesome5, FontAwesome, MaterialCommunityIcons  } from '@expo/vector-icons'
import Colors from '../../../utils/Colors';

const PostList = ({data, handleDotPress = () => {}, handleAvatarPress = () => {}}) => {
  return (
        <View style={postStyles.postContainer}>
            <View style={postStyles.postHeaderContainer}>
                <View style={postStyles.postAuthorContainer} >
                    <TouchableOpacity activeOpacity={.7} style={postStyles.authorImgContainer} onPress={() => handleAvatarPress(data.user_id)}>
                        <Image 
                            source={{ uri: data.avatar }} 
                            style={postStyles.authorImg}    
                            resizeMode='cover'
                            resizeMethod='resize'
                        />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <Text weight="medium" >{data.posted_by}</Text>
                        <Text>{'\u30FB'}</Text>
                        <Text>{data.date}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={handleDotPress}>
                    <MaterialCommunityIcons name="dots-horizontal" size={24} color={Colors.black} />
                </TouchableOpacity>
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
                <TouchableOpacity style={postStyles.postAction}>
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
        justifyContent: 'space-between'
    },
    postAuthorContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    authorImgContainer:{
        borderWidth: 1,
        borderColor: Colors.grey,
        justifyContent: 'center',
        alignContent: 'center',
        marginRight: 10,
        borderRadius: 100,
        overflow: 'hidden'
    },
    authorImg:{
        height: 40,
        width: 40,
    },
    postBodyContainer:{
        marginVertical: 10
    },
    postImg:{
        width: '100%',
        marginVertical: 7
    },
    postFooterContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderTopWidth: 1,
        borderColor: Colors.light,
        paddingVertical: 5
    },
    postAction:{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center'
    },
})