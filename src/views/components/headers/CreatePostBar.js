import React, { useContext } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Text, TextInput } from '../FiplyComponents'
import Colors from '../../../utils/Colors'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'

import AuthContext from '../../../api/context/auth/AuthContext'

const CreatePostBar = ({
    onPhotoPress = () => {},
    onVideoPress = () => {},
    onFilePress = () => {},
    onInputPress = () => {},
    style = {},
}) => {
    const { user } = useContext(AuthContext)

    return (
        <View style={{ ...createPostySTyles.createPostContainer, ...style }}>
            <TouchableOpacity
                activeOpacity={0.5}
                style={createPostySTyles.textInputContainer}
                onPress={onInputPress}
            >
                <Text>Create a post</Text>
            </TouchableOpacity>

            <View style={createPostySTyles.postActionContainer}>
                <TouchableOpacity style={createPostySTyles.actionBtn} onPress={onPhotoPress}>
                    <FontAwesome name="picture-o" size={24} color={Colors.secondary} />
                    <Text weight="medium" size={12} style={createPostySTyles.actionText}>
                        Photo
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={createPostySTyles.actionBtn} onPress={onVideoPress}>
                    <FontAwesome name="video-camera" size={24} color={Colors.black} />
                    <Text weight="medium" size={12} style={createPostySTyles.actionText}>
                        Video
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={createPostySTyles.actionBtn} onPress={onFilePress}>
                    <FontAwesome5 name="paperclip" size={24} color={Colors.primary} />
                    <Text weight="medium" size={12} style={createPostySTyles.actionText}>
                        File
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CreatePostBar

const createPostySTyles = StyleSheet.create({
    createPostContainer: {
        backgroundColor: Colors.white,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.light,
    },
    postActionContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    actionBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    actionText: {
        marginLeft: 5,
    },
    textInputContainer: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 100,
        borderColor: Colors.light,
        marginVertical: 10,
    },
})
