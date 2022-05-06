import React, { useContext, useEffect, useRef } from 'react'
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native'
import { Text, SafeAreaView, Container, Dropdown } from '../../../components/FiplyComponents'
import HeaderTitle from '../../../components/headers/HeaderTitle'
import JobContext from '../../../../api/context/EMPLOYER/job/JobContext'
import NoData from '../../../components/NoData'
import Colors from '../../../../utils/Colors'
import LoadMore from '../../../../views/components/lists/LoadMore'
import JobItem from '../../../components/lists/EMPLOYER/JobItem'
import SearchBar from '../../../components/headers/SearchBar'

const JobScreen = ({ navigation }, offset) => {
    const { jobs, getJobs, getJobDetails, getApplicants, moreJobs, loading } =
        useContext(JobContext)

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

    const renderItem = ({ item }) => <JobItem data={item} onCardPress={handleCardPress} />

    const handleCardPress = (id) => {
        navigation.getParent().setOptions({
            tabBarStyle: { display: 'none' },
        })
        getJobDetails(id)
        getApplicants(id)
        navigation.push('JobDetailsScreen')
    }

    const ListEmptyComponent = () => (!loading ? <NoData /> : null)

    useEffect(() => {
        getJobs()
    }, [])

    return (
        <SafeAreaView statusBarColor={Colors.white} flex>
            <HeaderTitle title={'Job Posts'} style={{ backgroundColor: Colors.white }} />

            <SearchBar style={{ marginVertical: 10 }} />
            <Container>
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={loading} onRefresh={() => getJobs()} />
                    }
                    onScroll={(e) => onScroll(e)}
                    style={{ flex: 0 }}
                    ref={flatListRef}
                    keyExtractor={(item) => item.id}
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
            </Container>
        </SafeAreaView>
    )
}

export default JobScreen

const styles = StyleSheet.create({})
