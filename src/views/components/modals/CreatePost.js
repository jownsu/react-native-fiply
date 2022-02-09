import { StyleSheet, View, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { Text, Container, Dropdown } from '../FiplyComponents'
import Header from '../headers/Header'
import Colors from '../../../utils/Colors'
import { FontAwesome5 } from '@expo/vector-icons'
import { Avatar } from 'react-native-paper'
import { AuthContext } from '../../../providers/AuthProvider'

const CreatePost = ({
        visible, 
        onRequestClose = () => {},
        onPostPress = () => {},
        onEditPress = () => {},
        edit = false,
        data = ''
    }) => {

  const [postStatus, setPostStatus] = useState('Public')
  const [postText, setPostText] = useState('')
  const { user } = useContext(AuthContext)

  useEffect(() => {
    setPostText(data.content)
  }, [data])

  return (
        <Modal
            visible={visible}
            animationType='slide'
            onRequestClose={onRequestClose}
        >
          <Header 
            title={ data && edit ? 'Edit Post' : 'Create Post'}
            style={{ backgroundColor: Colors.white }}
            rightIcon={() => {
              return data && edit
                ? 
                  <TouchableOpacity
                    activeOpacity={.7}
                    onPress={() => onEditPress(postText)}
                    disabled={!postText}
                  >
                    <Text weight='medium' color={postText ? Colors.secondary : Colors.black}>EDIT</Text>
                  </TouchableOpacity>
                :  
                  <TouchableOpacity
                    activeOpacity={.7}
                    onPress={() => onPostPress(postText)}
                    disabled={!postText}
                  >
                    <Text weight='medium' color={postText ? Colors.secondary : Colors.black}>POST</Text>
                  </TouchableOpacity>
              }}
            onBackPress={onRequestClose}
          />
          <Container>
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                  <Avatar.Image 
                    source={{ uri: user.avatar }}
                    size={75}
                    backgroundColor={Colors.light}
                    style={styles.img}
                  />
                <View style={styles.headerDetails}>
                  <Text weight='medium' size={16} adjustsFontSizeToFit numberOfLines={1}>{user.fullname}</Text>
                  <Dropdown 
                    data={[{id: 1, name: 'Public'}, {id: 2, name: 'Friends'}]}
                    value={postStatus}
                    noTextInput
                    onSubmit={(text) => setPostStatus(text)}
                    dropdownIcon
                    style={{ height: 25, width: 100, }}
                    textInputStyle={{ height: 25, width: 100, fontSize: 11 }}
                    iconStyle={{ marginTop: 15 }}
                    iconSize={26}
                  />
                </View>
              </View>
              <View style={styles.txtInputContainer}>
                    <TextInput
                      style={styles.txtInputStyle}
                      value={postText}
                      onChangeText={text => setPostText(text)}
                      multiline
                      textAlignVertical='top'
                      placeholder='What do you want to discuss?'
                    />
              </View>
              <View style={styles.footerContainer}>
                <TouchableOpacity>
                  <FontAwesome5 name="image" size={24} color={Colors.secondary} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FontAwesome5 name="video" size={24} color={Colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FontAwesome5 name="hashtag" size={24} color={Colors.black} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FontAwesome5 name="link" size={24} color={Colors.secondary} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <FontAwesome5 name="paperclip" size={24} color={Colors.grey} />
                </TouchableOpacity>
              </View>
            </View>
          </Container>
        </Modal>
    );
};

export default CreatePost;

const styles = StyleSheet.create({
  container:{
    backgroundColor: Colors.white,
    flex: 1,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: Colors.light,
    borderRadius: 15
  },
  headerContainer:{
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
    paddingHorizontal: 10
  },
  headerDetails:{
      flex: 1,
  },
  img:{
    borderWidth: 1,
    overflow: 'hidden',
    marginRight: 10
  },
  txtInputContainer:{
    flex: 1,
    padding: 15

  },
  txtInputStyle:{
    fontFamily: 'EncodeSansExpaded-Light',
    flex: 1,
  },
  footerContainer:{
    borderTopWidth: 1,
    borderColor: Colors.light,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  }
});
