import React, { useState, useRef } from 'react'
import { StyleSheet, View, TouchableOpacity, FlatList} from 'react-native'
import Colors from '../../../utils/Colors'
import { TextInput } from './TextInput'
import { ActivityIndicator } from './ActivityIndicator'
import { TextInput as TxtInput, Dialog, Portal } from 'react-native-paper'
import { Text } from './Text'

export const Dropdown = ({
    data,
    visibleDropdown,
    label,
    style,
    textInputStyle,
    value,
    onChangeText = () => {},
    onSubmit = () => {},
    error,
    errorMsg,
    dropdownIcon,
    iconSize = 32,
    iconStyle,
    noTextInput,
    isLoading = false,
    onChangeTextDelay = () => {},
    delay = 500
    
}) => {

    const [filteredData, setFilteredData] = useState(data)
    const [visibleDialog, setVisibleDialog] = useState(false)
    const [txtVal, setTxtVal] = useState('')
    const [timer, setTimer] = useState(null)


    const onSearch  = (txt) =>{
        if(txt){
            let searchText = txt.toLowerCase()

            let test = data.filter(item => {
                if(item.name.toLowerCase().match(searchText)){
                    return item
                }
            })
            // setFilteredData(test.slice(0, 5))
            setFilteredData(test)
        }
    }

    return (
        <View style={{ ...style }}>
                <TouchableOpacity 
                    activeOpacity={0.6} 
                    onPress={() => setVisibleDialog(true)}
                >
                    <TextInput
                        label={label}
                        value={value}
                        error={error}
                        errorMsg={errorMsg}
                        nonEditable
                        style={{ ...textInputStyle }}
                        right={
                            dropdownIcon 
                                ? (
                                    <TxtInput.Icon 
                                        name="chevron-down" 
                                        color={Colors.black} 
                                        size={iconSize} 
                                        style={{ ...iconStyle }} 
                                        onPress={() => {}}
                                        disabled
                                    />
                                )
                                : null
                            }
                    />
            </TouchableOpacity>

            <Portal>
                <Dialog style={styles.dialogContainer} visible={visibleDialog} onDismiss={()=> setVisibleDialog(false)}>

                    { 
                        !noTextInput 
                            ? (
                                <TextInput
                                    label={label}
                                    value={txtVal}
                                    onChangeText={text => {
                                        clearTimeout(timer)
                                        const newTimer = setTimeout(() => {
                                            onChangeTextDelay(text)
                                        }, delay)
                                        setTimer(newTimer)
                                        onSearch(text)
                                        setTxtVal(text)
                                    }}
                                    onSubmitEditing={() => {
                                        // onChangeText(text)
                                        onSubmit(txtVal)
                                        setVisibleDialog(false)
                                    }}
                                    active={visibleDropdown}
                                    style={{ ...textInputStyle }}
                                    dense
                                    autoFocus
                                />
                            )   
                            : null
                    }

                    { isLoading ? <ActivityIndicator /> : null }
                    
                    <FlatList
                        data={ filteredData }
                        keyExtractor={item => item.id}
                        renderItem={({item}) => {
                            return (
                                <TouchableOpacity 
                                    style={{ ...styles.dropdownTextContainer }} 
                                    onPress={() => {
                                        onSubmit(item.name)
                                        setVisibleDialog(false)
                                    }}
                                >
                                    <Text>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />

                    {
                        !noTextInput
                            ? (
                            <TouchableOpacity 
                                activeOpacity={.8} 
                                onPress={() => {
                                            onSubmit(txtVal)
                                            setVisibleDialog(false)
                                        }}
                                style={{ alignSelf: 'flex-end', alignItems: 'center', width: 60, padding: 5 }}
                            >
                                <Text weight='medium' color={Colors.secondary}>Done</Text>
                            </TouchableOpacity>
                            )
                            : null
                    }


                </Dialog>
            </Portal>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
    },
    txtBtn:{
        borderWidth: 1,
        height: 60,
        justifyContent: 'center',
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor: Colors.white
    },
    txtBtnLabel:{
        fontSize: 16,
    },
    dialogContainer:{
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 7,
        maxHeight: 300
    },
    dropdownTextContainer:{
        padding: 15,
        borderBottomWidth: 1,
        borderColor: Colors.light,
    },

})
