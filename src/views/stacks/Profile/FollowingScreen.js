import React, { useContext, useRef, useState } from 'react'
import { StyleSheet, View, FlatList, RefreshControl, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import { SafeAreaView, Text, Container } from '../../components/FiplyComponents'
import Header from '../../components/headers/Header'
import ProfileContext from '../../../api/context/profile/ProfileContext'
import SearchBar from '../../components/headers/SearchBar'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'
import LoadMore from '../../components/lists/LoadMore'
import NoData from '../../components/NoData'
import FollowingAction from '../../components/modals/FollowingAction'

const FollowingScreen = ({ navigation }) => {
    const { userInfo, following, loading, getFollowing, moreFollowing } = useContext(ProfileContext)
    const [showAction, setShowAction] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})

    const scrollToTop = () => {
        flatListRef.current.scrollToOffset({
            animated: true,
            offset: 0,
        })
    }

    const flatListRef = useRef(null)

    const ListEmptyComponent = () => {
        return following.data == 0 ? <NoData /> : null
    }

    const onMorePress = (item) => {
        setShowAction(true)
        setSelectedUser(item)
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <View style={styles.itemBodyContainer}>
                    <Avatar.Image
                        source={{ uri: item.avatar }}
                        size={64}
                        backgroundColor={Colors.light}
                    />

                    <View style={styles.nameContainer}>
                        <Text weight="semi-bold" size={16} numberOfLines={1} adjustsFontSizeToFit>
                            {item.fullname}
                        </Text>
                        <Text size={12}>{item.preview}</Text>
                    </View>
                    <TouchableOpacity onPress={() => onMorePress(item)}>
                        <MaterialIcons name="more-horiz" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView statusBarColor={Colors.white} flex>
            <Header
                title={userInfo.fullname}
                style={{ backgroundColor: Colors.white }}
                onBackPress={() => navigation.pop()}
            />
            <SearchBar
                containerStyle={{ marginVertical: 10 }}
                onSubmit={(text) => getFollowing(userInfo.id, text)}
                onBlurClear={() => getFollowing(userInfo.id)}
            />
            <Container padding={20}>
                <Text weight="semi-bold">{following.meta.total} Following</Text>

                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={() => getFollowing(userInfo.id)}
                        />
                    }
                    ref={flatListRef}
                    style={{ flex: 0 }}
                    data={following.data}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    onEndReached={() => {
                        if (following.data.length < 30 && !loading) {
                            moreFollowing()
                        }
                    }}
                    onEndReachedThreshold={0}
                    ListFooterComponent={
                        <LoadMore
                            onLoadMorePress={() => {
                                moreFollowing(true)
                                scrollToTop()
                            }}
                            isLoading={following.data.length >= 30 && !loading}
                        />
                    }
                    ListEmptyComponent={ListEmptyComponent}
                    // numColumns={2}
                />
            </Container>

            <FollowingAction
                visible={showAction}
                user={selectedUser}
                onDismiss={() => {
                    setShowAction(false)
                    setSelectedUser({})
                }}
            />
        </SafeAreaView>
    )
}

export default FollowingScreen

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
    itemBodyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    nameContainer: {
        paddingHorizontal: 10,
        flex: 1,
    },
})
