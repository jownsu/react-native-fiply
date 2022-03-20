import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text, ActivityIndicator } from '../FiplyComponents'
import Colors from '../../../utils/Colors'
import React from 'react'

const LoadMore = ({ onLoadMorePress = () => {}, isLoading = false }) => {
    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    onLoadMorePress()
                }}
                style={isLoading ? { display: 'flex' } : { display: 'none' }}
            >
                <Text
                    weight="medium"
                    color={Colors.secondary}
                    center
                    style={{ marginTop: 10, marginBottom: 20 }}
                >
                    Load More
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoadMore

const styles = StyleSheet.create({})
