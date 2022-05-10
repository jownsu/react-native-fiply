import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from '../FiplyComponents'
import { FontAwesome5 } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

const HeaderTitle = ({
    onBackPress = () => {},
    title,
    centerTitle,
    style = {},
    textColor = Colors.primary,
    textWeight = 'medium',
    textSize = 16,
    iconColor = Colors.black,
    rightIcon = false,
}) => {
    let containerStyle = centerTitle ? { justifyContent: 'center' } : {}

    return (
        <View style={{ ...styles.container, ...containerStyle, ...style }}>
            <Text
                weight={textWeight}
                size={textSize}
                color={textColor}
                style={centerTitle ? {} : { marginLeft: 10 }}
            >
                {title}
            </Text>
            {rightIcon ? <View style={styles.rightIcon}>{rightIcon()}</View> : null}
        </View>
    )
}

export default HeaderTitle

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
})
