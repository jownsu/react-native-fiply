import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import { Text } from '../FiplyComponents'
import React, { memo } from 'react'
import Colors from '../../../utils/Colors'
import { Entypo } from '@expo/vector-icons'

const HiringManagerItem = ({ item = {}, onItemPress = () => {} }) => {
    return (
        <TouchableOpacity style={styles.cardContainer} onPress={onItemPress}>
            <Avatar.Image
                source={{ uri: item.avatar }}
                style={styles.img}
                backgroundColor={Colors.white}
            />
            <View style={styles.cardInfoContainer}>
                <Text weight="semi-bold">{item.name}</Text>
                <Text>{item.email}</Text>
            </View>
            <View style={styles.rightContainer}>
                <Entypo name="dots-three-horizontal" size={24} color={Colors.black} />
                <Text size={10} color={Colors.grey}>
                    {item.time}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default HiringManagerItem

const styles = StyleSheet.create({
    img: {
        marginRight: 15,
    },
    cardContainer: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderColor: Colors.light,
        elevation: 3,
        marginVertical: 2,
    },
    cardInfoContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    rightContainer: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
})
