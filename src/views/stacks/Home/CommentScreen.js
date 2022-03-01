import { StyleSheet, View, Modal, FlatList } from 'react-native'
import React, { useState, memo, useMemo, useContext } from 'react'
import CommentContext from '../../../api/context/comments/CommentContext'
import AuthContext from '../../../api/context/auth/AuthContext'
import { Avatar } from 'react-native-paper'
import {
    Container,
    Text,
    TextInput,
    ActivityIndicator,
    SafeAreaView,
} from '../../components/FiplyComponents'
import Confirmation from '../../components/dialog/Confirmation'
import { TextInput as TxtInput } from 'react-native-paper'
import { FontAwesome5, AntDesign } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'
import NoData from '../../components/NoData'

const CommentScreen = () => {
    const [txtComment, setTxtComment] = useState('')
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [selectedComment, setSelectedComment] = useState(0)

    const { comments, loading, details, createComment, deleteComment } = useContext(CommentContext)
    const { user } = useContext(AuthContext)

    const handleSend = () => {
        createComment(txtComment)
        setTxtComment('')
    }

    const handleDelete = () => {
        deleteComment(selectedComment)
        setShowConfirmation(false)
    }

    const renderItem = (item) => {
        return (
            <View style={styles.listContainer}>
                <Avatar.Image
                    size={40}
                    source={{ uri: item.avatar }}
                    backgroundColor={Colors.light}
                />
                <View style={styles.commentContainer}>
                    <Text weight="medium" numberOfLines={1} adjustsFontSizeToFit>
                        {item.commented_by}
                    </Text>
                    <Text>{item.content}</Text>
                    {user.id == item.user_id && (
                        <AntDesign
                            name="close"
                            size={18}
                            color={Colors.red}
                            style={styles.closeBtn}
                            onPress={() => {
                                setSelectedComment(item.id)
                                setShowConfirmation(true)
                            }}
                        />
                    )}
                </View>
            </View>
        )
    }

    const ListEmptyComponent = useMemo(() => {
        return <NoData noDataMessage="No Comment" />
    }, [])

    const ListFooterComponent = useMemo(() => {
        return loading ? <ActivityIndicator visible={true} /> : null
    }, [loading])

    return (
        <SafeAreaView flex>
            <Container padding={10}>
                <View style={styles.headerContainer}>
                    <FontAwesome5
                        style={{ marginRight: 5 }}
                        name="caret-up"
                        size={24}
                        color={Colors.secondary}
                    />
                    <Text weight="medium">{details.upVotes_count}</Text>
                </View>

                <FlatList
                    style={{ flex: 0 }}
                    data={comments}
                    renderItem={({ item }) => renderItem(item)}
                    ListEmptyComponent={ListEmptyComponent}
                    ListFooterComponent={ListFooterComponent}
                />

                <TextInput
                    label="Write a comment"
                    value={txtComment}
                    onChangeText={setTxtComment}
                    multiline
                    style={{ fontSize: 14, maxHeight: 150 }}
                    dense
                    right={
                        txtComment ? (
                            <TxtInput.Icon
                                name="send"
                                color={Colors.primary}
                                onPress={handleSend}
                            />
                        ) : null
                    }
                    roundness={15}
                />
            </Container>

            <Confirmation
                visible={showConfirmation}
                dialogText="Are you sure to delete this comment? It cannot be undone."
                onDismiss={() => setShowConfirmation(false)}
                onOkPress={handleDelete}
            />
        </SafeAreaView>
    )
}

export default CommentScreen

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    listContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    commentContainer: {
        backgroundColor: Colors.lighter,
        borderWidth: 1,
        borderColor: Colors.light,
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexGrow: 1,
        flex: 1,
        marginLeft: 10,
        borderRadius: 7,
    },
    closeBtn: { position: 'absolute', right: 0, padding: 10 },
})
