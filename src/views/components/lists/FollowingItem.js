import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import { SecondaryButton, Text } from '../FiplyComponents'
import Colors from '../../../utils/Colors'

const FollowingItem = memo(
    ({ item = {}, onFollowingBtnPress = () => {} }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemBodyContainer}>
                    <Avatar.Image
                        source={{ uri: item.avatar }}
                        size={70}
                        backgroundColor={Colors.light}
                    />

                    <View style={styles.nameContainer}>
                        <Text weight="semi-bold" size={14} numberOfLines={2} adjustsFontSizeToFit>
                            {item.fullname}
                        </Text>
                        <Text size={12} numberOfLines={1} adjustsFontSizeToFit>
                            {item.email}
                        </Text>
                    </View>
                    <SecondaryButton
                        onPress={() => onFollowingBtnPress(item)}
                        title={'Following'}
                        style={{
                            marginHorizontal: 0,
                            borderColor: Colors.grey,
                            borderRadius: 7,
                            borderWidth: 1,
                        }}
                        labelStyle={{
                            fontSize: 12,
                            marginVertical: 5,
                            marginHorizontal: 10,
                            color: Colors.black,
                        }}
                    />
                </View>
            </View>
        )
    },
    (prevProps, nextProps) => {
        if (prevProps.id == nextProps.id) return true
        return false
    }
)

export default FollowingItem

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    itemBodyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameContainer: {
        paddingHorizontal: 10,
        flex: 1,
    },
})
