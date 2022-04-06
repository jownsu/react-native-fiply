import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, Button, SecondaryButton } from '../FiplyComponents'
import { Avatar } from 'react-native-paper'
import Colors from '../../../utils/Colors'

const PendingRequestItem = memo(
    ({ data, onCancelPress = () => {} }) => {
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
                        <SecondaryButton
                            title="Cancel"
                            onPress={() => onCancelPress(data.id)}
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

export default PendingRequestItem

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
        borderColor: Colors.red,
        marginHorizontal: 0,
        padding: 0,
    },
    confirmLabel: {
        color: Colors.red,
        fontSize: 12,
        paddingVertical: 0,
    },
})
