import React, { useContext } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-paper'
import { SafeAreaView, Text, Container, SecondaryButton } from '../../../components/FiplyComponents'
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import JobContext from '../../../../api/context/EMPLOYER/job/JobContext'
import Header from '../../../components/headers/Header'
import Colors from '../../../../utils/Colors'

const ApplicantScreen = ({ navigation }) => {
    const { response } = useContext(JobContext)
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
                    <View>
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
                                <Text>{item.answer}</Text>
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
                <TouchableOpacity style={styles.btn} activeOpacity={0.7}>
                    <Text weight="medium" size={16} color={Colors.red}>
                        Reject
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: Colors.primary }]}
                    activeOpacity={0.7}
                >
                    <Text weight="medium" color={Colors.white} size={16}>
                        Apply
                    </Text>
                </TouchableOpacity>
            </View>
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
