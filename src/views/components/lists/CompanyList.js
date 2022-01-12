import React from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'
import { Text, SecondaryButton } from '../FiplyComponents'
import Colors from '../../../utils/Colors'

const { width } = Dimensions.get('screen');
const cardWidth = (width / 2 ) - 20;

const CompanyList = ({
        data, 
        onPressBtn
    }) => {
    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    return(
                        <View style={styles.cardContainer}>
                            <Image 
                                source={item.image}
                                style={styles.img}
                            />
                            <Text center size={16} weight='medium'>{item.name}</Text>
                            <Text center size={12}>{item.description}</Text>
                            <SecondaryButton
                                title={'FOLLOW'}
                                style={styles.btn}
                                onPress={() => onPressBtn(item)}
                            />
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default CompanyList

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
        paddingVertical: 20,
        paddingHorizontal: 5
    },
    btn:{
        borderRadius: 25,
        marginHorizontal: '10%',
        alignSelf: 'stretch',
        marginTop: 15,
    }
})
