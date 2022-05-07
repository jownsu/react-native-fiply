import React, { useContext, useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import { SafeAreaView, Text, Container, SecondaryButton } from '../../../components/FiplyComponents'
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import JobContext from '../../../../api/context/EMPLOYER/job/JobContext'
import Header from '../../../components/headers/Header'
import Colors from '../../../../utils/Colors'
import Approval from '../../../components/modals/Approval'
import Confirmation from '../../../components/dialog/Confirmation'

const ApplicantScreen = ({ navigation }) => {
    const { response, approveApplicant, job, rejectApplicant } = useContext(JobContext)
    const [showModal, setShowModal] = useState(false)
    const [showConfirmation, setShowConfirmation] = useState(false)

    const handleApprovePress = () => {
        setShowModal(true)
    }
    const handleRejectPress = () => {}

    return (
        <SafeAreaView flex statusBarColor={Colors.white}>
            <Header
                title="Application Details"
                onBackPress={() => navigation.pop()}
                style={{ backgroundColor: Colors.white, marginBottom: 10 }}
            />
            <Container padding={20}>
                <View style={styles.headerContainer}>
                    <Avatar.Image
                        size={75}
                        source={{ uri: response.avatar }}
                        style={{ marginRight: 10 }}
                    />
                    <View style={{ flex: 1 }}>
                        <Text weight="medium" size={16}>
                            {response.name}
                        </Text>
                        <Text>{response.location}</Text>
                    </View>
                </View>
                {response.experiences.length > 0 && (
                    <View style={{ marginBottom: 10 }}>
                        <Text weight="medium" size={14}>
                            Work Experience
                        </Text>
                        {response.experiences.map((item) => (
                            <View key={item.id} style={styles.experienceItemContainer}>
                                <Text>{item.job_title}</Text>
                                <Text>{item.company}</Text>
                                <Text>
                                    {parseInt(item.starting_date)} -{' '}
                                    {parseInt(item.completion_date)}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {response.educational_backgrounds.length > 0 && (
                    <View style={{ marginBottom: 10 }}>
                        <Text weight="medium" size={14}>
                            Education
                        </Text>
                        {response.educational_backgrounds.map((item) => (
                            <View key={item.id} style={styles.experienceItemContainer}>
                                <Text>{item.degree}</Text>
                                <Text>{item.university}</Text>
                                <Text>
                                    {parseInt(item.starting_date)} -{' '}
                                    {parseInt(item.completion_date)}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}

                {response.job_responses.length > 0 && (
                    <View style={{ marginBottom: 10 }}>
                        <Text weight="medium" size={16}>
                            Questionnaire Responses
                        </Text>
                        {response.job_responses.map((item) => (
                            <View key={item.id} style={styles.experienceItemContainer}>
                                <Text weight="medium">{item.question}</Text>
                                {Array.isArray(item.answer) ? (
                                    <Text>{item.answer.join(', ')} </Text>
                                ) : (
                                    <Text>{item.answer}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                )}

                {response.resume && (
                    <SecondaryButton
                        onPress={() => navigation.push('ResumeScreen')}
                        style={{ borderRadius: 20, marginBottom: 10 }}
                        title={'View Resume'}
                    />
                )}
            </Container>

            <View style={styles.footerContainer}>
                <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.7}
                    onPress={() => setShowConfirmation(true)}
                >
                    <Text weight="medium" size={16} color={Colors.red}>
                        Reject
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: Colors.primary }]}
                    activeOpacity={0.7}
                    onPress={handleApprovePress}
                >
                    <Text weight="medium" color={Colors.white} size={16}>
                        Approve
                    </Text>
                </TouchableOpacity>
            </View>

            <Approval
                visible={showModal}
                onDismiss={() => setShowModal(false)}
                onSubmitPress={(data) => {
                    approveApplicant(job.id, response.id, data, navigation.pop(2))
                }}
            />
            <Confirmation
                visible={showConfirmation}
                dialogText={`Reject ${response.name}?`}
                onDismiss={() => setShowConfirmation(false)}
                onOkPress={() => rejectApplicant(job.id, response.id, navigation.pop(2))}
            />
        </SafeAreaView>
    )
}

export default ApplicantScreen

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    experienceItemContainer: {
        marginTop: 5,
    },
    footerContainer: {
        borderTopWidth: 1,
        borderColor: Colors.light,
        flexDirection: 'row',
        height: 50,
        backgroundColor: Colors.white,
    },
    btn: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
