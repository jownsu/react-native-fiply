import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Avatar } from 'react-native-paper'
import { SecondaryButton, Button, Text } from '../FiplyComponents'
import Colors from '../../../utils/Colors'

const FollowingItem = memo(
    ({
        item = {},
        onFollowingBtnPress = () => {},
        onFollowBtnPress = () => {},
        onPendingtBtnPress = () => {},
    }) => {
        const renderBtn = () => {
            switch (true) {
                case item.is_me:
                    return null
                case item.is_following:
                    return (
                        <SecondaryButton
                            onPress={() => onFollowingBtnPress(item)}
                            title={'Following'}
                            style={styles.secondaryBtnStyle}
                            labelStyle={styles.secondartyBtnlabelStyle}
                        />
                    )
                case item.is_following_pending:
                    return (
                        <SecondaryButton
                            onPress={() => {
                                onPendingtBtnPress(item)
                            }}
                            title={'Pending'}
                            style={styles.secondaryBtnStyle}
                            labelStyle={styles.secondartyBtnlabelStyle}
                        />
                    )
                default:
                    return (
                        <Button
                            onPress={() => {
                                onFollowBtnPress(item)
                            }}
                            title={'Follow'}
                            style={styles.btnStyle}
                            labelStyle={styles.btnLabelStyle}
                        />
                    )
            }
        }

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

                    {renderBtn()}
                </View>
            </View>
        )
    },
    (prevProps, nextProps) => {
        if (prevProps.item.is_follower != nextProps.item.is_follower) return false
        if (prevProps.item.is_follower_pending != nextProps.item.is_follower_pending) return false
        if (prevProps.item.is_following != nextProps.item.is_following) return false
        if (prevProps.item.is_following_pending != nextProps.item.is_following_pending) return false
        if (prevProps.item.id == nextProps.item.id) return true
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
    secondaryBtnStyle: {
        marginHorizontal: 0,
        borderColor: Colors.grey,
        borderRadius: 7,
        borderWidth: 1,
    },
    secondartyBtnlabelStyle: {
        fontSize: 12,
        marginVertical: 5,
        marginHorizontal: 10,
        color: Colors.black,
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
