import { StyleSheet, View, Modal } from 'react-native'
import { useState } from 'react'
import { Avatar } from 'react-native-paper'
import { Container, Text, FlatList, TextInput } from '../FiplyComponents'
import { TextInput as TxtInput } from 'react-native-paper'
import { FontAwesome5  } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

import React from 'react'

const Comments = ({
        data = [], 
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

  return (
    <Modal
        visible={visible}
        animationType='slide'
        onRequestClose={onRequestClose}
    >
        <Container>
            <View style={styles.headerContainer}>
                <FontAwesome5 style={{ marginRight: 5 }} name="caret-up" size={24} color={Colors.secondary} />
                <Text weight='medium' >1.7k</Text>
            </View>
            <FlatList 
                data={data}
                renderItem={item => renderItem(item)}
                isLoading={isLoading}
                noDataMessage={'No Comments'}
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
    }
});
