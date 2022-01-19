import React from 'react'
import { StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native'
import { Text } from '../../FiplyComponents'
import Colors from '../../../../utils/Colors'

const MessageList = ({ data = [], onMessagePress= () => {}, noMessageText = 'There are no messages' }) => {
    return (
        <View style={styles.container}>

            {
                data.length > 0 
                ? (
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => {
                        return (
                            <TouchableOpacity activeOpacity={.7} style={styles.cardContainer} onPress={() => onMessagePress(item)}>
                                <View style={[styles.imgContainer, {borderColor: item.isActive ? Colors.primary : Colors.light } ]}>
                                    <Image 
                                        source={item.image}
                                        style={styles.img}
                                        resizeMode='contain'
                                    />
                                </View>
    
                                <View style={styles.cardInfoContainer}>
                                    <Text weight='semi-bold'>{item.name}</Text>
                                    <Text 
                                        size={12} 
                                        color={item.isRead ? Colors.black : Colors.primary} 
                                        weight={item.isRead ? 'light' : 'medium'}
                                    >
                                        {item.lastMessage}
                                    </Text>
                                </View>
    
                                <Text>{item.date}</Text>
                            </TouchableOpacity>
                        )
                        }}
                    />
                ) 
                : (
                    <View style={styles.noMessageContainer}>
                        <Text weight='medium' size={18} center>{noMessageText}</Text>
                        <View style={styles.nmImageContainer}>
                            <Image 
                                source={ require('../../../../assets/img/nomessage.png') }
                                style={styles.nmImage}
                            />
                        </View>
                    </View>
                )}

        </View>
    )
}

export default MessageList

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    imgContainer:{
        height: 50,
        width: 50,
        borderRadius: 100,
        borderWidth: 1,
        marginRight: 10,
        overflow: 'hidden',
        borderColor: Colors.light
    },
    img:{
        height: '100%',
        width: '100%',
        borderRadius: 100,
        backgroundColor: Colors.white,
    },
    cardContainer:{
        backgroundColor: Colors.white,
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderColor: Colors.light,
        elevation: 3,
        marginBottom: 5,

    },
    cardInfoContainer:{
        flex: 1,
    },
    //no message styles
    noMessageContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20
    },
    nmImageContainer:{
        width: 325,
        height: 325
    },
    nmImage:{
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    }
})
