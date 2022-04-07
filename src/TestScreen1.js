import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { SafeAreaView } from './views/components/FiplyComponents'
import React from 'react'
import Colors from './utils/Colors'

import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
const FirstRoute = () => <View style={{ flex: 1, backgroundColor: 'red' }} />

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />

const renderScene = SceneMap({
    following: FirstRoute,
    follower: SecondRoute,
})
const TestScreen1 = () => {
    const layout = useWindowDimensions()

    const [index, setIndex] = React.useState(0)
    const [routes] = React.useState([
        { key: 'following', title: 'Following' },
        { key: 'follower', title: 'Followers' },
    ])
    const renderTabBar = (props) => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: Colors.primary }}
            style={{ backgroundColor: Colors.white }}
            labelStyle={{ color: Colors.black, fontFamily: 'EncodeSansExpaded-Medium' }}
            inactiveColor={'black'}
            activeColor={Colors.primary}
        />
    )
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TabView
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </SafeAreaView>
    )
}

export default TestScreen1

const styles = StyleSheet.create({})
