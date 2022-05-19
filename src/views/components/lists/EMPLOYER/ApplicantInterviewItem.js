import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from '../../FiplyComponents'
import React, { memo } from 'react'
import { Avatar } from 'react-native-paper'
import Colors from '../../../../utils/Colors'

const ApplicantInterviewItem = memo(
    ({ data, onCardPress = () => {} }) => {
        return (
            <TouchableOpacity
                style={styles.container}
                activeOpacity={0.9}
                onPress={() => onCardPress(data.id)}
            >
                <Avatar.Image source={{ uri: data.avatar }} style={styles.img} size={64} />
                <View style={styles.bodyContainer}>
                    <Text weight="medium" size={16}>
                        {data.name}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text weight="medium" color={Colors.primary}>
                            Date:{' '}
                        </Text>
                        <Text>{data.meet_date}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text weight="medium" color={Colors.primary}>
                            Time:{' '}
                        </Text>
                        <Text>{data.meet_time}</Text>
                    </View>
                </View>
                <Text size={11} style={styles.date}>
                    {data.applied_at}
                </Text>
            </TouchableOpacity>
        )
    },
    (prevProps, nextProps) => {
        if (prevProps.data.id == nextProps.data.id) return true
        return false
    }
)

export default ApplicantInterviewItem

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Colors.white,
        borderBottomWidth: 2,
        borderColor: Colors.light,
        flexDirection: 'row',
        elevation: 7,
    },
    img: {
        marginRight: 10,
        backgroundColor: Colors.white,
    },
    bodyContainer: {
        alignSelf: 'center',
        flex: 1,
    },
    data: {},
})
