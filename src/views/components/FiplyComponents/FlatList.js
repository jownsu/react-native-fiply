import { StyleSheet, View, FlatList as FList, Image } from 'react-native'
import React from 'react'
import {ActivityIndicator} from '../FiplyComponents/ActivityIndicator'
import {Text} from '../FiplyComponents/Text'


export const FlatList = ({
    data, 
    isLoading = false,
    renderItem = () => {},
    numColumns = 1,
    styles = {},
    noDataMessage = 'No Data',
    renderHeader
}) => {
  return (
    <View style={{ flex: 1, ...styles }}	>
        {
            isLoading 
                ? <View 
                    style={{ 
                        position: 'absolute', 
                        top: 0, 
                        bottom: 0, 
                        right: 0, 
                        left: 0, 
                        justifyContent: 'center', 
                        alignItems: 'center' 
                    }}> 
                        <ActivityIndicator/>
                    </View> 
                : null 
        }
        {
            data.length > 0 || isLoading == true 
            ? (
                <FList
                    data={data}
                    keyExtractor={item => item.id}
                    numColumns={numColumns}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => renderItem(item, index)}
                    ListHeaderComponent={renderHeader}
                />
            )
            : (
                <View style={noDataStyles.container}>
                    <Text weight='medium' size={18} center>{noDataMessage}</Text>
                    <View style={noDataStyles.imgContainer}>
                        <Image 
                            source={ require('../../../assets/img/nomessage.png') }
                            style={noDataStyles.img}
                        />
                    </View>
                </View>
            )

        }

    </View>
  );
};


const noDataStyles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    imgContainer:{
        width: 300,
        height: 300
    },
    img:{
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    loadingIcon:{
        
    }
});
