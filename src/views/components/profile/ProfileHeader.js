import React, { useContext } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { Avatar, Badge } from 'react-native-paper'
import { Text } from '../FiplyComponents'
import Colors from '../../../utils/Colors'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import usePickImage from '../../../utils/usePIckImage'
import ProfileContext from '../../../api/context/profile/ProfileContext'

{
    /* {data.is_me && (
                <TouchableOpacity onPress={onEditPress} style={styles.editIcon}>
                    <FontAwesome name="edit" size={24} color={Colors.black} />
                </TouchableOpacity>
            )} */
}

const ProfileHeader = ({
    data,
    onBackPress = () => {},
    onFollowerPress = () => {},
    onFollowingPress = () => {},
    style,
}) => {
    const { pickImage } = usePickImage()
    const { uploadAvatar, uploadCover } = useContext(ProfileContext)

    return (
        <ImageBackground
            source={{ uri: data.cover }}
            resizeMode="cover"
            style={styles.imgBgContainer}
        >
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.backContainer}
                onPress={onBackPress}
            >
                <MaterialIcons name="arrow-back" size={18} color={Colors.white} />
            </TouchableOpacity>
            {data.is_me && (
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.cameraContainer}
                    onPress={() => {
                        pickImage([3, 2], (uri) => {
                            uploadCover(uri)
                        })
                    }}
                >
                    <FontAwesome name="upload" size={12} color={Colors.white} />
                </TouchableOpacity>
            )}

            <View style={{ ...styles.container, ...style }}>
                <View style={styles.imgContainer}>
                    <Avatar.Image
                        size={85}
                        source={{ uri: data.avatar }}
                        backgroundColor={Colors.light}
                    />
                    {data.is_me && (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.avatarUploadBtn}
                            onPress={() =>
                                pickImage([1, 1], (uri) => {
                                    uploadAvatar(uri)
                                })
                            }
                        >
                            <FontAwesome name="upload" size={12} color={Colors.light} />
                        </TouchableOpacity>
                    )}
                </View>

                <View>
                    <View style={styles.bodyContainer}>
                        <Text weight="semi-bold" size={14} numberOfLines={1} color={Colors.white}>
                            {data.fullname}
                        </Text>
                        <Text size={12} numberOfLines={1} color={Colors.white}>
                            {data.email}
                        </Text>
                    </View>

                    <View style={styles.footerContainer}>
                        {data.preview && (
                            <Text
                                color={Colors.white}
                                size={12}
                                weight="semi-bold"
                                style={{ marginVertical: 5 }}
                            >
                                {data.preview}
                            </Text>
                        )}
                        <View
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            <TouchableOpacity onPress={onFollowingPress}>
                                <Text size={12} style={{ marginRight: 15 }} color={Colors.white}>
                                    {data.following_count} Following
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onFollowerPress}>
                                <Text size={12} color={Colors.white}>
                                    {data.followers_count} Followers
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    imgBgContainer: {
        height: 225,
    },
    container: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,.5)',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'lime',
    },
    imgContainer: {
        borderRadius: 100,
        height: 85,
        width: 85,
        marginRight: 10,
    },
    avatarUploadBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.black,
        padding: 5,
        borderRadius: 25,
    },
    editIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    bodyContainer: {},
    footerContainer: {
        borderColor: Colors.light,
    },
    cameraContainer: {
        position: 'absolute',
        top: 35,
        right: 15,
        backgroundColor: 'rgba(0, 0, 0, .3)',
        borderRadius: 50,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    backContainer: {
        position: 'absolute',
        top: 30,
        left: 10,
        padding: 5,
        backgroundColor: 'rgba(0,0,0,.5)',
        borderRadius: 50,
    },
})
