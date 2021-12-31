import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DropDown from 'react-native-paper-dropdown'
import Colors from '../../../utils/Colors'

export const Dropdown = ({label, visible, showDropDown, onDismiss, value, setValue, list, style}) => {
    return (
        <View style={{ ...style }}>
            <DropDown
                label={label}
                mode={"outlined"}
                visible={visible}
                showDropDown={() => showDropDown()}
                onDismiss={() => onDismiss()}
                value={value}
                setValue={setValue}
                list={list}
                theme={{ colors: {placeholder: visible ? Colors.primary : Colors.grey}, fonts: { regular: {fontFamily: 'EncodeSansExpaded-Light'} } }}
                dropDownItemSelectedTextStyle={{fontFamily: 'EncodeSansExpaded-Light', color: Colors.primary }}
                dropDownItemTextStyle={{ fontFamily: 'EncodeSansExpaded-Light', color: Colors.black }}
            />
        </View>
    )
}

const styles = StyleSheet.create({})
