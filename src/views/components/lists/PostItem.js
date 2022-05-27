import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Text } from '../FiplyComponents'
import React, { memo } from 'react'
import { Avatar } from 'react-native-paper'
import {
    FontAwesome5,
    FontAwesome,
    MaterialCommunityIcons,
    MaterialIcons,
    AntDesign,
} from '@expo/vector-icons'
import FastImage from 'react-native-fast-image'
import Colors from '../../../utils/Colors'
const PostItem = memo(
    ({
        data,
        onDotPress = () => {},
        onAvatarPress = () => {},
        onCommentPress = () => {},
        onUpVotePress = () => {},
        onUpVoteCountPress = () => {},
        onCommentCountPress = () => {},
        is_me = false,
    }) => {
        return (
            <View style={postStyles.postContainer}>
                <View style={postStyles.postHeaderContainer}>
                    <View style={postStyles.postAuthorContainer}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={postStyles.authorImgContainer}
                            onPress={() => onAvatarPress(data.user_id)}
                        >
                            <Avatar.Image
                                size={42}
                                source={{ uri: data.avatar }}
                                backgroundColor={Colors.light}
                            />
                        </TouchableOpacity>

                        <View style={{ flex: 1 }}>
                            <Text weight="medium">{data.posted_by}</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Text>{data.date}</Text>
                                {is_me ? (
                                    data.is_public ? (
                                        <MaterialIcons
                                            name="public"
                                            size={16}
                                            color={Colors.black}
                                            style={{ marginLeft: 5 }}
                                        />
                                    ) : (
                                        <FontAwesome5
                                            name="eye-slash"
                                            size={16}
                                            color={Colors.black}
                                            style={{ marginLeft: 5 }}
                                        />
                                    )
                                ) : null}
                            </View>
                        </View>

                        <TouchableOpacity onPress={() => onDotPress(data)}>
                            <MaterialCommunityIcons
                                name="dots-horizontal"
                                size={24}
                                color={Colors.black}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {data.content ? <Text style={postStyles.content}>{data.content}</Text> : null}

                {data.image ? (
                    <FastImage
                        style={postStyles.postImg}
                        resizeMode={FastImage.resizeMode.contain}
                        source={{
                            uri: data.image,
                            priority: FastImage.priority.high,
                        }}
                    />
                ) : null}

                <View style={postStyles.likesContainer}>
                    <TouchableOpacity
                        style={postStyles.like}
                        onPress={() => onUpVoteCountPress(data.id)}
                    >
                        <Text color={Colors.grey} size={11}>
                            {data.upVotes_count} Likes
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={postStyles.comment} onPress={onCommentCountPress}>
                        <Text color={Colors.grey} size={11}>
                            {data.comments_count} Comments
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={postStyles.postFooterContainer}>
                    <TouchableOpacity
                        style={postStyles.postAction}
                        onPress={() => onUpVotePress(data.id)}
                    >
                        <AntDesign
                            style={postStyles.icon}
                            name="like1"
                            size={21}
                            color={data.is_upVoted ? Colors.secondary : Colors.black}
                        />
                        <Text color={data.is_upVoted ? Colors.secondary : Colors.black}>Like</Text>
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
        if (prevProps.data.upVotes_count != nextProps.data.upVotes_count) return false
        if (prevProps.data.content != nextProps.data.content) return false
        if (prevProps.data.image != nextProps.data.image) return false
        if (prevProps.data.id == nextProps.data.id) return true
        return false
    }
)

export default PostItem

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
    likesContainer: {
        paddingBottom: 10,
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    like: {
        paddingHorizontal: 5,
    },
    comment: {
        paddingHorizontal: 5,
    },
})
