import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from '../FiplyComponents'
import Colors from '../../../utils/Colors'
import { TextInput as TxtInput, Searchbar } from 'react-native-paper'

const SearchBar = ({
    rightIcon = false,
    leftIcon = false,
    containerStyle = {},
    inputStyle = {},
    onSubmit = () => {},
    onBlurClear = () => {},
}) => {
    const [searchVal, setSearchVal] = useState('')

    const handleBlur = () => {
        if (searchVal == '') {
            onBlurClear()
        }
    }

    return (
        <View style={[styles.container, containerStyle]}>
            {leftIcon ? leftIcon() : null}
            <View style={styles.searchBarStyle}>
                <Searchbar
                    style={{ borderRadius: 10, height: 35 }}
                    placeholder="Search"
                    onChangeText={(text) => setSearchVal(text)}
                    value={searchVal}
                    onSubmitEditing={() => onSubmit(searchVal)}
                    inputStyle={[styles.inputStyles, inputStyle]}
                    onBlur={handleBlur}
                />
            </View>
            {rightIcon ? rightIcon() : null}
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    inputStyles: {
        fontFamily: 'EncodeSansExpaded-Light',
        fontSize: 14,
    },
    searchBarStyle: {
        flex: 1,
        paddingHorizontal: 5,
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
