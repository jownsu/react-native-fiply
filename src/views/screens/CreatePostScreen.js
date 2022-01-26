import { StyleSheet, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { Text, SafeAreaView, Container2, Container, InputDropdown, Dropdown } from '../components/FiplyComponents'
import Header from '../components/headers/Header'
import Colors from '../../utils/Colors'
import { FontAwesome5 } from '@expo/vector-icons'

const CreatePostScreen = ({navigation}) => {

  const [showDropdown, setShowDropdown] = useState(false)
  const [postStatus, setPostStatus] = useState('Public')
  const [postText, setPostText] = useState('')
  
  return (
        <SafeAreaView flex statusBarColor={Colors.white}>
          <Header 
            title='Create Post'
            style={{ backgroundColor: Colors.white }}
            rightIcon={() => (
                <TouchableOpacity
                  activeOpacity={.7}
                >
                  <Text weight='medium' color={Colors.secondary}>POST</Text>
                </TouchableOpacity>
              )}
            onBackPress={() => navigation.pop()}
          />
          <Container>
            <View style={styles.container}>
              <View style={styles.headerContainer}>
                <View style={styles.imgContainer}>
                  <Image 
                    source={require('../../assets/img/members/digno.jpg')}
                    style={styles.img}
                  />
                </View>
                <View style={styles.headerDetails}>
                  <Text weight='medium' size={16}>Jhones Digno</Text>
                  <Dropdown 
                    data={[{id: 1, name: 'Public'}, {id: 2, name: 'Friends'}]}
                    value={postStatus}
                    noTextInput
                    onChangeText={text => setPostStatus(text)}
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
        </SafeAreaView>
    );
};

export default CreatePostScreen;

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
    alignItems: 'center'

  },
  headerDetails:{
  },
  imgContainer:{
    height: 75,
    width: 75,
    borderWidth: 1,
    borderRadius: 100,
    overflow: 'hidden',
    marginHorizontal: 10
  },
  img:{
    height: 75,
    width: 75,
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
