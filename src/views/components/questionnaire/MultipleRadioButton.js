import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../../utils/Colors'
import { Text } from '../FiplyComponents'
import { RadioButton } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'

const MultipleRadioButton = ({
    item,
    index,
    onCloseButton = () => {},
    showCloseButton,
    onChangeText = () => {},
}) => {
    const [indexRB, setindexRB] = useState()

    return (
        <View style={styles.container}>
            {showCloseButton ? (
                <TouchableOpacity style={styles.closeBtn} onPress={onCloseButton}>
                    <MaterialIcons name="highlight-remove" size={28} color={Colors.red} />
                </TouchableOpacity>
            ) : null}
            <Text weight="medium" style={styles.question}>
                {index ? index + ' . ' : ''}
                {item.question}
            </Text>
            <View style={styles.optionsContainer}>
                {item.options.map((item, index) => (
                    <View key={index} style={styles.options}>
                        <RadioButton
                            value=""
                            status={index == indexRB ? 'checked' : 'unchecked'}
                            onPress={() => {
                                onChangeText(item)
                                setindexRB(index)
                            }}
                        />
                        <Text>{item}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default MultipleRadioButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        padding: 15,
        borderWidth: 1,
        borderColor: Colors.light,
        borderRadius: 10,
        marginBottom: 5,
    },
    question: {
        marginBottom: 25,
    },
    optionsContainer: {
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    options: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
    },
    closeBtn: {
        position: 'absolute',
        right: 10,
        top: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
})
