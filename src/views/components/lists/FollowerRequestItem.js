import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Button, SecondaryButton } from '../FiplyComponents'
import { Avatar } from 'react-native-paper'
import Colors from '../../../utils/Colors'

const FollowerRequestItem = memo(
    ({ data, onConfirmPress = () => {}, onDeletePress = () => {} }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemBodyContainer}>
                    <Avatar.Image
                        source={{ uri: data.avatar }}
                        size={82}
                        backgroundColor={Colors.light}
                    />
                    <View style={styles.nameContainer}>
                        <Text weight="semi-bold" size={16} numberOfLines={1} adjustsFontSizeToFit>
                            {data.fullname}
                        </Text>
                        <Text>{data.preview}</Text>
                        <Button
                            title="Confirm"
                            onPress={() => onConfirmPress(data.id)}
                            style={styles.confirmBtn}
                            labelStyle={styles.confirmLabel}
                        />
                    </View>
                </View>
            </View>
        )
    },
    (prevProps, nextProps) => {
        if (prevProps.id == nextProps.id) return true
        return false
    }
)

export default FollowerRequestItem

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    itemBodyContainer: {
        flexDirection: 'row',
    },
    nameContainer: {
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'space-around',
    },
    actionContainer: {
        flexDirection: 'row',
    },
    confirmBtn: {
        marginHorizontal: 0,
        padding: 0,
    },
    confirmLabel: {
        fontSize: 12,
        paddingVertical: 0,
    },
})
