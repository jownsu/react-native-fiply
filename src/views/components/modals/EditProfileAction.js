import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Dialog, Portal, Switch } from 'react-native-paper'
import { Text } from '../FiplyComponents'
import { FontAwesome5 } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

const EditProfileAction = ({
    visible = false,
    onDismiss = () => {},
    onEditProfilePress = () => {},
    onSeeProfileQRPress = () => {},
}) => {
    return (
        <View>
            <Portal>
                <Dialog style={styles.dialogContainer} visible={visible} onDismiss={onDismiss}>
                    <View style={styles.headerContainer}>
                        <Text weight="medium">Profile Settings</Text>
                    </View>
                    <View style={styles.bodyContainer}>
                        <TouchableOpacity
                            style={styles.actionContainer}
                            onPress={onEditProfilePress}
                        >
                            <Text>Edit Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionContainer}
                            onPress={onSeeProfileQRPress}
                        >
                            <Text>See Profile Link / QR</Text>
                        </TouchableOpacity>
                    </View>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    dialogContainer: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15,
    },
    headerContainer: {
        borderBottomWidth: 1,
        borderColor: Colors.light,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    bodyContainer: {
        paddingVertical: 10,
    },
    actionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderBottomColor: Colors.light,
        borderBottomWidth: 1,
    },
    swithStyle: {
        height: 40,
    },
})

export default EditProfileAction
