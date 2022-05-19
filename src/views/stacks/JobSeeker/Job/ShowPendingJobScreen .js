import { StyleSheet, View, ScrollView, TouchableOpacity, BackHandler } from 'react-native'
import { SafeAreaView, Container, Text, SecondaryButton } from '../../../components/FiplyComponents'
import { Avatar } from 'react-native-paper'
import Header from '../../../components/headers/Header'
import React, { useContext, useEffect } from 'react'
import JobContext from '../../../../api/context/jobs/JobContext'
import Colors from '../../../../utils/Colors'
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { ProgressBar } from 'react-native-paper'

const ShowPendingJobScreen = ({ navigation }) => {
    const { job, loading, toggleSavedJob, toggleAppliedJob, jobResponses, setJobResponses } =
        useContext(JobContext)

    const handleBackPress = () => {
        setJobResponses([])
        showBottomNav()
        navigation.pop()
    }

    const showBottomNav = () => {
        navigation.getParent().setOptions({
            tabBarStyle: {
                display: 'flex',
                borderTopWidth: 1,
                elevation: 0,
            },
        })
    }

    const handleSavePress = () => {
        let action = job.is_saved ? 'unSave' : 'save'
        toggleSavedJob(job.id, action)
    }

    const handleApplyPress = () => {
        let action = job.is_applied ? 'unApply' : 'apply'
        toggleAppliedJob(job.id, action, jobResponses)
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', showBottomNav)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', showBottomNav)
        }
    }, [])

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

            <ScrollView>
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
                            <View style={{ flexDirection: 'row' }}>
                                <Text size={14} color={Colors.primary} weight="medium">
                                    Interviewer:{'  '}
                                </Text>
                                <View style={styles.postedByContainer}>
                                    <Avatar.Image
                                        source={{ uri: job.hiring_manager_avatar }}
                                        size={25}
                                        backgroundColor={Colors.light}
                                        marginRight={10}
                                    />
                                    <Text>{job.hiring_manager}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text weight="medium" color={Colors.primary}>
                                    Date:{' '}
                                </Text>
                                <Text>{job.meet_date}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text weight="medium" color={Colors.primary}>
                                    Time:{' '}
                                </Text>
                                <Text>{job.meet_time}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.teaserInfoContainer}>
                        <View style={styles.teaserInfo}>
                            <Ionicons
                                name="location-sharp"
                                size={18}
                                color={Colors.primary}
                                style={{ marginRight: 7 }}
                            />
                            <Text>{job.location}</Text>
                        </View>
                        <View style={styles.teaserInfo}>
                            <FontAwesome5
                                name="clock"
                                size={18}
                                color={Colors.primary}
                                style={{ marginRight: 7 }}
                            />
                            <Text>{job.employment_type}</Text>
                        </View>
                        <View style={styles.teaserInfo}>
                            <FontAwesome
                                name="tags"
                                size={18}
                                color={Colors.primary}
                                style={{ marginRight: 7 }}
                            />
                            <Text>{job.position_level}</Text>
                        </View>
                    </View>
                    {job.remarks && (
                        <View style={styles.responsibilitiesContainer}>
                            <Text weight="medium" size={21}>
                                Remarks
                            </Text>
                            <Text>{job.remarks}</Text>
                        </View>
                    )}
                    {job.job_responsibilities && (
                        <View style={styles.responsibilitiesContainer}>
                            <Text size={21} weight="medium" style={{ marginBottom: 5 }}>
                                Job Responsibilites
                            </Text>
                            <Text>{job.job_responsibilities}</Text>
                        </View>
                    )}

                    {job.qualifications && (
                        <View style={styles.qualificationsContainer}>
                            <Text size={21} weight="medium" style={{ marginBottom: 5 }}>
                                Qualifications
                            </Text>
                            <Text>{job.qualifications}</Text>
                        </View>
                    )}

                    {job.questionnaire && !job.is_applied && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <SecondaryButton
                                onPress={() => navigation.push('QuestionnaireScreen')}
                                title="Answer Questionnaire"
                                labelStyle={{ marginHorizontal: 0 }}
                                style={{
                                    borderRadius: 15,
                                    marginBottom: 10,
                                    marginHorizontal: 20,
                                    paddingHorizontal: 10,
                                }}
                            />
                            <FontAwesome5
                                name="check-circle"
                                size={24}
                                color={
                                    jobResponses.length == 0 ||
                                    !jobResponses.every(
                                        (val) =>
                                            (val.answer && !Array.isArray(val.answer)) ||
                                            val.answer.length > 0
                                    )
                                        ? Colors.grey
                                        : Colors.secondary
                                }
                            />
                        </View>
                    )}
                </Container>
            </ScrollView>

            {/* <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.saveBtn} activeOpacity={0.7}>
                    <Text weight="medium" size={16} color={Colors.red}>
                        Call Off
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.applyBtn,
                        {
                            backgroundColor: Colors.primary,
                        },
                    ]}
                    activeOpacity={0.7}
                >
                    <Text weight="medium" size={16} color={Colors.white}>
                        Proceed
                    </Text>
                </TouchableOpacity>
            </View> */}
        </SafeAreaView>
    )
}

export default ShowPendingJobScreen

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
