import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from '../FiplyComponents'
import Colors from '../../../utils/Colors'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'

const CardInfo = ({
    title = ' ',
    centerTitle = false,
    headers,
    infos,
    showAction = false,
    onEditPress = () => {},
    onDeletePress = () => {},
    style = {},
}) => {
    return (
        <View style={{ ...styles.container, ...style }}>
            <View style={styles.headerContainer}>
                {title ? (
                    <Text center={centerTitle} flex weight="medium" size={16}>
                        {title}
                    </Text>
                ) : null}
                {showAction ? (
                    <View style={styles.actionContainer}>
                        <TouchableOpacity onPress={onEditPress}>
                            <FontAwesome
                                name="edit"
                                size={21}
                                color={Colors.black}
                                style={styles.icon}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={onDeletePress}>
                            <MaterialIcons
                                name="delete"
                                size={21}
                                color={Colors.red}
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>

            <View style={styles.bodyContainer}>
                {Object.values(infos).map((item, index) => {
                    if (!item) {
                        return null
                    }
                    return (
                        <View style={styles.col} key={index}>
                            <Text weight="medium" style={styles.colKey}>
                                {headers[index]}
                            </Text>
                            <Text style={styles.colVal}>{item}</Text>
                        </View>
                    )
                })}
            </View>
        </View>
    )
}

export default CardInfo

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        marginBottom: 5,
    },
    headerContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: Colors.light,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    actionContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    icon: {
        paddingHorizontal: 5,
    },
    col: {
        flexDirection: 'row',
        paddingVertical: 7,
    },
    colKey: {
        flex: 1,
    },
    colVal: {
        flex: 1.7,
    },
})
