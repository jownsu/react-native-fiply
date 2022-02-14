import { StyleSheet, View, Modal, FlatList } from 'react-native'
import React, { useState, memo, useMemo } from 'react'
import { Avatar } from 'react-native-paper'
import { Container, Text, TextInput, ActivityIndicator } from '../FiplyComponents'
import { TextInput as TxtInput } from 'react-native-paper'
import { FontAwesome5  } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'
import NoData from '../NoData'


const Comments = ({
        data = [], 
        detail = {},
        visible = false, 
        onRequestClose = () => {},
        onSendPress = () => {},
        isLoading = false
    }) => {

    const [txtComment, setTxtComment] = useState('')

    const renderItem = (item) => {
        return (
            <View style={styles.listContainer}>
                <Avatar.Image 
                    size={40} 
                    source={{ uri: item.avatar }} 
                    backgroundColor={Colors.light}    
                />
                <View style={styles.commentContainer}>
                    <Text weight='medium' numberOfLines={1} adjustsFontSizeToFit>{item.commented_by}</Text>
                    <Text>{item.content}</Text>
                </View>
            </View>
        )
    }

    const ListEmptyComponent = useMemo(() => {
        return (
            <NoData noDataMessage='No Comment'/>
        )
    }, [])

    const ListFooterComponent = useMemo(() => {
        return (
            isLoading 
                ? <ActivityIndicator visible={true}/>
                : null
        )
    }, [isLoading])

  return (
    <Modal
        visible={visible}
        animationType='slide'
        onRequestClose={onRequestClose}
    >
        <Container padding={10}>
            <View style={styles.headerContainer}>
                <FontAwesome5 style={{ marginRight: 5 }} name="caret-up" size={24} color={Colors.secondary} />
                <Text weight='medium' >{detail.upVotes_count}</Text>
            </View>

            <FlatList 
                style={{ flex: 0 }}
                data={data}
                renderItem={({item}) => renderItem(item)}
                ListEmptyComponent={ListEmptyComponent}
                ListFooterComponent={ListFooterComponent}
            />

            <TextInput
                label='Write a comment'
                value={txtComment}
                onChangeText={setTxtComment}
                multiline
                style={{ fontSize: 14, maxHeight: 150 }}
                dense
                right={txtComment 
                    ? <TxtInput.Icon 
                            name='send' 
                            color={Colors.primary}
                            onPress={() => {
                                onSendPress(txtComment)
                                setTxtComment('')
                            }}
                        /> 
                    : null }
                roundness={15}
            />
        </Container>
    </Modal>
  );
};

export default Comments;

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5
    },
    listContainer:{
        flexDirection: 'row',
        marginBottom: 15
    },
    commentContainer:{
        backgroundColor: Colors.lighter,
        borderWidth: 1,
        borderColor: Colors.light,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexGrow: 1,
        flex: 1,
        marginLeft: 10,
        borderRadius: 7
    },
});
