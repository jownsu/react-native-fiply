import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { Avatar } from 'react-native-paper'
import { Text } from '../FiplyComponents'
import Colors from '../../../utils/Colors'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'

{
    /* {data.is_me && (
                <TouchableOpacity onPress={onEditPress} style={styles.editIcon}>
                    <FontAwesome name="edit" size={24} color={Colors.black} />
                </TouchableOpacity>
            )} */
}

const ProfileHeader = ({ data, onEditPress = () => {}, style }) => {
    return (
        <ImageBackground
            source={{ uri: data.cover }}
            resizeMode="cover"
            style={styles.imgBgContainer}
        >
            <View style={{ ...styles.container, ...style }}>
                {/* <View style={styles.cameraContainer}>
                    <FontAwesome5 name="camera" size={18} color={Colors.black} />
                </View> */}
                <View style={styles.imgContainer}>
                    <Avatar.Image
                        size={85}
                        source={{ uri: data.avatar }}
                        backgroundColor={Colors.light}
                    />
                </View>

                <View>
                    <View style={styles.bodyContainer}>
                        <Text weight="semi-bold" size={14} numberOfLines={1} color={Colors.white}>
                            {data.fullname}
                        </Text>
                        <Text size={12} numberOfLines={1} color={Colors.white}>
                            {data.email}
                        </Text>
                        {/* {data.location ? (
                        <Text size={11} numberOfLines={1} color={Colors.white}>
                            {data.location}
                        </Text>
                    ) : null} */}
                    </View>

                    <View style={styles.footerContainer}>
                        {/* <Text weight="medium" color={Colors.primary}>
                        {data.status}
                    </Text> */}
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
                            <Text size={12} style={{ marginRight: 15 }} color={Colors.white}>
                                1 Following
                            </Text>
                            <Text size={12} color={Colors.white}>
                                99 Followers
                            </Text>
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
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.grey,
        backgroundColor: Colors.white,
        borderRadius: 100,
        height: 85,
        width: 85,
        marginRight: 10,
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
        backgroundColor: Colors.light,
        borderRadius: 50,
        right: 0,
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginHorizontal: 10,
        marginBottom: 25,
    },
})
