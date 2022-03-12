import React from 'react'
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import { Text } from '../FiplyComponents'
import Colors from '../../../utils/Colors'
import { FontAwesome } from '@expo/vector-icons'

const ProfileHeader = ({ data, onEditPress = () => {} }) => {
    return (
        <View style={styles.container}>
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

            <View style={styles.bodyContainer}>
                <Text weight="semi-bold" size={16} numberOfLines={1} center>
                    {data.fullname}
                </Text>
                <Text size={13} numberOfLines={1} center style={{ marginVertical: 2 }}>
                    {data.email}
                </Text>
                {data.location ? (
                    <Text size={11} numberOfLines={1} center style={{}}>
                        {data.location}
                    </Text>
                ) : null}
            </View>

            <View style={styles.footerContainer}>
                <Text weight="medium" color={Colors.primary} style={{ marginBottom: 3 }}>
                    {data.status}
                </Text>
                {data.preview && <Text>{data.preview}</Text>}
            </View>
        </View>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderWidth: 1,
        borderColor: Colors.light,
    },
    imgContainer: {
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.grey,
        backgroundColor: Colors.white,
        elevation: 3,
        borderRadius: 100,
        position: 'absolute',
        top: -50,
        alignSelf: 'center',
    },
    editIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    bodyContainer: {
        marginTop: 50,
        marginBottom: 15,
    },
    footerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: Colors.light,
        paddingTop: 7,
    },
})
