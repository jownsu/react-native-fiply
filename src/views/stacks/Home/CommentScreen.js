import { StyleSheet, View, Modal, FlatList } from 'react-native'
import React, { useState, memo, useMemo, useContext } from 'react'
import CommentContext from '../../../api/context/comments/CommentContext'
import { Avatar } from 'react-native-paper'
import {
    Container,
    Text,
    TextInput,
    ActivityIndicator,
    SafeAreaView,
} from '../../components/FiplyComponents'
import { TextInput as TxtInput } from 'react-native-paper'
import { FontAwesome5 } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'
import NoData from '../../components/NoData'

const CommentScreen = () => {
    const [txtComment, setTxtComment] = useState('')

    const { comments, loading, details, createComment } = useContext(CommentContext)

    const handleSend = () => {
        createComment(txtComment)
        setTxtComment('')
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
        <SafeAreaView>
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
})
