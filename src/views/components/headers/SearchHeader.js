import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from '../FiplyComponents'
import Colors from '../../../utils/Colors'
import { TextInput as TxtInput } from 'react-native-paper'

const SearchHeader = ({ rightIcon = false, leftIcon = false }) => {
    return (
        <View style={styles.container}>
            {leftIcon ? leftIcon() : null}
            <View style={{ flex: 1, paddingHorizontal: 5 }}>
                <TextInput
                    style={styles.inputStyles}
                    label="Search"
                    right={
                        <TxtInput.Icon
                            style={{ marginTop: 15 }}
                            name="magnify"
                            size={28}
                            color={Colors.light}
                        />
                    }
                    roundness={10}
                />
            </View>
            {rightIcon ? rightIcon() : null}
        </View>
    )
}

export default SearchHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    inputStyles: {
        fontFamily: 'EncodeSansExpaded-Light',
        height: 35,
        marginBottom: 6,
        backgroundColor: Colors.white,
    },
    rightIcon: {
        position: 'absolute',
        right: 20,
    },
    leftIcon: {
        position: 'absolute',
        left: 20,
    },
})
