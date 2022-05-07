import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text, Button } from '../FiplyComponents'
import { Checkbox } from 'react-native-paper'
import Colors from '../../../utils/Colors'
import { MaterialIcons } from '@expo/vector-icons'

import React, { useState, useEffect } from 'react'

const MultipleCheckbox = ({
    item,
    index,
    disabled = false,
    onCloseButton = () => {},
    showCloseButton,
    onChangeText = () => {},
}) => {
    const [indexCB, setIndexCB] = useState([])

    const handleOnPress = (i) => {
        if (indexCB.includes(i)) {
            setIndexCB(indexCB.filter((item) => item != i))
        } else {
            setIndexCB([...indexCB, i])
        }
    }

    const getAllAnswers = (selectedOptions) => {
        let answerval = item.options.filter((val, index) => {
            if (selectedOptions.includes(index)) {
                return val
            }
            return null
        })

        return answerval
    }

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
                {item.options.map((optItem, index) => (
                    <View key={index} style={styles.options}>
                        <Checkbox
                            status={indexCB.includes(index) ? 'checked' : 'unchecked'}
                            onPress={() => {
                                if (indexCB.includes(index)) {
                                    setIndexCB(indexCB.filter((item) => item != index))
                                    onChangeText(
                                        getAllAnswers(indexCB.filter((item) => item != index))
                                    )
                                } else {
                                    setIndexCB([...indexCB, index])
                                    onChangeText(getAllAnswers([...indexCB, index]))
                                }

                                handleOnPress(index)
                                //onChangeText(getAllAnswers())
                            }}
                            disabled={disabled}
                        />
                        <Text>{optItem}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default MultipleCheckbox

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
