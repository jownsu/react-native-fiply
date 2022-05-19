import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native'
import { Text, SafeAreaView, Container, Dropdown } from '../../../components/FiplyComponents'
import HeaderTitle from '../../../components/headers/HeaderTitle'
import JobContext from '../../../../api/context/EMPLOYER/job/JobContext'
import NoData from '../../../components/NoData'
import Colors from '../../../../utils/Colors'
import LoadMore from '../../../../views/components/lists/LoadMore'
import JobItem from '../../../components/lists/EMPLOYER/JobItem'
import SearchBar from '../../../components/headers/SearchBar'
import TopNavigation from '../../../components/headers/TopNavigation'

const JobScreen = ({ navigation }, offset) => {
    const {
        jobs,
        jobInterviews,
        getJobs,
        moreJobs,
        getJobInterviews,
        moreJobInterviews,
        getJobDetails,
        getApplicants,
        getApplicantInterviews,
        loading,
    } = useContext(JobContext)
    const [dataType, setDataType] = useState('posts')

    const flatListRef = useRef(null)

    const scrollToTop = () => {
        flatListRef.current.scrollToOffset({
            animated: true,
            offset: 0,
        })
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

    const renderJobItem = ({ item }) => <JobItem data={item} onCardPress={handleJobCardPress} />

    const handleJobCardPress = (id) => {
        getJobDetails(id)
        getApplicants(id)
        navigation.push('JobDetailsScreen')
    }

    const renderInterviewItem = ({ item }) => (
        <JobItem data={item} onCardPress={handleInterviewCardPress} />
    )

    const handleInterviewCardPress = (id) => {
        getJobDetails(id)
        getApplicantInterviews(id)
        navigation.push('ApplicantInterviewListScreen')
    }

    const ListEmptyComponent = () => (!loading ? <NoData /> : null)

    const handleTopNavigationPress = (id) => {
        switch (id) {
            case 0:
                if (jobs.data.length == 0) {
                    getJobs()
                }
                setDataType('posts')
                break
            case 1:
                if (jobInterviews.data.length == 0) {
                    getJobInterviews()
                }
                setDataType('interviews')
                break
        }
        scrollToTop()
    }

    const renderFlatList = () => {
        switch (dataType) {
            case 'posts':
                return (
                    <FlatList
                        key={1}
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={() => getJobs()} />
                        }
                        // onScroll={(e) => onScroll(e)}
                        style={{ flex: 0 }}
                        ref={flatListRef}
                        keyExtractor={(item) => item.id}
                        data={jobs.data}
                        renderItem={renderJobItem}
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

            case 'interviews':
                return (
                    <FlatList
                        key={1}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={() => getJobInterviews()}
                            />
                        }
                        // onScroll={(e) => onScroll(e)}
                        style={{ flex: 0 }}
                        ref={flatListRef}
                        keyExtractor={(item) => item.id}
                        data={jobInterviews.data}
                        renderItem={renderInterviewItem}
                        ListFooterComponent={
                            <LoadMore
                                onLoadMorePress={() => {
                                    moreJobInterviews(true)
                                    scrollToTop()
                                }}
                                isLoading={jobInterviews.data.length >= 30 && !loading}
                            />
                        }
                        ListEmptyComponent={ListEmptyComponent}
                        onEndReached={() => {
                            if (jobInterviews.data.length < 30 && !loading) {
                                moreJobInterviews()
                            }
                        }}
                        onEndReachedThreshold={0}
                    />
                )

            default:
                return <Text>Wala pa </Text>
        }
    }

    useEffect(() => {
        getJobs()
    }, [])

    return (
        <SafeAreaView statusBarColor={Colors.white} flex>
            <HeaderTitle
                title={'Job Posts'}
                style={{ backgroundColor: Colors.white, marginBottom: 10 }}
            />

            <TopNavigation
                navTitles={['Posts', 'Interviews']}
                onBtnPress={handleTopNavigationPress}
            />

            {/* <SearchBar style={{ marginVertical: 10 }} /> */}
            <Container>{renderFlatList(dataType)}</Container>
        </SafeAreaView>
    )
}

export default JobScreen

const styles = StyleSheet.create({})
