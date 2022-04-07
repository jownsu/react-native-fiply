import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from './views/components/FiplyComponents'
import React from 'react'

import { Tabs, TabScreen, useTabIndex, useTabNavigation } from 'react-native-paper-tabs'

const TestScreen1 = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tabs style={{ backgroundColor: '#fff', color: 'red' }} uppercase={false}>
                <TabScreen label="Following">
                    <View style={{ flex: 1 }}>
                        <Text>Explore</Text>
                    </View>
                </TabScreen>
                <TabScreen label="Followers">
                    <View style={{ flex: 1 }}>
                        <Text>Flights</Text>
                    </View>
                </TabScreen>
            </Tabs>
        </SafeAreaView>
    )
}

export default TestScreen1

const styles = StyleSheet.create({})
