import React, { useContext } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { Avatar, Badge } from 'react-native-paper'
import { Text, SecondaryButton, Button } from '../FiplyComponents'
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
    onFollowCountsPress = () => {},
    onFollowingPress = () => {},
    onPendingPress = () => {},
    onFollowPress = () => {},
}) => {
    const { pickImage } = usePickImage()
    const { uploadAvatar, uploadCover } = useContext(ProfileContext)

    const renderFollowBtn = () => {
        if (!data.is_me) {
            if (data.is_following) {
                return (
                    <Button
                        onPress={onFollowingPress}
                        title={'Following'}
                        style={styles.btnStyle}
                        labelStyle={styles.btnLabelStyle}
                    />
                )
            }

            if (data.is_following_pending) {
                return (
                    <Button
                        onPress={onPendingPress}
                        title={'Pending'}
                        style={styles.btnStyle}
                        labelStyle={styles.btnLabelStyle}
                    />
                )
            }

            return (
                <Button
                    onPress={onFollowPress}
                    title={'Follow'}
                    style={styles.btnStyle}
                    labelStyle={styles.btnLabelStyle}
                />
            )
        }
        return null
    }

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

            <View style={styles.container}>
                <View style={styles.imgContainer}>
                    <View>
                        <Avatar.Image
                            size={100}
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
                    {/* <SecondaryButton
                        onPress={() => {}}
                        title={'See Resume'}
                        style={styles.secondaryBtnStyle}
                        labelStyle={styles.secondaryBtnlabelStyle}
                    /> */}
                </View>

                <View>
                    <View style={styles.bodyContainer}>
                        <Text weight="semi-bold" size={14} numberOfLines={1} color={Colors.white}>
                            {data.fullname}
                        </Text>
                        <Text size={12} numberOfLines={1} color={Colors.white}>
                            {data.email}
                        </Text>

                        {/* {data.preview && (
                            <Text
                                color={Colors.white}
                                size={12}
                                weight="semi-bold"
                                style={{ marginVertical: 5 }}
                            >
                                {data.preview}
                            </Text>
                        )} */}
                        {renderFollowBtn()}

                        <TouchableOpacity
                            onPress={onFollowCountsPress}
                            style={{
                                flexDirection: 'row',
                            }}
                        >
                            <View>
                                <Text size={12} style={{ marginRight: 5 }} color={Colors.white}>
                                    {data.following_count} Following
                                </Text>
                            </View>

                            <View>
                                <Text size={12} color={Colors.white}>
                                    {data.followers_count} Followers
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    imgBgContainer: {
        height: 250,
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
    bodyContainer: {
        justifyContent: 'space-evenly',
        flex: 1,
    },
    footerContainer: {},
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
    secondaryBtnStyle: {
        marginHorizontal: 0,
        borderColor: Colors.white,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 5,
    },
    secondaryBtnlabelStyle: {
        fontSize: 12,
        marginVertical: 5,
        marginHorizontal: 10,
        color: Colors.white,
    },
    btnStyle: {
        marginHorizontal: 0,
        borderRadius: 7,
        borderWidth: 1,
        elevation: 1,
    },
    btnLabelStyle: {
        fontSize: 12,
        marginVertical: 5,
        marginHorizontal: 10,
    },
})
