import React from 'react'
import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native'
import { Text } from '../../FiplyComponents'
import Colors from '../../../../utils/Colors'
import { Ionicons, FontAwesome, FontAwesome5  } from '@expo/vector-icons';

const InterviewList = ({
        data, 
        onProceedPress = () => {},
        onCancelPress = () => {}
    }) => {
    return (
        <View style={styles.container}>
        
            <FlatList
                data={data}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                    return(
                        <View style={styles.cardContainer}>
                            <View style={styles.cardHeaderContainer}>
                                <Text weight='semi-bold' color={Colors.primary} style={styles.txtTitle}>{item.title}</Text>
                                <Text style={{ marginHorizontal: 10 }}>{'\u25CF'}</Text>
                                <Text size={11}>{ item.type }</Text>
                            </View>

                            <View style={styles.cardBodyContainer}>
                                <View style={styles.bodyHeadContainer}>
                                    <View style={styles.imgContainer}>
                                        <Image 
                                            source={item.image}
                                            style={styles.img}
                                            resizeMode='contain'
                                        />
                                    </View>

                                    <Text weight='medium' style={styles.txtCompany}>{item.company}</Text>
                                </View>
                                <View style={styles.bodyFootContainer}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name="location-sharp" size={24} color={Colors.primary} style={{ marginRight: 5 }}/>
                                        <Text size={11} >{item.location}</Text>
                                    </View>
                                    <View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text size={12} weight='semi-bold' color={Colors.primary}>Employer: </Text>
                                            <Text size={12}>{item.employer}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text size={12} weight='semi-bold' color={Colors.primary}>When: </Text>
                                            <Text size={12}>{item.when}</Text>
                                        </View>
                                    </View>

                                </View>

                            </View>

                            <View style={styles.cardFooterContainer}>
                                <TouchableOpacity activeOpacity={.7} style={styles.btnSave} onPress={() => onProceedPress(item.questions)}>
                                    <Text weight='medium' color={ Colors.primary}>
                                        PROCEED
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={.7} style={styles.btnApply} onPress={onCancelPress}>
                                    <Text weight='medium' color={ Colors.black}>
                                        CALL OFF
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )
                }}
            />
        </View>
    )
}

export default InterviewList

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    img:{
        height: 75,
        width: 75,
        borderRadius: 100,
        backgroundColor: Colors.white,
        borderWidth: 1 
    },
    imgContainer:{
        borderRadius: 50,
        overflow: 'hidden',
        marginRight: 15
    },
    cardContainer:{
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 15,
        backgroundColor: Colors.white,
        marginBottom: 10,
        elevation: 5
    },
    cardHeaderContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtTitle:{
        textTransform: 'uppercase'
    },
    bodyHeadContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    txtCompany:{
        textTransform: 'uppercase'
    },
    bodyFootContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    cardFooterContainer:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: Colors.grey
    },
    btnSave:{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: .5,
        borderColor: Colors.grey
    },
    btnApply:{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: .5,
    }
})
