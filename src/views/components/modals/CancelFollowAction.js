import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Dialog, Portal, Avatar } from 'react-native-paper'
import { Text } from '../FiplyComponents'
import Colors from '../../../utils/Colors'

const CancelFollowAction = ({
    visible = false,
    user = {},
    onDismiss = () => {},
    onCancelFollow = () => {},
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
                        <Text>
                            Cancel follow request to <Text weight="medium">{user.name}</Text>?
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={() => onCancelFollow(user.id)}>
                        <Text color={Colors.red} weight="medium">
                            Cancel follow request
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
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderColor: Colors.light,
    },
})

export default CancelFollowAction
