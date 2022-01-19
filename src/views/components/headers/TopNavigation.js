import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text } from '../FiplyComponents'
import Colors from '../../../utils/Colors'

const TopNavigation = ({
        index = 0, 
        navTitles = [], 
        onBtnPress = () => {},
        btnStyles = {},
        style = {}
    }) => {
    return (
        <View style={{ ...styles.container, ...style }}> 

        {
            navTitles.map((item, ind) => {
                return(
                    <TouchableOpacity
                        key={ind} 
                        style={{ ...styles.navBtn, ...btnStyles }} 
                        onPress={() => {
                                onBtnPress(ind)
                            }}>
                        <Text 
                            size={12}
                            color={index == ind ? Colors.primary : Colors.black}
                            weight={index == ind ? 'bold' : 'light'}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                )
            })
        }

    </View>
    )
}

export default TopNavigation

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.light
    },
    navBtn:{
        alignItems: 'center',
        paddingHorizontal: 5,
    },
})
