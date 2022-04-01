import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Dialog, Portal, Button } from 'react-native-paper'
import { Text } from '../FiplyComponents'
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

const FollowersAction = ({
    visible = false,
    user = {},
    onDismiss = () => {},
    onVisitPress = () => {},
    onMessagePress = () => {},
    onRemovePress = () => {},
}) => {
    return (
        <View>
            <Portal>
                <Dialog style={styles.dialogContainer} visible={visible} onDismiss={onDismiss}>
                    <View>
                        <TouchableOpacity style={styles.btn} onPress={onVisitPress}>
                            <FontAwesome
                                name="user"
                                size={24}
                                color={Colors.black}
                                style={{ width: 40 }}
                            />
                            <Text weight="medium" flex>
                                Visit Profile
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={onMessagePress}>
                            <MaterialIcons
                                name="message"
                                size={24}
                                color={Colors.black}
                                style={{ width: 40 }}
                            />
                            <Text weight="medium" flex>
                                Message {user.fullname}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btn} onPress={onRemovePress}>
                            <FontAwesome
                                name="user-times"
                                size={24}
                                color={Colors.red}
                                style={{ width: 40 }}
                            />
                            <Text color={Colors.red} weight="medium" flex>
                                Remove {user.fullname} as your follower
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

export default FollowersAction
