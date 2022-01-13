import React from 'react'
import { StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native'
import { Text, SecondaryButton } from '../FiplyComponents'
import { Entypo } from '@expo/vector-icons';
import Colors from '../../../utils/Colors'

const NotificationList = ({data}) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                    return (
                        <View style={styles.cardContainer}>
                            <Image 
                                source={item.image}
                                style={styles.img}
                                resizeMode='contain'
                            />
                            <View style={styles.cardInfoContainer}>
                                <Text weight='semi-bold'>{item.name}</Text>
                                <Text>{item.description}</Text>
                            </View>
                                
                            <View style={styles.rightContainer}>
                                <Entypo name="dots-three-horizontal" size={24} color={Colors.black} />
                                <Text size={10} color={Colors.grey}>{item.time}</Text>
                            </View>


                        </View>
                    )
                }}
            
            />
        </View>
    )
}

export default NotificationList

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    img:{
        height: 50,
        width: 50,
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: Colors.white,
        marginRight: 10
    },
    cardContainer:{
        backgroundColor: Colors.white,
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderColor: Colors.light,
        elevation: 3,
        marginVertical: 2,
    },
    cardInfoContainer:{
        justifyContent: 'center',
        flex: 1,
    },
    rightContainer:{
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },

})
