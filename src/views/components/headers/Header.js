import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from '../FiplyComponents'
import { FontAwesome5 } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

const Header = ({
    onBackPress = () => {},
    title,
    centerTitle,
    rightIcon = false,
    style = {},
    textColor = Colors.primary,
    textWeight = 'medium',
    textSize = 16,
    iconColor = Colors.black,
}) => {
    let containerStyle = centerTitle ? { justifyContent: 'center' } : {}

    return (
        <View style={{ ...styles.container, ...containerStyle, ...style }}>
            <TouchableOpacity onPress={() => onBackPress()} style={styles.backIcon}>
                <FontAwesome5 name="angle-left" size={24} color={iconColor} />
            </TouchableOpacity>
            <Text
                weight={textWeight}
                size={textSize}
                color={textColor}
                style={centerTitle ? {} : { marginLeft: 45 }}
            >
                {title}
            </Text>

            {rightIcon ? <View style={styles.rightIcon}>{rightIcon()}</View> : null}
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
    },
    rightIcon: {
        position: 'absolute',
        right: 20,
    },
    backIcon: {
        position: 'absolute',
        left: 20,
    },
})
