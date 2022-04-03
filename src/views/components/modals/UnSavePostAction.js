import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Dialog, Portal, Button } from 'react-native-paper'
import { Text } from '../FiplyComponents'
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

const UnSavePostAction = ({ visible = false, onDismiss = () => {}, onUnsavePress = () => {} }) => {
    return (
        <View>
            <Portal>
                <Dialog style={styles.dialogContainer} visible={visible} onDismiss={onDismiss}>
                    <View>
                        <TouchableOpacity style={styles.btn} onPress={onUnsavePress}>
                            <FontAwesome
                                name="trash-o"
                                size={24}
                                color={Colors.red}
                                style={{ width: 30 }}
                            />
                            <Text color={Colors.red} weight="medium">
                                Unsave this post
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

export default UnSavePostAction
