import { StyleSheet, View, FlatList as FList, Image } from 'react-native'
import React from 'react'
import {ActivityIndicator} from '../FiplyComponents/ActivityIndicator'
import {Text} from '../FiplyComponents/Text'
import Colors from '../../../utils/Colors'


export const FlatList = ({
    data, 
    isLoading = false,
    renderItem = () => {},
    numColumns = 1,
    styles = {},
    noDataMessage = 'No Data',
    renderHeader,
    nestedScrollEnabled = false,
    onEndReached = () => {},
    onEndReachedThreshold = .5,
    extraData,
    ListFooterComponent,
    flatlistref = null,
    maxToRenderPerBatch=10,
    initialNumToRender=10,
    windowSize=10,
}) => {
  return (
    <View style={{ flex: 1, ...styles }}	>
 
        {
            data.length > 0 || isLoading == true 
            ? (
                <FList
                    ref={flatlistref}
                    data={data}
                    keyExtractor={(item) => item.id}
                    numColumns={numColumns}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => renderItem(item, index)}
                    ListHeaderComponent={renderHeader}
                    ListFooterComponent={
                        <View>
                            {
                            isLoading 
                            ? <View>
                                    <ActivityIndicator/>
                                </View> 
                            : null 
                            }
                            {ListFooterComponent}
                        </View>
                    }
                    nestedScrollEnabled={nestedScrollEnabled}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={onEndReachedThreshold}
                    initialNumToRender={initialNumToRender}
                    windowSize={windowSize}
                    removeClippedSubviews={true}
                    extraData
                    maxToRenderPerBatch={maxToRenderPerBatch}
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
