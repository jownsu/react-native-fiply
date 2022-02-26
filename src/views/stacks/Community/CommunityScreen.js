import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Dimensions, Image } from 'react-native'
import {
    SafeAreaView,
    Text,
    Container,
    FlatList,
    SecondaryButton,
} from '../../components/FiplyComponents'
import SearchHeader from '../../components/headers/SearchHeader'
import Colors from '../../../utils/Colors'
import SampleData from '../../../utils/SampleData'
import { FontAwesome, Entypo, FontAwesome5 } from '@expo/vector-icons'
import TitleFilter from '../../components/headers/TitleFilter'
import TopNavigation from '../../components/headers/TopNavigation'

const { width } = Dimensions.get('screen')
const cardWidth = width / 2 - 20

const CommunityScreen = ({ navigation }) => {
    const [navIndex, setNavIndex] = useState(0)
    const [activeIndex, setActiveIndex] = useState(-1)

    const renderDiscoverList = (item) => {
        return (
            <View style={discoverListStyles.cardContainer}>
                <Image source={item.image} style={discoverListStyles.img} />
                <Text center size={16} weight="medium">
                    {item.name}
                </Text>
                <Text center size={12}>
                    {item.description}
                </Text>
                <SecondaryButton
                    title={'ADD'}
                    style={discoverListStyles.btn}
                    onPress={() => onPressBtn(item)}
                    labelStyle={discoverListStyles.btnLabelStyle}
                />
            </View>
        )
    }

    const renderFellowList = (item, index) => {
        return (
            <View style={fellowListStyles.cardContainer}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => setActiveIndex(-1)}
                    style={activeIndex == index ? { ...fellowListStyles.blackBG } : {}}
                />
                <View style={{ paddingHorizontal: 5, paddingVertical: 20 }}>
                    <View style={fellowListStyles.dotBtnContainer}>
                        <TouchableOpacity onPress={() => setActiveIndex(index)}>
                            <Entypo
                                name="dots-three-vertical"
                                size={21}
                                color={Colors.black}
                                style={fellowListStyles.dotBtn}
                            />
                        </TouchableOpacity>
                        {activeIndex == index ? (
                            <TouchableOpacity
                                style={{ ...fellowListStyles.removeContainer }}
                                activeOpacity={0.8}
                                onPress={() =>
                                    alert(`${item.name} has been removed from your fellow list`)
                                }
                            >
                                <FontAwesome5 name="user-times" size={16} color={Colors.black} />
                                <Text size={10} weight="medium">
                                    Remove as Fellow
                                </Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                    <Image source={item.image} style={fellowListStyles.img} />
                    <Text center size={16} weight="medium">
                        {item.name}
                    </Text>
                    <Text center size={12}>
                        {item.description}
                    </Text>
                    <SecondaryButton
                        title={'VIEW'}
                        style={fellowListStyles.btn}
                        onPress={() => onPressBtn(item)}
                    />
                </View>
            </View>
        )
    }

    const renderForumList = (item) => {
        return (
            <View style={forumListStyle.cardContainer}>
                <Image source={item.image} style={forumListStyle.img} resizeMode="contain" />
                <View style={forumListStyle.cardInfoContainer}>
                    <Text weight="semi-bold">{item.name}</Text>
                    <Text>{item.description}</Text>
                </View>

                <View style={forumListStyle.btnContainer}>
                    <TouchableOpacity style={forumListStyle.btn}>
                        <Text color={Colors.primary} weight="medium" size={14}>
                            JOIN
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderCompanyList = (item) => {
        return (
            <View style={companyListStyle.cardContainer}>
                <Image source={item.image} style={companyListStyle.img} />
                <Text center size={16} weight="medium">
                    {item.name}
                </Text>
                <Text center size={12}>
                    {item.description}
                </Text>
                <SecondaryButton
                    title={'FOLLOW'}
                    style={companyListStyle.btn}
                    onPress={() => onPressBtn(item)}
                />
            </View>
        )
    }

    const renderRequestList = (item) => {
        return (
            <View style={requestListStyle.cardContainer}>
                <Image source={item.image} style={requestListStyle.img} />
                <View style={requestListStyle.cardInfoContainer}>
                    <Text weight="semi-bold">{item.name}</Text>
                    <TouchableOpacity>
                        <Text color={Colors.primary} weight="medium">
                            View Profile
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={requestListStyle.cardSideInfoContainer}>
                    <Text>{item.date}</Text>

                    <View style={requestListStyle.btnContainers}>
                        <TouchableOpacity style={requestListStyle.btn}>
                            <Text color={Colors.primary} weight="medium" size={11}>
                                ACCEPT
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={requestListStyle.btn}>
                            <Text color={Colors.primary} weight="medium" size={11}>
                                REMOVE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    const renderList = (id) => {
        switch (id) {
            case 0:
                return (
                    <FlatList
                        data={SampleData.discoverList}
                        key={0}
                        numColumns={2}
                        renderItem={(item) => renderDiscoverList(item)}
                        styles={{ alignItems: 'center' }}
                    />
                )
            case 1:
                return (
                    <FlatList
                        data={SampleData.fellowList}
                        key={1}
                        numColumns={2}
                        renderItem={(item, index) => renderFellowList(item, index)}
                        styles={{ alignItems: 'center' }}
                    />
                )
            case 2:
                return (
                    <FlatList
                        data={SampleData.forumList}
                        key={2}
                        renderItem={(item) => renderForumList(item)}
                    />
                )
            case 3:
                return (
                    <FlatList
                        data={SampleData.companyList}
                        key={3}
                        renderItem={(item) => renderCompanyList(item)}
                        numColumns={2}
                        styles={{ alignItems: 'center' }}
                    />
                )
            case 4:
                return (
                    <FlatList
                        data={SampleData.requestList}
                        key={4}
                        renderItem={(item) => renderRequestList(item)}
                    />
                )
            default:
                return (
                    <FlatList
                        data={SampleData.discoverList}
                        key={0}
                        numColumns={2}
                        renderItem={(item) => renderDiscoverList(item)}
                        styles={{ alignItems: 'center' }}
                    />
                )
        }
    }

    return (
        <SafeAreaView flex>
            <SearchHeader
                rightIcon={() => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MessageStack')}
                        activeOpacity={0.5}
                    >
                        <FontAwesome name="paper-plane" size={24} color={Colors.secondary} />
                    </TouchableOpacity>
                )}
            />

            <Container style={{ paddingHorizontal: 0 }}>
                <TitleFilter title="COMMUNITY" titleColor={Colors.primary} hideLine />

                <TopNavigation
                    navTitles={['Discover', 'Fellows', 'Forums', 'Companies', 'Requests']}
                    onBtnPress={(i) => setNavIndex(i)}
                />

                {renderList(navIndex)}
            </Container>
        </SafeAreaView>
    )
}

export default CommunityScreen

const styles = StyleSheet.create({})

const discoverListStyles = StyleSheet.create({
    img: {
        height: 100,
        width: 100,
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: Colors.white,
    },
    cardContainer: {
        width: cardWidth,
        borderWidth: 1,
        borderColor: Colors.light,
        margin: 5,
        borderRadius: 15,
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 5,
    },
    btn: {
        borderRadius: 25,
        marginHorizontal: '10%',
        alignSelf: 'stretch',
        marginTop: 15,
    },
    btnLabelStyle: {
        fontFamily: 'EncodeSansExpaded-SemiBold',
    },
})

const fellowListStyles = StyleSheet.create({
    img: {
        height: 100,
        width: 100,
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: Colors.white,
    },
    cardContainer: {
        width: cardWidth,
        borderWidth: 1,
        borderColor: Colors.light,
        margin: 5,
        borderRadius: 15,
        justifyContent: 'space-between',
        overflow: 'hidden',
    },
    btn: {
        borderRadius: 25,
        marginHorizontal: '10%',
        alignSelf: 'stretch',
        marginTop: 15,
    },
    dotBtnContainer: {
        position: 'absolute',
        right: 5,
        top: 10,
    },
    removeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: -35,
        right: 0,
        zIndex: 10,
        width: 135,
        height: 30,
        paddingHorizontal: 7,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 5,
        elevation: 3,
        backgroundColor: Colors.light,
    },
    blackBG: {
        backgroundColor: 'rgba(0, 0, 0, .6)',
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 10,
    },
})

const forumListStyle = StyleSheet.create({
    img: {
        height: 75,
        width: 75,
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: Colors.white,
        marginRight: 10,
    },
    cardContainer: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderColor: Colors.light,
        elevation: 3,
        marginVertical: 2,
    },
    cardInfoContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    btnContainer: {
        marginLeft: 5,
        alignSelf: 'flex-end',
    },
    btn: {
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.primary,
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 3,
    },
})

const companyListStyle = StyleSheet.create({
    img: {
        height: 100,
        width: 100,
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: Colors.white,
    },
    cardContainer: {
        width: cardWidth,
        borderWidth: 1,
        borderColor: Colors.light,
        margin: 5,
        borderRadius: 15,
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 5,
    },
    btn: {
        borderRadius: 25,
        marginHorizontal: '10%',
        alignSelf: 'stretch',
        marginTop: 15,
    },
})

const requestListStyle = StyleSheet.create({
    img: {
        height: 75,
        width: 75,
        borderRadius: 100,
        alignSelf: 'center',
        backgroundColor: Colors.white,
        marginRight: 10,
    },
    cardContainer: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: Colors.light,
        elevation: 3,
        marginBottom: 5,
    },
    cardInfoContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    cardSideInfoContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingVertical: 5,
    },
    btnContainers: {
        flexDirection: 'row',
    },
    btn: {
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.primary,
        alignItems: 'center',
        paddingHorizontal: 7,
        paddingVertical: 3,
        marginHorizontal: 2,
    },
})
