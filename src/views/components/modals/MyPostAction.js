import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Dialog, Portal, Button } from 'react-native-paper'
import { Text } from '../FiplyComponents'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

const MyPostAction = ({
    visible = false,
    onDismiss = () => {},
    onEditPress = () => {},
    onDeletePress = () => {},
}) => {
    return (
        <View>
            <Portal>
                <Dialog style={styles.dialogContainer} visible={visible} onDismiss={onDismiss}>
                    <View>
                        <TouchableOpacity style={styles.btn} onPress={onEditPress}>
                            <FontAwesome5
                                name="edit"
                                size={24}
                                color={Colors.black}
                                style={{ width: 35 }}
                            />
                            <Text weight="medium">Edit Post</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={onDeletePress}>
                            <FontAwesome
                                name="trash-o"
                                size={24}
                                color={Colors.red}
                                style={{ width: 35 }}
                            />
                            <Text weight="medium" color={Colors.red}>
                                Delete Post
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    dialogContainer: {},
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
})

export default MyPostAction
