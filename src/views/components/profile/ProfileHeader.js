import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import { Text } from '../FiplyComponents'
import Colors from '../../../utils/Colors'
import { FontAwesome } from '@expo/vector-icons'

const ProfileHeader = ({ data, onEditPress = () => {}, style }) => {
    return (
        <View style={{ ...styles.container, ...style }}>
            <View style={styles.imgContainer}>
                <Avatar.Image
                    size={110}
                    source={{ uri: data.avatar }}
                    backgroundColor={Colors.light}
                />
            </View>

            {data.is_me && (
                <TouchableOpacity onPress={onEditPress} style={styles.editIcon}>
                    <FontAwesome name="edit" size={24} color={Colors.black} />
                </TouchableOpacity>
            )}

            <View style={{ flex: 1 }}>
                <View style={styles.bodyContainer}>
                    <Text weight="semi-bold" size={16} numberOfLines={1} color={Colors.white}>
                        {data.fullname}
                    </Text>
                    <Text size={13} numberOfLines={1} color={Colors.white}>
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
                            weight="semi-bold"
                            style={{ marginVertical: 10 }}
                        >
                            {data.preview}
                        </Text>
                    )}
                    <View
                        style={{
                            flexDirection: 'row',
                        }}
                    >
                        <Text style={{ marginRight: 15 }} color={Colors.white}>
                            1 Following
                        </Text>
                        <Text color={Colors.white}>99 Followers</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    container: {
        // backgroundColor: Colors.white,
        // borderRadius: 20,
        // paddingVertical: 15,
        // paddingHorizontal: 5,
        // borderWidth: 1,
        // borderColor: Colors.light,
        backgroundColor: 'rgba(0,0,0,.5)',
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderColor: 'lime',
    },
    imgContainer: {
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.grey,
        backgroundColor: Colors.white,
        borderRadius: 100,
        height: 110,
        width: 110,
        marginRight: 15,
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
})
