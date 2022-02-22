import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from '../FiplyComponents'
import React, { memo } from 'react'
import { Avatar } from 'react-native-paper'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

const JobItem = memo(
    ({ data, onCardPress = () => {} }) => {
        return (
            <TouchableOpacity
                style={jobListTyle.cardContainer}
                activeOpacity={0.9}
                onPress={() => onCardPress(data.id)}
            >
                <View style={jobListTyle.cardHeaderContainer}>
                    <Text
                        weight="semi-bold"
                        color={Colors.primary}
                        style={jobListTyle.txtTitle}
                    >
                        {data.title}
                    </Text>
                    <Text style={{ marginHorizontal: 10 }}>{'\u25CF'}</Text>
                    <Text size={11}>{data.employment_type}</Text>
                </View>

                <View style={jobListTyle.cardBodyContainer}>
                    <View style={jobListTyle.bodyHeadContainer}>
                        <View style={jobListTyle.imgContainer}>
                            <Avatar.Image
                                size={75}
                                source={{ uri: data.image }}
                                backgroundColor={Colors.light}
                            />
                        </View>

                        <Text
                            weight="medium"
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={jobListTyle.txtCompany}
                            flex
                        >
                            {data.company}
                        </Text>
                    </View>

                    {/* {!isPending ? renderJobListBodyFoot(item) : renderPendingBodyFoot(item)} */}
                    {/* {!isPending ? renderJobListFooter(item) : renderPendingFooter(item)} */}

                    <View style={jobListTyle.bodyFootContainer}>
                        <Ionicons
                            name="location-sharp"
                            size={24}
                            color={Colors.primary}
                            style={{ marginRight: 10 }}
                        />
                        <Text size={11}>{data.location}</Text>
                    </View>

                    <View style={jobListTyle.cardFooterContainer}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{
                                ...jobListTyle.footerBtn,
                                borderRightWidth: 0.5,
                            }}
                        >
                            <FontAwesome
                                name="bookmark-o"
                                size={24}
                                color={Colors.primary}
                                style={{ marginRight: 15 }}
                            />
                            <Text weight="medium" color={Colors.primary}>
                                SAVE
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={{
                                ...jobListTyle.footerBtn,
                                borderLeftWidth: 0.5,
                            }}
                        >
                            <Text
                                weight="medium"
                                color={
                                    data.isApply ? Colors.black : Colors.primary
                                }
                            >
                                APPLY
                            </Text>
                        </TouchableOpacity>
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

export default JobItem

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
})
