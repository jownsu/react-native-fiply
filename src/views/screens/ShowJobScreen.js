import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import {
    SafeAreaView,
    Container,
    Text,
    ActivityIndicator,
} from '../components/FiplyComponents'
import { Avatar } from 'react-native-paper'
import Header from '../components/headers/Header'
import React, { useState, useEffect } from 'react'
import useJob from '../../api/hooks/useJob'
import Colors from '../../utils/Colors'
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'

const ShowJobScreen = ({ navigation, route }) => {
    const { getSingleJob, jobs, loading } = useJob()
    const { id } = route.params

    useEffect(() => {
        getSingleJob(id)
    }, [])

    return (
        <SafeAreaView flex statusBarColor={Colors.primary}>
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
                onBackPress={() => navigation.pop()}
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
                                {jobs.title}
                            </Text>
                            <Text>Posted {jobs.posted_at}</Text>
                        </View>

                        <View style={styles.employerInfoContainer}>
                            <Avatar.Image
                                source={{ uri: jobs.image }}
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
                                    {jobs.company}
                                </Text>
                                <>
                                    <Text size={12}>Posted By: </Text>
                                    <View style={styles.postedByContainer}>
                                        <Avatar.Image
                                            source={{ uri: jobs.avatar }}
                                            size={25}
                                            backgroundColor={Colors.light}
                                            marginRight={10}
                                        />
                                        <Text>{jobs.fullname}</Text>
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
                                <Text>{jobs.location}</Text>
                            </View>
                            <View style={styles.teaserInfo}>
                                <FontAwesome5
                                    name="clock"
                                    size={18}
                                    color={Colors.secondary}
                                    style={{ marginRight: 7 }}
                                />
                                <Text>{jobs.employment_type}</Text>
                            </View>
                            <View style={styles.teaserInfo}>
                                <FontAwesome
                                    name="tags"
                                    size={18}
                                    color={Colors.secondary}
                                    style={{ marginRight: 7 }}
                                />
                                <Text>{jobs.position_level}</Text>
                            </View>
                        </View>

                        <View style={styles.responsibilitiesContainer}>
                            <Text
                                size={21}
                                weight="medium"
                                style={{ marginBottom: 5 }}
                            >
                                Job Responsibilites
                            </Text>
                            <Text>{jobs.job_responsibilities}</Text>
                        </View>

                        <View style={styles.qualificationsContainer}>
                            <Text
                                size={21}
                                weight="medium"
                                style={{ marginBottom: 5 }}
                            >
                                Qualifications
                            </Text>
                            <Text>{jobs.qualifications}</Text>
                        </View>
                    </Container>
                )}
            </ScrollView>

            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.saveBtn} activeOpacity={0.7}>
                    <FontAwesome
                        name="bookmark-o"
                        size={24}
                        color={Colors.primary}
                        style={{ marginRight: 10 }}
                    />
                    <Text weight="medium" size={16} color={Colors.primary}>
                        Save
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyBtn} activeOpacity={0.7}>
                    <Text weight="medium" size={16} color={Colors.white}>
                        Apply
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
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 2,
    },
})
