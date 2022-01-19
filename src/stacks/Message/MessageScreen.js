import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text, SafeAreaView, Container } from '../../views/components/FiplyComponents'
import Header from '../../views/components/headers/Header'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'
import Colors from '../../utils/Colors'
import { GiftedChat, Bubble, Send, Avatar, Message } from 'react-native-gifted-chat'
const MessageScreen = ({navigation, route}) => {
    const [messages, setMessages] = useState([]);

    const { data } = route.params

    useEffect(() => {
      setMessages([
        {
            _id: 2,
            text: 'sorry puno na e',
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'Jhones Digno',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        {
          _id: 1,
          text: 'Boss, pa isko',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: data.name,
            avatar: data.image,
          },
        },

      ])
    }, [])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const renderBubble = props => {
        return(
            <Bubble 
                {...props}
                wrapperStyle={{ 
                    right: { backgroundColor: Colors.primary },
                    left: { backgroundColor: Colors.grey }
                }}
                textStyle={{ 
                    right: {
                        color: Colors.white,
                        fontFamily: 'EncodeSansExpaded-Light'
                    },
                    left: {
                        color: Colors.white,
                        fontFamily: 'EncodeSansExpaded-Light'
                    }
                }}
                usernameStyle={{ color: Colors.white }}
            />
        )
    }

    const renderSend = props => {
        return (
            <Send {...props} containerStyle={{ justifyContent: 'center', paddingHorizontal: 15 }} >
                <FontAwesome name="send" size={23} color={Colors.primary} />
            </Send>
        )
    }

    const renderAvatar = props => (
        <Avatar 
            {...props} 
            imageStyle={{ 
                left: { resizeMode: 'contain' } }} 
            containerStyle={{ 
                left: { 
                    borderWidth: 1, 
                    borderColor: Colors.grey,
                    borderRadius: 200, 
                    overflow: 'hidden', 
                    backgroundColor: Colors.white }
                }}/>
    )
    

    const renderScrollBottom = () => {
        return(
            <FontAwesome name="caret-down" size={28} color={Colors.black} />
        )
    }
    return (
        <SafeAreaView>
            <View style={{ backgroundColor: Colors.white, position: 'absolute',top: 0, height: 50, width: '100%'  }}/>
            <Header
                title={data.name}
                centerTitle
                rightIcon={() => <FontAwesome5 name="phone" size={18} color={Colors.black} />}
                onBackPress={() => navigation.pop()}
                style={{ backgroundColor: Colors.white }}
            />
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{_id: 1}}
                renderUsernameOnMessage
                scrollToBottom
                renderBubble={renderBubble}
                renderSend={renderSend}
                scrollToBottomComponent={renderScrollBottom}
                timeTextStyle={{ left:{color: Colors.white} }}
                renderAvatar={renderAvatar}
                listViewProps={{ style: { backgroundColor: '#f2f2f2' } }}
            />
        </SafeAreaView>
    )
}

export default MessageScreen

const styles = StyleSheet.create({})
