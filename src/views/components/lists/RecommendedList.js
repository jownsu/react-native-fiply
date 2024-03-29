import React from 'react'
import { StyleSheet, FlatList, View, TouchableOpacity } from 'react-native'
import { ActivityIndicator, Text } from '../FiplyComponents'
import { FontAwesome5 } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

const RecommendedList = ({
    onIdPress = () => {},
    style,
    data,
    isLoading = false,
}) => {
    return (
        <View style={{ ...style }}>
            {isLoading ? <ActivityIndicator /> : false}
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            style={styles.listIdContainer}
                            onPress={() => onIdPress(item.name)}
                            activeOpacity={0.6}
                        >
                            <Text size={16}>{item.name}</Text>
                            <FontAwesome5
                                name="angle-right"
                                size={24}
                                color={Colors.primary}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default RecommendedList

const styles = StyleSheet.create({
    listIdContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: Colors.grey,
        height: 45,
    },
})
