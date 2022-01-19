import React from 'react'
import { StyleSheet, View, Image, FlatList, TouchableOpacity } from 'react-native'
import { Text } from '../../FiplyComponents'
import Colors from '../../../../utils/Colors'

const RequestList = ({data}) => {
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
                            />
                            <View style={styles.cardInfoContainer}>
                                <Text weight='semi-bold'>{item.name}</Text>
                                <TouchableOpacity>
                                    <Text color={Colors.primary} weight='medium'>
                                        View Profile
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.cardSideInfoContainer}>
                                <Text>{item.date}</Text>
                                
                                <View style={styles.btnContainers}>
                                    <TouchableOpacity style={styles.btn} >
                                        <Text color={Colors.primary} weight='medium' size={11}>ACCEPT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btn} >
                                        <Text color={Colors.primary} weight='medium' size={11}>REMOVE</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>
                    )
                }}
            
            />
        </View>
    )
}

export default RequestList

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
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: Colors.light,
        elevation: 3,
        marginBottom: 5 
    },
    cardInfoContainer:{
        justifyContent: 'center',
        flex: 1
    },
    cardSideInfoContainer:{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingVertical: 5
    },
    btnContainers:{
        flexDirection: 'row',
    },
    btn:{
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.primary,
        alignItems: 'center',
        paddingHorizontal: 7,
        paddingVertical: 3,
        marginHorizontal: 2
    },
})
