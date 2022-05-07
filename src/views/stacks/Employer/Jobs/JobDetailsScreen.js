import { StyleSheet, View, RefreshControl, FlatList, BackHandler } from 'react-native'
import { SafeAreaView, Container, Text } from '../../../components/FiplyComponents'
import { Avatar } from 'react-native-paper'
import Header from '../../../components/headers/Header'
import React, { useContext, useRef, useEffect } from 'react'
import JobContext from '../../../../api/context/EMPLOYER/job/JobContext'
import Colors from '../../../../utils/Colors'
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { ProgressBar } from 'react-native-paper'
import LoadMore from '../../../../views/components/lists/LoadMore'
import ApplicantItem from '../../../components/lists/EMPLOYER/ApplicantItem'

const ShowJobScreen = ({ navigation }) => {
    const { job, loading, getApplicants, getApplicantResponse, moreApplicants, applicants } =
        useContext(JobContext)

    const handleBackPress = () => {
        navigation.getParent().setOptions({
            tabBarStyle: {
                display: 'flex',
                borderTopWidth: 1,
                elevation: 0,
            },
        })
        navigation.pop()
    }

    const flatListRef = useRef(null)

    const scrollToTop = () => {
        flatListRef.current.scrollToOffset({
            animated: true,
            offset: 0,
        })
    }

    const renderItem = ({ item }) => <ApplicantItem data={item} onCardPress={handleCardPress} />

    const handleCardPress = (id) => {
        // console.log(job.id)
        // console.log(id)
        getApplicantResponse(job.id, id)
        navigation.push('ApplicantScreen')
    }

    const renderHeader = () => (
        <Container padding={10}>
            <View style={styles.jobTitleContainer}>
                <Text weight="semi-bold" size={22} adjustsFontSizeToFit numberOfLines={1}>
                    {job.title}
                </Text>
                <Text>Posted {job.posted_at}</Text>
            </View>

            <View style={styles.employerInfoContainer}>
                <Avatar.Image
                    source={{ uri: job.company_avatar }}
                    size={75}
                    backgroundColor={Colors.light}
                    style={styles.companyImgContainer}
                />
                <View style={styles.employerInfo}>
                    <Text
                        weight="medium"
                        size={16}
                        style={{ marginBottom: 10 }}
                        adjustsFontSizeToFit
                        numberOfLines={1}
                    >
                        {job.company_name}
                    </Text>
                    <>
                        <Text size={12}>Posted By: </Text>
                        <View style={styles.postedByContainer}>
                            <Avatar.Image
                                source={{ uri: job.hiring_manager_avatar }}
                                size={25}
                                backgroundColor={Colors.light}
                                marginRight={10}
                            />
                            <Text>{job.hiring_manager}</Text>
                        </View>
                    </>
                </View>
            </View>

            <View style={styles.teaserInfoContainer}>
                <View style={styles.teaserInfo}>
                    <Ionicons
                        name="location-sharp"
                        size={18}
                        color={Colors.secondary}
                        style={{ marginRight: 7 }}
                    />
                    <Text>{job.location}</Text>
                </View>
                <View style={styles.teaserInfo}>
                    <FontAwesome5
                        name="clock"
                        size={18}
                        color={Colors.secondary}
                        style={{ marginRight: 7 }}
                    />
                    <Text>{job.employment_type}</Text>
                </View>
                <View style={styles.teaserInfo}>
                    <FontAwesome
                        name="tags"
                        size={18}
                        color={Colors.secondary}
                        style={{ marginRight: 7 }}
                    />
                    <Text>{job.position_level}</Text>
                </View>
            </View>

            <View style={styles.responsibilitiesContainer}>
                <Text size={21} weight="medium" style={{ marginBottom: 5 }}>
                    Job Responsibilites
                </Text>
                <Text>{job.job_responsibilities}</Text>
            </View>

            <View style={styles.qualificationsContainer}>
                <Text size={21} weight="medium" style={{ marginBottom: 5 }}>
                    Qualifications
                </Text>
                <Text>{job.qualifications}</Text>
            </View>

            {applicants.data.length > 0 && (
                <Text weight="medium" size={18} style={{ marginBottom: 10 }}>
                    Applicant List
                </Text>
            )}
        </Container>
    )

    const ListEmptyComponent = () => <Text>No Applicant</Text>

    return (
        <SafeAreaView flex statusBarColor={Colors.white}>
            <Header
                title="Job Details"
                centerTitle
                style={{
                    backgroundColor: Colors.white,
                }}
                textColor={Colors.black}
                iconColor={Colors.black}
                onBackPress={handleBackPress}
            />

            <ProgressBar indeterminate color={Colors.secondary} visible={loading} />

            <FlatList
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={() => getApplicants()} />
                }
                style={{ flex: 0 }}
                ref={flatListRef}
                keyExtractor={(item) => item.id}
                data={applicants.data}
                renderItem={renderItem}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={
                    <LoadMore
                        onLoadMorePress={() => {
                            moreApplicants(true)
                            scrollToTop()
                        }}
                        isLoading={applicants.data.length >= 30 && !loading}
                    />
                }
                onEndReached={() => {
                    if (applicants.data.length < 30 && !loading) {
                        moreApplicants()
                    }
                }}
                onEndReachedThreshold={0}
            />
        </SafeAreaView>
    )
}

export default ShowJobScreen

const styles = StyleSheet.create({
    jobTitleContainer: {
        marginVertical: 10,
    },
    employerInfoContainer: {
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: Colors.black,
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.white,
        elevation: 3,
        alignItems: 'center',
    },
    companyImgContainer: {
        marginRight: 10,
        overflow: 'hidden',
        borderColor: Colors.light,
        borderWidth: 1,
    },
    employerInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    postedByContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    teaserInfoContainer: {
        marginVertical: 10,
    },
    teaserInfo: {
        flexDirection: 'row',
        marginVertical: 2,
        alignItems: 'center',
    },
    responsibilitiesContainer: { marginBottom: 10 },
    qualificationsContainer: { marginBottom: 10 },
    footerContainer: {
        borderTopWidth: 1,
        borderColor: Colors.light,
        flexDirection: 'row',
        height: 50,
        backgroundColor: Colors.white,
    },
    saveBtn: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    applyBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
    },
})
