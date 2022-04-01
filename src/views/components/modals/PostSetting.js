import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Dialog, Portal, Button } from 'react-native-paper'
import { Text } from '../FiplyComponents'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

const PostSetting = ({
    visible = false,
    onDismiss = () => {},
    onSavePress = () => {},
    onReportPress = () => {},
}) => {
    return (
        <View>
            <Portal>
                <Dialog style={styles.dialogContainer} visible={visible} onDismiss={onDismiss}>
                    <View>
                        <TouchableOpacity style={styles.btn} onPress={onSavePress}>
                            <FontAwesome
                                name="bookmark"
                                size={24}
                                color={Colors.black}
                                style={{ width: 30 }}
                            />
                            <Text>Save this post</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={onReportPress}>
                            <FontAwesome5
                                name="font-awesome-flag"
                                size={24}
                                color={Colors.black}
                                style={{ width: 30 }}
                            />
                            <Text>Report this post</Text>
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

export default PostSetting
