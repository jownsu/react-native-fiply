import React from 'react'
import { View, TextInput as NativeTextInput } from 'react-native'
import { TextInput as XTextInput } from 'react-native-paper'
import { Text } from './Text'
import Colors from '../../../utils/Colors'

export const TextInput = ({
        label, 
        value, 
        onChangeText, 
        autoCapitalize = 'none', 
        onBlur, 
        error, 
        secureTextEntry=false, 
        style, 
        right, 
        errorMsg = '', 
        onFocus, 
        onEndEditting,
        nonEditable,
        active,
        roundness = 5,
        multiline = false,
        mode = 'outlined',
        dense = false
    
    }) => {
    return (
        <View>
            <XTextInput
                label={label}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize={autoCapitalize}
                autoCorrect={false}
                mode={mode}
                outlineColor={ active ? Colors.primary : Colors.light}
                activeOutlineColor={Colors.primary}
                activeUnderlineColor={Colors.primary}
                onBlur={ onBlur }
                theme={{ 
                    colors: { text: Colors.black, placeholder: active ? Colors.primary : Colors.grey}, 
                    fonts: {regular: { fontFamily: 'EncodeSansExpaded-Light'}}, 
                    roundness: roundness,
                }}
                error={error}
                secureTextEntry={secureTextEntry}
                dense={dense}
                style={style}
                right={right}
                onFocus={onFocus}
                // onEndEditing={onEndEditting}
                editable={nonEditable ? false : true}
                multiline={multiline}
                render={(innerProps) => (
                    <NativeTextInput 
                        {...innerProps}
                        style={[innerProps.style, {textAlignVertical: 'center'}]}
                    />
                )}
            />
            {
            errorMsg 
                ? <Text color={Colors.red}>{errorMsg}</Text>
                : null
            }
            
        </View>
    )
}
