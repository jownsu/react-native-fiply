import React, { useState, useEffect, useRef, useMemo, useContext } from 'react'
import { StyleSheet, TouchableOpacity, View, FlatList, RefreshControl } from 'react-native'
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
import LoadMore from '../../../views/components/lists/LoadMore'

const JobsScreen = ({ navigation }, offset) => {
    const {
        jobs,
        savedJobs,
        appliedJobs,
        getJob,
        getJobs,
        moreJobs,
        getSavedJobs,
        moreSavedJobs,
        getAppliedJobs,
        moreAppliedJobs,
        toggleSavedJob,
        toggleAppliedJob,
        removeAppliedJob,
        removeSavedJob,
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

    const handleSavePress = (id) => toggleSavedJob(id)

    const handleApplyPress = (id) => toggleAppliedJob(id)

    const handleRemovePress = (id) => {
        switch (dataType) {
            case 'saved':
                return removeSavedJob(id)
            case 'applied':
                return removeAppliedJob(id)
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
                if (jobs.data.length == 0) {
                    getJobs()
                }
                setDataType('discover')
                break
            case 1:
                if (savedJobs.data.length == 0) {
                    getSavedJobs()
                }
                setDataType('saved')
                break
            case 2:
                if (appliedJobs.data.length == 0) {
                    getAppliedJobs()
                }
                setDataType('applied')
                break
        }
        scrollToTop()
    }

    const ListEmptyComponent = () => (!loading ? <NoData /> : null)

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

    const renderFlatList = () => {
        switch (dataType) {
            case 'discover':
                return (
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={() => getJobs()} />
                        }
                        onScroll={(e) => onScroll(e)}
                        style={{ flex: 0 }}
                        ref={flatListRef}
                        data={jobs.data}
                        renderItem={renderItem}
                        ListFooterComponent={
                            <LoadMore
                                onLoadMorePress={() => {
                                    moreJobs(true)
                                    scrollToTop()
                                }}
                                isLoading={jobs.data.length >= 30 && !loading}
                            />
                        }
                        ListEmptyComponent={ListEmptyComponent}
                        onEndReached={() => {
                            if (jobs.data.length < 30 && !loading) {
                                moreJobs()
                            }
                        }}
                        onEndReachedThreshold={0}
                    />
                )

            case 'saved':
                return (
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={() => getSavedJobs()} />
                        }
                        onScroll={(e) => onScroll(e)}
                        style={{ flex: 0 }}
                        ref={flatListRef}
                        data={savedJobs.data}
                        renderItem={renderItem}
                        ListFooterComponent={
                            <LoadMore
                                onLoadMorePress={() => {
                                    moreSavedJobs(true)
                                    scrollToTop()
                                }}
                                isLoading={savedJobs.data.length >= 30 && !loading}
                            />
                        }
                        ListEmptyComponent={ListEmptyComponent}
                        onEndReached={() => {
                            if (savedJobs.data.length < 30 && !loading) {
                                moreSavedJobs()
                            }
                        }}
                        onEndReachedThreshold={0}
                    />
                )

            case 'applied':
                return (
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={() => getSavedJobs()} />
                        }
                        onScroll={(e) => onScroll(e)}
                        style={{ flex: 0 }}
                        ref={flatListRef}
                        data={appliedJobs.data}
                        renderItem={renderItem}
                        ListFooterComponent={
                            <LoadMore
                                onLoadMorePress={() => {
                                    moreAppliedJobs(true)
                                    scrollToTop()
                                }}
                                isLoading={appliedJobs.data.length >= 30 && !loading}
                            />
                        }
                        ListEmptyComponent={ListEmptyComponent}
                        onEndReached={() => {
                            if (appliedJobs.data.length < 30 && !loading) {
                                moreAppliedJobs()
                            }
                        }}
                        onEndReachedThreshold={0}
                    />
                )

            default:
                return <Text>Wala pa</Text>
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
                <TitleFilter title="JOBS" titleColor={Colors.primary} hideLine />

                <TopNavigation
                    navTitles={['Discover', 'Saved', 'Applied', 'Pending']}
                    onBtnPress={handleTopNavigationPress}
                />

                {renderFlatList(dataType)}
            </Container>
        </SafeAreaView>
    )
}

export default JobsScreen
