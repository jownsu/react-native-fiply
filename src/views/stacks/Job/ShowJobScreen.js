import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView, Container, Text, ActivityIndicator } from '../../components/FiplyComponents'
import { Avatar } from 'react-native-paper'
import Header from '../../components/headers/Header'
import React, { useContext } from 'react'
import JobContext from '../../../api/context/jobs/JobContext'
import Colors from '../../../utils/Colors'
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'

const ShowJobScreen = ({ navigation }) => {
    const { job, loading } = useContext(JobContext)

    const handleBackPress = () => {
        navigation.getParent().setOptions({ tabBarStyle: { display: 'flex' } })
        navigation.pop()
    }

    return (
        <SafeAreaView flex statusBarColor={Colors.primaredry} style={{}}>
            <Header
                title="Job Details"
                centerTitle
                style={{
                    backgroundColor: Colors.primary,
                    borderBottomWidth: 5,
                    borderColor: Colors.secondary,
                }}
                textColor={Colors.white}
                iconColor={Colors.white}
                onBackPress={handleBackPress}
            />

            <ScrollView>
                {loading ? (
                    <ActivityIndicator visible={true} />
                ) : (
                    <Container padding={10}>
                        <View style={styles.jobTitleContainer}>
                            <Text
                                weight="semi-bold"
                                size={22}
                                adjustsFontSizeToFit
                                numberOfLines={1}
                            >
                                {job.title}
                            </Text>
                            <Text>Posted {job.posted_at}</Text>
                        </View>

                        <View style={styles.employerInfoContainer}>
                            <Avatar.Image
                                source={{ uri: job.image }}
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
                                    {job.company}
                                </Text>
                                <>
                                    <Text size={12}>Posted By: </Text>
                                    <View style={styles.postedByContainer}>
                                        <Avatar.Image
                                            source={{ uri: job.avatar }}
                                            size={25}
                                            backgroundColor={Colors.light}
                                            marginRight={10}
                                        />
                                        <Text>{job.fullname}</Text>
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
                    </Container>
                )}
            </ScrollView>

            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.saveBtn} activeOpacity={0.7}>
                    <FontAwesome
                        name="bookmark-o"
                        size={24}
                        color={job.is_saved ? Colors.black : Colors.primary}
                        style={{ marginRight: 10 }}
                    />
                    <Text
                        weight="medium"
                        size={16}
                        color={job.is_saved ? Colors.black : Colors.primary}
                    >
                        {job.is_saved ? 'Saved' : 'Save'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.applyBtn,
                        {
                            backgroundColor: job.is_applied ? Colors.black : Colors.primary,
                        },
                    ]}
                    activeOpacity={0.7}
                >
                    <Text weight="medium" size={16} color={Colors.white}>
                        {job.is_applied ? 'Applied' : 'Apply'}
                    </Text>
                </TouchableOpacity>
            </View>
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
