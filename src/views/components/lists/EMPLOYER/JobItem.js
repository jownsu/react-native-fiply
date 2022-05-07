import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from '../../FiplyComponents'
import React, { memo } from 'react'
import { Avatar } from 'react-native-paper'
import Colors from '../../../../utils/Colors'

const JobItem = memo(
    ({ data, onCardPress = () => {} }) => {
        return (
            <TouchableOpacity
                style={styles.container}
                activeOpacity={0.9}
                onPress={() => onCardPress(data.id)}
            >
                <View style={styles.headerContainer}>
                    <Text weight="semi-bold" size={16} adjustsFontSizeToFit numberOfLines={2} flex>
                        {data.title}
                    </Text>
                    <Text size={12}>{data.posted_at}</Text>
                </View>

                <Text size={12}>Posted By:</Text>
                <View style={styles.authorContainer}>
                    <Avatar.Image style={styles.img} source={{ uri: data.avatar }} size={26} />
                    <Text>{data.name}</Text>
                </View>
                <View style={styles.footerContainer}>
                    <Text weight="medium" color={Colors.primary} size={24}>
                        {data.applicants_count}{' '}
                    </Text>
                    <Text>Applicants Available</Text>
                </View>
            </TouchableOpacity>
        )
    },
    (prevProps, nextProps) => {
        if (prevProps.data.applicants_count != nextProps.data.applicants_count) return false
        if (prevProps.data.id == nextProps.data.id) return true
        return false
    }
)

export default JobItem

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Colors.white,
        borderBottomWidth: 2,
        borderColor: Colors.light,
        elevation: 7,
    },
    authorContainer: {
        flexDirection: 'row',
        marginVertical: 5,
        alignItems: 'center',
    },
    headerContainer: {
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    img: {
        marginRight: 10,
    },
})
