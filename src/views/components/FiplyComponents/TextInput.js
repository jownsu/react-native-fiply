import React from 'react'
import { View } from 'react-native'
import { TextInput as XTextInput } from 'react-native-paper'
import { Text } from './Text'
import Colors from '../../../utils/Colors'

export const TextInput = ({label, value, onChangeText, autoCapitalize = 'none', onBlur, error, secureTextEntry=false, style, right, errorMsg = '' }) => {
    return (
        <View>
            <XTextInput
                label={label}
                value={value}
                onChangeText={onChangeText}
                autoCapitalize={autoCapitalize}
                autoCorrect={false}
                mode='outlined'
                outlineColor={Colors.light}
                activeOutlineColor={Colors.primary}
                onBlur={ onBlur }
                theme={{ colors: { text: Colors.black, placeholder: Colors.light} }}
                error={error}
                secureTextEntry={secureTextEntry}
                style={style}
                right={right}
            />
            {
            errorMsg 
                ? <Text color={Colors.red}>{errorMsg}</Text>
                : null
            }
            
        </View>
    )
}
