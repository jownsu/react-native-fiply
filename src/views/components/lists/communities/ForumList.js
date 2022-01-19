import React from 'react'
import { StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native'
import { Text, SecondaryButton } from '../../FiplyComponents'
import Colors from '../../../../utils/Colors'

const ForumList = ({data}) => {
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
                                
                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={styles.btn} >
                                    <Text color={Colors.primary} weight='medium' size={14}>JOIN</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    )
                }}
            
            />
        </View>
    )
}

export default ForumList

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    img:{
        height: 75,
        width: 75,
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: Colors.white,
        marginRight: 10
    },
    cardContainer:{
        backgroundColor: Colors.white,
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderColor: Colors.light,
        elevation: 3,
        marginVertical: 2,
    },
    cardInfoContainer:{
        justifyContent: 'center',
        flex: 1,
    },
    btnContainer:{
        marginLeft: 5,
        alignSelf: 'flex-end',
    },
    btn:{
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.primary,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 3,
    },
})
