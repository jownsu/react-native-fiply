import { StyleSheet, View } from 'react-native'
import { Text } from './FiplyComponents'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../../utils/Colors'

const AccountLevelBar = ({ level = 0 }) => {
    return (
        <View style={styles.container}>
            <View style={styles.barContainer}>
                <View
                    style={[
                        styles.bar,
                        level >= 1 ? { backgroundColor: Colors.secondaryLight } : {},
                    ]}
                ></View>
                <View
                    style={[
                        styles.bar,
                        level >= 2 ? { backgroundColor: Colors.secondaryLight } : {},
                    ]}
                ></View>
            </View>
            <View style={[styles.iconContainer, { alignItems: 'flex-start' }]}>
                <MaterialIcons
                    name="check"
                    size={24}
                    color={Colors.white}
                    style={[
                        styles.icon,
                        level >= 0
                            ? { backgroundColor: Colors.secondary }
                            : { backgroundColor: Colors.light },
                    ]}
                />
                <Text
                    size={11}
                    weight="medium"
                    color={level >= 0 ? Colors.secondary : Colors.light}
                    style={styles.iconText}
                >
                    Basic
                </Text>
            </View>
            <View style={[styles.iconContainer, { alignItems: 'center' }]}>
                <MaterialIcons
                    name="check"
                    size={24}
                    color={Colors.white}
                    style={[
                        styles.icon,
                        level >= 1
                            ? { backgroundColor: Colors.secondary }
                            : { backgroundColor: Colors.light },
                    ]}
                />
                <Text
                    size={11}
                    weight="medium"
                    color={level >= 1 ? Colors.secondary : Colors.light}
                    style={styles.iconText}
                >
                    Semi-Verified
                </Text>
            </View>
            <View style={[styles.iconContainer, { alignItems: 'flex-end' }]}>
                <MaterialIcons
                    name="check"
                    size={24}
                    color={Colors.white}
                    style={[
                        styles.icon,
                        level >= 2
                            ? { backgroundColor: Colors.secondary }
                            : { backgroundColor: Colors.light },
                    ]}
                />
                <Text
                    size={11}
                    weight="medium"
                    color={level >= 2 ? Colors.secondary : Colors.light}
                    style={styles.iconText}
                >
                    Fully Verified
                </Text>
            </View>
        </View>
    )
}

export default AccountLevelBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        backgroundColor: Colors.light,
        borderRadius: 100,
        padding: 5,
    },
    iconText: { marginTop: 3 },
    iconContainer: {
        flex: 1,
    },
    barContainer: {
        backgroundColor: Colors.lighter,
        width: '100%',
        position: 'absolute',
        borderRadius: 50,
        height: 25,
        top: 5,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    bar: {
        flex: 1,
    },
})
