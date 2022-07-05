import { StyleSheet, View, Image, TextInput, TouchableOpacity, BackHandler } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import PostContext from '../../api/context/posts/PostContext'
import AuthContext from '../../api/context/auth/AuthContext'
import { Text, SafeAreaView, Container, Dropdown } from '../components/FiplyComponents'
import usePickImage from '../../utils/usePIckImage'
import { Avatar, ProgressBar } from 'react-native-paper'
import Header from '../components/headers/Header'
import Colors from '../../utils/Colors'
import { FontAwesome5 } from '@expo/vector-icons'

const CreatePostScreen = ({ navigation, route }) => {
    const { edit, data } = route.params

    const [isPublic, setIsPublic] = useState(true)
    const [postText, setPostText] = useState('')
    const { loading, createPost, updatePost } = useContext(PostContext)
    const { user } = useContext(AuthContext)
    const { pickImage, pickUri } = usePickImage()

    const handleBackPress = () => {
        showBottomNav()
        navigation.pop()
    }
    const showBottomNav = () => {
        navigation.getParent().setOptions({
            tabBarStyle: {
                display: 'flex',
                borderTopWidth: 1,
                elevation: 0,
            },
        })
    }

    function isEmpty(obj) {
        return Object.keys(obj).length === 0
    }

    const handlePostPress = () => {
        createPost({ content: postText, image: pickUri, is_public: isPublic }, () => {
            showBottomNav()
            navigation.pop()
        })
    }

    const handleEditPress = () => {
        updatePost(data.id, { content: postText, image: pickUri, is_public: isPublic }, () => {
            navigation.pop()
        })
    }

    useEffect(() => {
        setPostText(data.content)
        if (edit) {
            setIsPublic(data.is_public)
        }
        BackHandler.addEventListener('hardwareBackPress', showBottomNav)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', showBottomNav)
        }
    }, [])

    return (
        <SafeAreaView flex statusBarColor={Colors.white}>
            <Header
                title={edit ? 'Update Post' : 'Create Post'}
                style={{ backgroundColor: Colors.white }}
                rightIcon={() => {
                    {
                        return isEmpty(data) && !edit ? (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={handlePostPress}
                                disabled={!postText && !pickUri}
                            >
                                <Text
                                    weight="medium"
                                    color={postText || pickUri ? Colors.secondary : Colors.black}
                                >
                                    POST
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={handleEditPress}
                                disabled={!postText && !pickUri}
                            >
                                <Text
                                    weight="medium"
                                    color={postText || pickUri ? Colors.secondary : Colors.black}
                                >
                                    EDIT
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                }}
                onBackPress={handleBackPress}
            />
            <ProgressBar indeterminate color={Colors.secondary} visible={loading} />

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
                            <Text weight="medium" size={16} adjustsFontSizeToFit numberOfLines={1}>
                                {user.name}
                            </Text>
                            <Dropdown
                                data={[
                                    { id: 1, name: 'Public' },
                                    { id: 2, name: 'Only Followers' },
                                ]}
                                value={isPublic ? 'Public' : 'Only Followers'}
                                onSubmit={(text) => {
                                    if (text == 'Public') {
                                        setIsPublic(true)
                                    } else {
                                        setIsPublic(false)
                                    }
                                }}
                                noTextInput
                                dropdownIcon
                                iconSize={28}
                                iconStyle={{ marginTop: 15 }}
                                style={{ height: 25 }}
                                textInputStyle={{
                                    height: 25,
                                    fontSize: 11,
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.txtInputContainer}>
                        <TextInput
                            style={styles.txtInputStyle}
                            value={postText}
                            onChangeText={(text) => setPostText(text)}
                            multiline
                            textAlignVertical="top"
                            placeholder="What do you want to discuss?"
                        />
                    </View>

                    {pickUri ? (
                        <View style={styles.uploadImgContainer}>
                            {/* <ProgressBar indeterminate color={Colors.primary} visible={isUploading} /> */}
                            <Image source={{ uri: pickUri }} style={styles.uploadImg} />
                        </View>
                    ) : null}

                    {data.image && !pickUri ? (
                        <View style={styles.uploadImgContainer}>
                            {/* <ProgressBar indeterminate color={Colors.primary} visible={isUploading} /> */}
                            <Image source={{ uri: data.image }} style={styles.uploadImg} />
                        </View>
                    ) : null}

                    <View style={styles.footerContainer}>
                        <TouchableOpacity onPress={() => pickImage([16, 9])}>
                            <FontAwesome5 name="image" size={24} color={Colors.secondary} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity>
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
                        </TouchableOpacity> */}
                    </View>
                </View>
            </Container>
        </SafeAreaView>
    )
}

export default CreatePostScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flex: 1,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: Colors.light,
        borderRadius: 15,
    },
    headerContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    headerDetails: {},
    img: {
        borderWidth: 1,
        overflow: 'hidden',
        marginRight: 10,
    },
    txtInputContainer: {
        flex: 1,
        padding: 15,
    },
    txtInputStyle: {
        fontFamily: 'EncodeSansExpaded-Light',
        flex: 1,
    },
    footerContainer: {
        borderTopWidth: 1,
        borderColor: Colors.light,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    uploadImgContainer: {
        flex: 1,
    },
    uploadImg: {
        height: '100%',
        width: '100%',
    },
})
