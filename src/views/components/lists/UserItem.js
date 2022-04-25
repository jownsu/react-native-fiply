import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import { Text, SecondaryButton } from '../FiplyComponents'
import React, { memo } from 'react'
import { Avatar } from 'react-native-paper'
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

const { width } = Dimensions.get('screen')
const cardWidth = width / 2 - 20

const UserItem = memo(
    ({ data, onFollowPress = () => {}, onViewPress = () => {}, showView = false }) => {
        return (
            <View style={discoverListStyles.cardContainer}>
                <Image source={{ uri: data.avatar }} style={discoverListStyles.img} />
                <Text center size={16} weight="medium" numberOfLines={1} adjustsFontSizeToFit>
                    {data.name}
                </Text>
                <Text center size={12} numberOfLines={2} adjustsFontSizeToFit>
                    {data.preview}
                </Text>
                {showView ? (
                    <SecondaryButton
                        title={'VIEW'}
                        style={discoverListStyles.btn}
                        onPress={() => onViewPress(data.id)}
                        labelStyle={discoverListStyles.btnLabelStyle}
                    />
                ) : (
                    <SecondaryButton
                        title={'FOLLOW'}
                        style={discoverListStyles.btn}
                        onPress={() => onFollowPress(data.id)}
                        labelStyle={discoverListStyles.btnLabelStyle}
                    />
                )}
            </View>
        )
    },
    (prevProps, nextProps) => {
        if (prevProps.data.id == nextProps.data.id) return true
        return false
    }
)

export default UserItem

const discoverListStyles = StyleSheet.create({
    img: {
        height: 100,
        width: 100,
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: Colors.white,
    },
    cardContainer: {
        width: cardWidth,
        borderWidth: 1,
        borderColor: Colors.light,
        margin: 5,
        borderRadius: 15,
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 5,
    },
    btn: {
        borderRadius: 25,
        marginHorizontal: '10%',
        alignSelf: 'stretch',
        marginTop: 15,
    },
    btnLabelStyle: {
        fontFamily: 'EncodeSansExpaded-SemiBold',
    },
})
