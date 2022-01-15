import React from 'react'
import { StyleSheet, View, FlatList, Image, TouchableOpacity } from 'react-native'
import { Text } from '../FiplyComponents'
import { MaterialCommunityIcons, FontAwesome5, FontAwesome } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

const PostList = ({data, optionOnPress = () => {}}) => {

    return (
        <View style={styles.container}>
            <FlatList
                data={data} 
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <View style={styles.postContainer}>
                        <View style={styles.postHeaderContainer}>
                            <View style={styles.postAuthorContainer} >
                                <Image 
                                    source={require('../../../assets/img/logo.png')} 
                                    style={styles.authorImg}    
                                    resizeMode='contain'
                                />
                                <Text weight="medium" >{item.author}{'\u30FB'}{item.posted_at}</Text>
                            </View>

                            <TouchableOpacity onPress={() => optionOnPress()}>
                                <MaterialCommunityIcons name="dots-horizontal" size={24} color={Colors.black} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.postBodyContainer}>
                            <Text>{item.post}</Text>
                            <Image 
                                source={require('../../../assets/img/postimg.png')}
                                style={styles.postImg}
                            />
                        </View>

                        <View style={styles.postFooterContainer}>
                            <TouchableOpacity style={styles.postAction}>
                                <FontAwesome5 style={{ marginRight: 5 }} name="caret-up" size={17} color={Colors.black} />
                                <Text>Up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.postAction}>
                                <FontAwesome style={{ marginRight: 5 }} name="commenting" size={17} color={Colors.primary} />
                                <Text>Comment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.postAction}>
                                <FontAwesome style={{ marginRight: 5 }} name="share" size={17} color={Colors.secondary} />
                                <Text>Share</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.postAction}>
                                <FontAwesome style={{ marginRight: 5 }} name="paper-plane" size={17} color={Colors.secondary} />
                                <Text>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default PostList

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    postContainer:{
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.light,
        borderRadius: 15,
        padding: 10,
        elevation: 2,
        marginVertical: 5
    },
    postHeaderContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    postAuthorContainer:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    authorImg:{
        height: 35,
        width: 35,
        marginRight: 10
    },
    postBodyContainer:{

    },
    postImg:{
        width: '100%',
        marginVertical: 7
    },
    postFooterContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    postAction:{
        flexDirection: 'row',
        paddingHorizontal: 7,
    }


})
