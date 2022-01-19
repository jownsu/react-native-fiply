import React from 'react'
import { StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native'
import { Text } from '../../FiplyComponents'
import Colors from '../../../../utils/Colors'
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'

const MessageList = ({data}) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return (
                        <View style={styles.cardContainer}>
                            <View style={[styles.imgContainer, {borderColor: item.isActive ? Colors.primary : Colors.light } ]}>
                                <Image 
                                    source={item.image}
                                    style={styles.img}
                                    resizeMode='contain'
                                />
                            </View>

                            <View style={styles.cardInfoContainer}>
                                <Text weight='semi-bold'>{item.name}</Text>
                                <TouchableOpacity>
                                    <Text 
                                        size={12} 
                                        color={item.isRead ? Colors.black : Colors.primary} 
                                        weight={item.isRead ? 'light' : 'medium'}
                                    >
                                        {item.lastMessage}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Text>{item.date}</Text>
                        </View>
                    )
                }}
            
            />
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
})
