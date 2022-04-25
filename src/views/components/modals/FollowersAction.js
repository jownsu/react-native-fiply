import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Dialog, Portal, Avatar } from 'react-native-paper'
import { Text } from '../FiplyComponents'
import Colors from '../../../utils/Colors'

const FollowersAction = ({
    visible = false,
    user = {},
    onDismiss = () => {},
    onRemovePress = () => {},
}) => {
    return (
        <View>
            <Portal>
                <Dialog style={styles.dialogContainer} visible={visible} onDismiss={onDismiss}>
                    <View style={styles.headerContainer}>
                        <Avatar.Image
                            source={{ uri: user.avatar }}
                            size={100}
                            backgroundColor={Colors.light}
                            style={{ marginBottom: 20 }}
                        />
                        <View style={styles.textContainer}>
                            <Text center size={21} style={{ marginBottom: 10 }}>
                                Remove Follower?
                            </Text>
                            <Text center size={14}>
                                Fiply wont tell <Text weight="medium">{user.name}</Text> they were
                                removed from your followers
                            </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => onRemovePress(user.id)}>
                        <Text color={Colors.red} weight="medium">
                            Remove
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={onDismiss}>
                        <Text weight="medium">Cancel</Text>
                    </TouchableOpacity>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    dialogContainer: {
        borderRadius: 10,
    },
    headerContainer: {
        alignItems: 'center',
        paddingVertical: 25,
    },
    textContainer: {
        paddingHorizontal: 20,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderColor: Colors.light,
    },
})

export default FollowersAction
