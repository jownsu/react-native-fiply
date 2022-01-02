import React, { useState } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import { TextInput } from './TextInput'
import { Text } from './Text'
import Colors from '../../../utils/Colors'
import { TextInput as TxtInput } from 'react-native-paper'

export const InputDropdown = ({
        label, 
        value, 
        onChangeText, 
        onBlur, 
        onFocus, 
        error, 
        style, 
        errorMsg = '', 
        data, 
        visibleDropdown, 
        onListPress,
        nonEditable,
        onInputPress,
        dropdownIcon
     }) => {

    const [filteredData, setFilteredData] = useState([])



    const onSearch  = (txt) =>{

        if(txt){
            let searchText = txt.toLowerCase()

            let test = data.filter(item => {
                if(item.name.toLowerCase().match(searchText)){
                    return item
                }
            })
            setFilteredData(test.slice(0, 5))
        }
        
    }

    return (
        <View style={{ ...styles.container, ...style }} >
            <TouchableOpacity onPress={() => onInputPress ? onInputPress() : null} activeOpacity={1}>
                <TextInput
                    label={label}
                    value={value}
                    onChangeText={text => {
                        onChangeText(text)
                        onSearch(text)
                    }}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    error={error}
                    errorMsg={errorMsg}
                    right={dropdownIcon ? <TxtInput.Icon name="chevron-down" color={visibleDropdown ? Colors.primary : Colors.light} size={32} onPress={() => onInputPress ? onInputPress() : null} /> : null}
                    nonEditable={nonEditable ? true : false}
                    active={visibleDropdown}
                />
            </TouchableOpacity>

                {
                    visibleDropdown
                        ? 
                            <View style={styles.dropdownContainer}>
                                <FlatList
                                    data={ nonEditable ? data : filteredData}
                                    keyExtractor={item => item.id}
                                    renderItem={({item}) => {
                                        return (
                                            <TouchableOpacity style={styles.dropdownTextContainer} onPress={ onListPress ? () => onListPress(item.name) : null}>
                                                <Text style={styles.dropdownText}>{item.name}</Text>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            </View>
                        : null
                }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
    },
    dropdownContainer: {
        backgroundColor: Colors.white,
        elevation: 7,
        position: 'absolute',
        top: '100%',
        width: '100%',
        zIndex: 100,
    },
    dropdownTextContainer:{
        padding: 15,
        borderBottomWidth: 1,
        borderColor: Colors.light
    },
    dropdownText:{
    },
})





