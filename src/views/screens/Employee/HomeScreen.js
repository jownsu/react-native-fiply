import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { SafeAreaView, Container, Text, TextInput } from '../../components/FiplyComponents'
import SearchHeader from '../../components/headers/SearchHeader'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'
import PostList from '../../components/lists/PostList'

const HomeScreen = () => {
    return (
        <SafeAreaView>

            <SearchHeader
                leftIcon={ () => (<FontAwesome5 name="th-large" size={24} color={Colors.grey} />)}
                rightIcon={ () => <FontAwesome name="paper-plane" size={24} color={Colors.secondary} />}
            /> 
            <Container style={{ paddingHorizontal: 10 }}>
                <View style={styles.createPostContainer}>
                    <TextInput 
                        label={'Create a Post'}
                        style={styles.txtInputStyle}
                        multiline
                        roundness={25}
                    />

                    <View style={styles.postActionContainer}>
                        <TouchableOpacity style={styles.actionBtn}>
                            <FontAwesome name="briefcase" size={24} color={Colors.secondary} />
                            <Text weight='medium' style={styles.actionText}>HIRE NOW</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionBtn}>
                            <FontAwesome5 name="calendar-week" size={24} color={Colors.primary} />
                            <Text weight='medium' style={styles.actionText}>SET EVENT</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionBtn}>
                            <FontAwesome5 name="poll" size={24} color={Colors.grey} />
                            <Text weight='medium' style={styles.actionText}>POLL</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <PostList />

            </Container>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    createPostContainer:{
        backgroundColor: Colors.white,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        elevation: 3,
        borderRadius: 15
    },
    postActionContainer:{
        flexDirection: 'row',
        justifyContent: 'center'
    },
    actionBtn:{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    actionText:{
        fontSize: 12,
        marginTop: 5
    },
    txtInputStyle:{
        marginBottom: 20,
        maxHeight: 200
    }
})
