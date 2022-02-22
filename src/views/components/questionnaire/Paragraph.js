import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../utils/Colors'
import { TextInput, Text } from '../FiplyComponents'
import { MaterialIcons } from '@expo/vector-icons'

const Paragraph = ({
    item,
    index,
    disabled = false,
    onCloseButton = () => {},
    showCloseButton,
}) => {
    return (
        <View style={styles.container}>
            {showCloseButton ? (
                <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={onCloseButton}
                >
                    <MaterialIcons
                        name="highlight-remove"
                        size={28}
                        color={Colors.red}
                    />
                </TouchableOpacity>
            ) : null}

            <Text weight="medium" style={styles.question}>
                {index ? index + ' . ' : ''}
                {item.question}
            </Text>
            <TextInput
                label="Your answer"
                style={{ backgroundColor: Colors.white, maxHeight: 150 }}
                dense
                multiline
                disabled={disabled}
            />
        </View>
    )
}

export default Paragraph

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
    closeBtn: {
        position: 'absolute',
        right: 10,
        top: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
})
