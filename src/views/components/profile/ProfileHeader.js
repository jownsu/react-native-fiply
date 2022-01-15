import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Text } from '../FiplyComponents'
import Colors from '../../../utils/Colors'
import { FontAwesome } from '@expo/vector-icons'

const ProfileHeader = ({data}) => {
    return (
        <View style={ styles.container}>
            <View style={styles.imgContainer}>
                <Image
                    source={require('../../../assets/img/members/digno.jpg')}
                    style={styles.img}
                    resizeMode='contain'
                />
            </View>
            <FontAwesome name="edit" size={24} color={Colors.black} style={styles.editIcon} />

            <View style={styles.bodyContainer} >
                <Text weight='semi-bold' size={16} numberOfLines={1} >{data.fullname}</Text>
                <Text size={13} numberOfLines={1}>{data.description}</Text>
                <Text size={11} numberOfLines={1} adjustsFontSizeToFit>{data.address}</Text>
            </View>

            <View style={styles.footerContainer}>
                <Text weight='medium' color={Colors.primary}>{data.status}</Text>
                <Text>{data.showExp.join(' | ')}</Text>
            </View>
        </View>
    )
}

export default ProfileHeader

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.white,
        borderRadius: 20,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: Colors.light
    },
    imgContainer:{
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Colors.grey,
        elevation: 3,
        borderRadius: 100,
        position: 'absolute',
        top: -50
    },
    img:{
        height: 100,
        width: 100
    },
    editIcon:{
        position: 'absolute',
        top: 10,
        right: 10
    },
    bodyContainer:{
        marginTop: 50,
        marginBottom: 15,
        alignItems: 'center'
    },
    footerContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: Colors.light,
        paddingTop: 10
    }

})
