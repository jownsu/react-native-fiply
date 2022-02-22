import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '../FiplyComponents'
import Colors from '../../../utils/Colors'
import { FontAwesome } from '@expo/vector-icons'

const CardInfo = ({ title, headers, infos }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text center weight="medium" size={14}>
                    {title}
                </Text>
                {/* <FontAwesome name="edit" size={21} color={Colors.black} style={styles.editIcon}/>  */}
            </View>

            <View style={styles.bodyContainer}>
                {Object.values(infos).map((item, index) => {
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
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        marginBottom: 5,
    },
    headerContainer: {
        justifyContent: 'center',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderColor: Colors.light,
    },
    editIcon: {
        position: 'absolute',
        right: 10,
    },
    col: {
        flexDirection: 'row',
        paddingVertical: 7,
    },
    colKey: {
        flex: 1,
    },
    colVal: {
        flex: 2,
    },
})
