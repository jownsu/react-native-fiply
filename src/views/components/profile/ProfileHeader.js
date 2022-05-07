import React, { useContext } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { Avatar, Badge } from 'react-native-paper'
import { Text, SecondaryButton, Button } from '../FiplyComponents'
import Colors from '../../../utils/Colors'
import { FontAwesome, MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'
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
    onEditProfilePress = () => {},
    onSeeDetailsPress = () => {},
    onMessagePress = () => {},
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
                        labelWeight={'Light'}
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
                        labelWeight={'Light'}
                    />
                )
            }

            return (
                <Button
                    onPress={onFollowPress}
                    title={'Follow'}
                    style={styles.btnStyle}
                    labelStyle={styles.btnLabelStyle}
                    labelWeight={'Light'}
                />
            )
        }
        return (
            <Button
                onPress={() => {}}
                title={'Profile Link'}
                style={styles.btnStyle}
                labelStyle={styles.btnLabelStyle}
                labelWeight={'Light'}
            />
        )
    }
    const renderEditButton = () => {
        if (data.is_me && !data.company) {
            return (
                <Button
                    onPress={onEditProfilePress}
                    title={'Edit Profile'}
                    style={styles.btnEditStyle}
                    labelStyle={styles.btnLabelStyle}
                    icon={<FontAwesome5 name="user-edit" size={14} color={Colors.light} />}
                    labelWeight={'Light'}
                />
            )
        }
        if (data.is_public || data.is_following) {
            if (data.company) {
                return null
                // <Button
                //     title={'Hiring Managers'}
                //     style={styles.btnEditStyle}
                //     labelStyle={styles.btnLabelStyle}
                //     icon={<FontAwesome5 name="user-alt" size={14} color={Colors.light} />}
                //     labelWeight={'Light'}
                // />
            } else {
                return (
                    <Button
                        onPress={onSeeDetailsPress}
                        title={'See Details'}
                        style={styles.btnEditStyle}
                        labelStyle={styles.btnLabelStyle}
                        icon={<FontAwesome5 name="user-alt" size={14} color={Colors.light} />}
                        labelWeight={'Light'}
                    />
                )
            }
        } else {
            return (
                <Button
                    style={styles.btnEditStyle}
                    labelStyle={styles.btnLabelStyle}
                    icon={<FontAwesome5 name="eye-slash" size={14} color={Colors.light} />}
                    disabled
                    labelWeight={'Light'}
                />
            )
        }
    }

    return (
        <View>
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

                <View style={styles.avatar}>
                    <Avatar.Image
                        size={125}
                        source={{ uri: data.avatar }}
                        backgroundColor={Colors.light}
                    />
                </View>
            </ImageBackground>
            <View style={styles.container}>
                {/* <View style={{ position: 'absolute', right: 10, top: 10 }}>
                    {renderFollowBtn()}
                </View> */}

                <View style={styles.mainInfoContainer}>
                    <View style={styles.bodyContainer}>
                        <View style={{ flex: 1.3 }}>
                            <Text weight="semi-bold" size={16} numberOfLines={1}>
                                {/* {data.firstname} {data.lastname} */}
                                {data.name}
                            </Text>
                            <Text>{data.bio}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.profileBtnContainer}>
                    {renderFollowBtn()}

                    {!data.is_me && (
                        <Button
                            onPress={onMessagePress}
                            title={'Message'}
                            style={styles.btnEditStyle}
                            labelStyle={styles.btnLabelStyle}
                            icon={
                                <Ionicons name="chatbubbles-sharp" size={14} color={Colors.light} />
                            }
                            labelWeight={'Light'}
                        />
                    )}

                    {renderEditButton()}
                </View>
                <View style={styles.footerContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            if (data.is_public || data.is_following) {
                                onFollowCountsPress()
                            }
                        }}
                        style={styles.followContainer}
                    >
                        <View style={{ marginRight: 15 }}>
                            <Text size={14}>Following</Text>
                            <Text size={16} weight="medium">
                                {data.following_count}
                            </Text>
                        </View>

                        <View>
                            <Text size={14}>Followers</Text>
                            <Text size={16} weight="medium">
                                {data.followers_count}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    imgBgContainer: {
        height: 200,
        zIndex: 100,
    },
    container: {
        backgroundColor: Colors.white,
        borderColor: Colors.light,
        paddingHorizontal: 20,
    },
    mainInfoContainer: {
        marginTop: 30,
        paddingVertical: 10,
        flexDirection: 'row',
        borderColor: Colors.light,
    },
    avatar: {
        borderWidth: 5,
        borderRadius: 100,
        borderColor: Colors.lighter,
        overflow: 'hidden',
        position: 'absolute',
        bottom: -35,
        left: 10,
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
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
    },
    profileBtnContainer: {
        flexDirection: 'row',
        paddingBottom: 10,
        alignItems: 'center',
    },
    footerContainer: {
        paddingBottom: 10,
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
        borderRadius: 5,
        borderWidth: 1,
        elevation: 1,
        marginRight: 5,
    },
    btnLabelStyle: {
        fontSize: 11,
        marginVertical: 5,
        marginHorizontal: 10,
    },
    btnEditStyle: {
        marginHorizontal: 0,
        borderRadius: 5,
        marginRight: 5,
        borderWidth: 1,
        elevation: 1,
        backgroundColor: Colors.grey,
    },
    followContainer: {
        flexDirection: 'row',
        flex: 1,
    },
})
