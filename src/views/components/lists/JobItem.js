import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from '../FiplyComponents'
import React, { memo } from 'react'
import { Avatar } from 'react-native-paper'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

const JobItem = memo(
    ({
        data,
        onCardPress = () => {},
        onSavePress = () => {},
        onApplyPress = () => {},
        onRemovePress = () => {},
        showRemove = false,
    }) => {
        return (
            <TouchableOpacity
                style={jobListTyle.cardContainer}
                activeOpacity={0.9}
                onPress={() => onCardPress(data.id)}
            >
                {/* <View style={jobListTyle.cardHeaderContainer}>
                    <Text weight="semi-bold" color={Colors.primary} style={jobListTyle.txtTitle}>
                        {data.title}
                    </Text>
                    <Text style={{ marginHorizontal: 10 }}>{'\u25CF'}</Text>
                    <Text size={11}>{data.employment_type}</Text>
                </View> */}

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
                        </View>
                    </View>
                    {/* {!isPending ? renderJobListBodyFoot(item) : renderPendingBodyFoot(item)} */}
                    {/* {!isPending ? renderJobListFooter(item) : renderPendingFooter(item)} */}

                    <View style={jobListTyle.bodyFootContainer}>
                        <Ionicons
                            name="location-sharp"
                            size={24}
                            color={Colors.primary}
                            style={{ marginRight: 5 }}
                        />
                        <Text size={12}>{data.location}</Text>
                        <Text size={12} style={{ marginLeft: 'auto' }}>
                            {data.posted_at}
                        </Text>
                    </View>

                    {/* <View style={jobListTyle.cardFooterContainer}>
                        {showRemove ? (
                            <>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={{
                                        ...jobListTyle.footerBtn,
                                        borderRightWidth: 0.5,
                                    }}
                                    onPress={() => onRemovePress(data.id)}
                                >
                                    <FontAwesome
                                        name="trash-o"
                                        size={24}
                                        color={Colors.red}
                                        style={{ marginRight: 15 }}
                                    />
                                    <Text weight="medium" color={Colors.red}>
                                        REMOVE
                                    </Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={{
                                        ...jobListTyle.footerBtn,
                                        borderRightWidth: 0.5,
                                    }}
                                    onPress={() => onSavePress(data.id)}
                                >
                                    <FontAwesome
                                        name="bookmark-o"
                                        size={24}
                                        color={data.is_saved ? Colors.black : Colors.primary}
                                        style={{ marginRight: 15 }}
                                    />
                                    <Text
                                        weight="medium"
                                        color={data.is_saved ? Colors.black : Colors.primary}
                                    >
                                        {data.is_saved ? 'SAVED' : 'SAVE'}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={{
                                        ...jobListTyle.footerBtn,
                                        borderLeftWidth: 0.5,
                                    }}
                                    onPress={() => onApplyPress(data.id)}
                                >
                                    <Text
                                        weight="medium"
                                        color={data.is_applied ? Colors.black : Colors.primary}
                                    >
                                        {data.is_applied ? 'APPLIED' : 'APPLY'}
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View> */}
                </View>
            </TouchableOpacity>
        )
    },
    (prevProps, nextProps) => {
        if (prevProps.data.is_saved != nextProps.data.is_saved) return false
        if (prevProps.data.is_applied != nextProps.data.is_applied) return false
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
