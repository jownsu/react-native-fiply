import React, { useState, useEffect, useRef, useMemo, useContext } from 'react'
import { StyleSheet, TouchableOpacity, View, FlatList } from 'react-native'
import JobContext from '../../../api/context/jobs/JobContext'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'

import {
    SafeAreaView,
    Container,
    Text,
    ActivityIndicator,
} from '../../../views/components/FiplyComponents'
import NoData from '../../components/NoData'
import SearchHeader from '../../../views/components/headers/SearchHeader'
import TitleFilter from '../../../views/components/headers/TitleFilter'
import TopNavigation from '../../../views/components/headers/TopNavigation'
import JobItem from '../../../views/components/lists/JobItem'

const JobsScreen = ({ navigation }, offset) => {
    const {
        jobs,
        getJobs,
        getJob,
        moreJobs,
        getSavedJobs,
        getAppliedJobs,
        toggleSaveJob,
        toggleApplyJob,
        loading,
    } = useContext(JobContext)

    const flatListRef = useRef(null)

    const [dataType, setDataType] = useState('discover')

    useEffect(() => {
        getJobs()
    }, [])

    const scrollToTop = () => {
        flatListRef.current.scrollToOffset({
            animated: true,
            offset: 0,
        })
    }

    const renderItem = ({ item }) => (
        <JobItem
            data={item}
            onCardPress={handleCardPress}
            onSavePress={handleSavePress}
            onApplyPress={handleApplyPress}
            onRemovePress={handleRemovePress}
            showRemove={dataType !== 'discover'}
        />
    )

    const handleSavePress = (id) => toggleSaveJob(id)

    const handleApplyPress = (id) => toggleApplyJob(id)

    const handleRemovePress = (id) => {
        switch (dataType) {
            case 'saved':
                return toggleSaveJob(id, true)
            case 'applied':
                return toggleApplyJob(id, true)
        }
    }

    const handleCardPress = (id) => {
        navigation.getParent().setOptions({
            tabBarStyle: { display: 'none' },
        })
        getJob(id)
        navigation.push('ShowJobScreen')
    }

    const handleTopNavigationPress = (id) => {
        switch (id) {
            case 0:
                getJobs()
                setDataType('discover')
                break
            case 1:
                getSavedJobs()
                setDataType('saved')
                break
            case 2:
                getAppliedJobs()
                setDataType('applied')
                break
        }
        scrollToTop()
    }

    const ListFooterComponent = useMemo(() => {
        return jobs.length >= 30 && !loading ? (
            <TouchableOpacity
                onPress={() => {
                    moreJobs(true)
                    scrollToTop()
                }}
            >
                <Text
                    weight="medium"
                    color={Colors.secondary}
                    center
                    style={{ marginTop: 10, marginBottom: 20 }}
                >
                    Load More
                </Text>
            </TouchableOpacity>
        ) : (
            <ActivityIndicator visible={true} />
        )
    }, [loading])

    const ListEmptyComponent = () => <NoData />

    const onEndReached = () => {
        if (jobs.length < 30 && !loading) {
            moreJobs()
        }
    }

    const onScroll = (e) => {
        const currentOffset = e.nativeEvent.contentOffset.y
        const dif = currentOffset - (offset || 0)

        if (dif < 0) {
            navigation.getParent().setOptions({
                tabBarStyle: {
                    display: 'flex',
                    borderTopWidth: 1,
                    elevation: 0,
                },
            })
        } else {
            navigation.getParent().setOptions({
                tabBarStyle: { display: 'none' },
            })
        }
        // console.log('dif=',dif);
        offset = currentOffset
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
                <TitleFilter title="JOBS" titleColor={Colors.primary} hideLine />

                <TopNavigation
                    navTitles={['Discover', 'Saved', 'Applied', 'Pending']}
                    onBtnPress={handleTopNavigationPress}
                />

                {jobs.length != 0 ? (
                    <FlatList
                        onScroll={(e) => onScroll(e)}
                        style={{ flex: 0 }}
                        ref={flatListRef}
                        data={jobs}
                        renderItem={renderItem}
                        ListFooterComponent={ListFooterComponent}
                        ListEmptyComponent={ListEmptyComponent}
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0}
                    />
                ) : (
                    <ActivityIndicator visible={true} />
                )}
            </Container>
        </SafeAreaView>
    )
}

export default JobsScreen

const styles = StyleSheet.create({
    myInterviewContainer: {
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        flexDirection: 'row',
        marginLeft: 10,
        padding: 10,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.light,
        width: 200,
        elevation: 3,
    },
    interviewDetailsContainer: {
        marginRight: 10,
    },
})
