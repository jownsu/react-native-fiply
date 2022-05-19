import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Dialog, Portal, Switch } from 'react-native-paper'
import { Text } from '../FiplyComponents'
import { FontAwesome5 } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

const NavigationModal = ({
    navTitles = [],
    visible = false,
    onDismiss = () => {},
    onBtnPress = () => {},
}) => {
    const [navIndex, setNavIndex] = useState(0)

    return (
        <View>
            <Portal>
                <Dialog style={styles.dialogContainer} visible={visible} onDismiss={onDismiss}>
                    <View style={styles.bodyContainer}>
                        {navTitles.map((item, ind) => {
                            return (
                                <TouchableOpacity
                                    key={ind}
                                    style={styles.actionContainer}
                                    onPress={() => {
                                        setNavIndex(ind)
                                        if (ind != navIndex) {
                                            onBtnPress(ind)
                                        }
                                        onDismiss()
                                    }}
                                >
                                    <Text
                                        color={navIndex == ind ? Colors.primary : Colors.black}
                                        weight={navIndex == ind ? 'bold' : 'light'}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            )
                        })}
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

export default NavigationModal
