import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from '../FiplyComponents'
import { Fontisto } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

const TitleFilter = ({
    title = 'Title',
    onFilterPress = () => {},
    titleColor = Colors.black,
    hideLine = false,
    style,
}) => {
    let lineStyle = hideLine ? { display: 'none' } : {}

    return (
        <View style={{ ...styles.container, ...style }}>
            <Text color={titleColor} weight="medium">
                {title}
            </Text>
            <View style={{ ...styles.horizontalLine, ...lineStyle }} />
            <Fontisto
                name="equalizer"
                size={21}
                color={Colors.black}
                onPress={onFilterPress}
            />
        </View>
    )
}

export default TitleFilter

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 5,
    },
    horizontalLine: {
        borderBottomWidth: 1,
        borderColor: Colors.grey,
        flex: 1,
        marginHorizontal: 10,
    },
})
