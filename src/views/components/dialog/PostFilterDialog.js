import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Dialog, Portal, Switch } from 'react-native-paper'
import { Text } from '../FiplyComponents'
import { FontAwesome5 } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

const PostFilterDialog = ({
    visible = false,
    isMe = false,
    filterIndex = 0,
    onDismiss = () => {},
    onMyPostPress = () => {},
    onSharedPostPress = () => {},
    onSavedPostPress = () => {},
    onMostUpVotedPress = () => {},
    onLeastUpVotedPress = () => {},
}) => {
    return (
        <View>
            <Portal>
                <Dialog style={styles.dialogContainer} visible={visible} onDismiss={onDismiss}>
                    <View style={styles.headerContainer}>
                        <Text weight="medium">Post Filters</Text>
                    </View>
                    <View style={styles.bodyContainer}>
                        <TouchableOpacity
                            style={styles.actionContainer}
                            onPress={() => {
                                if (filterIndex != 0) {
                                    onMyPostPress('Posts', 0)
                                    onDismiss()
                                }
                            }}
                        >
                            <Text
                                weight={filterIndex == 0 ? 'medium' : 'light'}
                                color={filterIndex == 0 ? Colors.primary : Colors.black}
                            >
                                Recent Posts
                            </Text>
                        </TouchableOpacity>
                        {isMe ? (
                            <TouchableOpacity
                                style={styles.actionContainer}
                                onPress={() => {
                                    if (filterIndex != 1) {
                                        onSavedPostPress('Saved Posts', 1)
                                        onDismiss()
                                    }
                                }}
                            >
                                <Text
                                    weight={filterIndex == 1 ? 'medium' : 'light'}
                                    color={filterIndex == 1 ? Colors.primary : Colors.black}
                                >
                                    Saved Posts
                                </Text>
                            </TouchableOpacity>
                        ) : null}
                        <TouchableOpacity
                            style={styles.actionContainer}
                            onPress={() => {
                                if (filterIndex != 2) {
                                    onMostUpVotedPress('Most UpVoted Posts', 2)
                                    onDismiss()
                                }
                            }}
                        >
                            <Text
                                weight={filterIndex == 2 ? 'medium' : 'light'}
                                color={filterIndex == 2 ? Colors.primary : Colors.black}
                            >
                                Most UpVoted Posts
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionContainer}
                            onPress={() => {
                                if (filterIndex != 3) {
                                    onLeastUpVotedPress('Least UpVoted Posts', 3)
                                    onDismiss()
                                }
                            }}
                        >
                            <Text
                                weight={filterIndex == 3 ? 'medium' : 'light'}
                                color={filterIndex == 3 ? Colors.primary : Colors.black}
                            >
                                Least UpVoted Posts
                            </Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            style={styles.actionContainer}
                            onPress={() => {
                                if (filterIndex != 4) {
                                    onSharedPostPress()
                                    setFilterIndex(4)
                                    onDismiss()
                                }
                            }}
                        >
                            <Text
                                weight={filterIndex == 4 ? 'medium' : 'light'}
                                color={filterIndex == 4 ? Colors.primary : Colors.black}
                            >
                                Shared Posts
                            </Text>
                        </TouchableOpacity> */}
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

export default PostFilterDialog
