import React, { useState } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions, TouchableOpacity } from 'react-native'
import { Text, SecondaryButton } from '../FiplyComponents'
import Colors from '../../../utils/Colors'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'

const { width } = Dimensions.get('screen');
const cardWidth = (width / 2 ) - 20;

const FellowList = ({
        data, 
        onPressBtn,
    }) => {

        const [activeIndex, setActiveIndex] = useState(-1)

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({item, index}) => {
                    return(
                        <View style={styles.cardContainer}>
                            <TouchableOpacity activeOpacity={1} onPress={() => setActiveIndex(-1) } style={ activeIndex == index ? {...styles.blackBG} : {} } />
                            <View style={{ paddingHorizontal: 5, paddingVertical: 20 }}>
                                <View style={styles.dotBtnContainer}>
                                    <TouchableOpacity onPress={() => setActiveIndex(index)}>
                                        <Entypo name="dots-three-vertical" size={21} color={Colors.black} style={styles.dotBtn}/>
                                    </TouchableOpacity>
                                    {
                                        activeIndex == index 
                                            ?
                                                <TouchableOpacity style={{ ...styles.removeContainer }} activeOpacity={0.8} onPress={() => alert(`${item.name} has been removed from your fellow list`)}>
                                                    <FontAwesome5 name="user-times" size={16} color={Colors.black} />
                                                    <Text size={10} weight='medium' >Remove as Fellow</Text>
                                                </TouchableOpacity>
                                            : null
                                    }
                                </View>
                                <Image 
                                    source={item.image}
                                    style={styles.img}
                                />
                                <Text center size={16} weight='medium'>{item.name}</Text>
                                <Text center size={12}>{item.description}</Text>
                                <SecondaryButton
                                    title={'VIEW'}
                                    style={styles.btn}
                                    onPress={() => onPressBtn(item)}
                                />
                            </View>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default FellowList

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        flex: 1
    },
    img:{
        height: 100,
        width: 100,
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: Colors.white
    },
    cardContainer:{
        width: cardWidth,
        borderWidth: 1,
        borderColor: Colors.light,
        margin: 5,
        borderRadius: 15,
        justifyContent: 'space-between',
        overflow: 'hidden'
    },
    btn:{
        borderRadius: 25,
        marginHorizontal: '10%',
        alignSelf: 'stretch',
        marginTop: 15,
    },
    dotBtnContainer:{
        position: 'absolute',
        right: 5,
        top: 10
    },
    removeContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: -35,
        right: 0,
        zIndex: 10,
        width: 135,
        height: 30,
        paddingHorizontal: 7,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: Colors.light
    },
    blackBG:{
        backgroundColor: 'rgba(0, 0, 0, .6)',
        position: 'absolute',
        height: '100%',
        width:  '100%',
        zIndex: 10
    },

    dotBtn:{

    }
})
