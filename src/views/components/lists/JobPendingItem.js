import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from '../FiplyComponents'
import React, { memo } from 'react'
import { Avatar } from 'react-native-paper'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

const JobPendingItem = memo(
    ({ data, onCardPress = () => {} }) => {
        return (
            <TouchableOpacity
                style={jobListTyle.cardContainer}
                activeOpacity={0.9}
                onPress={() => onCardPress(data.id)}
            >
                <View style={jobListTyle.cardBodyContainer}>
                    <View style={jobListTyle.bodyHeadContainer}>
                        <View style={jobListTyle.imgContainer}>
                            <Avatar.Image
                                size={75}
                                source={{ uri: data.avatar }}
                                backgroundColor={Colors.light}
                            />
                        </View>
                        <View style={jobListTyle.infoContainer}>
                            <Text weight="semi-bold" size={16} style={jobListTyle.txtCompany}>
                                {data.company}
                            </Text>
                            <View style={jobListTyle.subInfoContainer}>
                                <Text
                                    weight="medium"
                                    color={Colors.black}
                                    style={jobListTyle.txtTitle}
                                >
                                    {data.title}
                                </Text>
                                <Text size={11}>
                                    {' \u25CF '} {data.employment_type}
                                </Text>
                            </View>
                            <View>
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
                        </View>
                    </View>
                    <View style={jobListTyle.bodyFootContainer}>
                        <Ionicons
                            name="location-sharp"
                            size={24}
                            color={Colors.primary}
                            style={{ marginRight: 5 }}
                        />
                        <Text size={12}>{data.location}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    },
    (prevProps, nextProps) => {
        if (prevProps.id == nextProps.id) return true
        return false
    }
)

export default JobPendingItem

const jobListTyle = StyleSheet.create({
    img: {
        height: 75,
        width: 75,
        borderRadius: 100,
        backgroundColor: Colors.white,
        borderWidth: 1,
    },
    imgContainer: {
        borderRadius: 50,
        overflow: 'hidden',
        marginRight: 15,
        borderWidth: 1,
        borderColor: Colors.light,
    },
    cardContainer: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 15,
        backgroundColor: Colors.white,
        marginBottom: 10,
        elevation: 5,
    },
    cardHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bodyHeadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    txtCompany: {
        textTransform: 'uppercase',
    },
    bodyFootContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardFooterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: Colors.grey,
    },
    footerBtn: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.grey,
    },
    infoContainer: {
        flex: 1,
    },
    subInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        flexWrap: 'wrap',
    },
})
