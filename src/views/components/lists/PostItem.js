import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Text } from '../FiplyComponents'
import React, { memo } from 'react'
import { Avatar } from 'react-native-paper'
import {
    FontAwesome5,
    FontAwesome,
    MaterialCommunityIcons,
} from '@expo/vector-icons'
import Colors from '../../../utils/Colors'
const PostItem = memo(
    ({
        data,
        handleDotPress = () => {},
        handleAvatarPress = () => {},
        onCommentPress = () => {},
        onUpVotePress = () => {},
    }) => {
        return (
            <View style={postStyles.postContainer}>
                <View style={postStyles.postHeaderContainer}>
                    <View style={postStyles.postAuthorContainer}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={postStyles.authorImgContainer}
                            onPress={() => handleAvatarPress(data.user_id)}
                        >
                            <Avatar.Image
                                size={42}
                                source={{ uri: data.avatar }}
                                backgroundColor={Colors.light}
                            />
                        </TouchableOpacity>

                        <View style={{ flex: 1 }}>
                            <Text weight="medium">{data.posted_by}</Text>
                            <Text>{data.date}</Text>
                        </View>

                        <TouchableOpacity onPress={() => handleDotPress(data)}>
                            <MaterialCommunityIcons
                                name="dots-horizontal"
                                size={24}
                                color={Colors.black}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text style={postStyles.content}>{data.content}</Text>
                {data.image ? (
                    <Image
                        source={{ uri: data.image }}
                        style={postStyles.postImg}
                        resizeMethod="resize"
                    />
                ) : null}

                <View style={postStyles.postFooterContainer}>
                    <TouchableOpacity
                        style={postStyles.postAction}
                        onPress={() => onUpVotePress(data.id)}
                    >
                        <FontAwesome5
                            style={postStyles.icon}
                            name="caret-up"
                            size={21}
                            color={
                                data.is_upVoted
                                    ? Colors.secondary
                                    : Colors.black
                            }
                        />
                        <Text>{data.upVotes_count}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={postStyles.postAction}
                        onPress={() => onCommentPress(data.id)}
                    >
                        <FontAwesome
                            style={postStyles.icon}
                            name="commenting"
                            size={17}
                            color={Colors.primary}
                        />
                        <Text>Comment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={postStyles.postAction}>
                        <FontAwesome
                            style={postStyles.icon}
                            name="share"
                            size={17}
                            color={Colors.secondary}
                        />
                        <Text>Share</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    },
    (prevProps, nextProps) => {
        if (prevProps.data.is_upVoted != nextProps.data.is_upVoted) return false
        if (prevProps.data.upVotes_count != nextProps.data.upVotes_count)
            return false
        if (prevProps.id == nextProps.id) return true

        return false
    }
)

export default memo(PostItem)

const postStyles = StyleSheet.create({
    postContainer: {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.light,
        paddingTop: 10,
        paddingHorizontal: 10,
        elevation: 2,
        marginVertical: 5,
    },
    postHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    postAuthorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authorImgContainer: {
        marginRight: 10,
    },
    postBodyContainer: {
        marginVertical: 10,
    },
    postImg: {
        marginVertical: 7,
        height: 250,
    },
    postFooterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderTopWidth: 1,
        borderColor: Colors.light,
        paddingVertical: 7,
    },
    postAction: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
    },
    icon: {
        marginRight: 5,
    },
    content: {
        marginVertical: 10,
    },
})
