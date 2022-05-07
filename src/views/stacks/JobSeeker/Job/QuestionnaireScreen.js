import { StyleSheet, View, FlatList } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Colors from '../../../../utils/Colors'
import {
    Text,
    Container,
    TextInput,
    Dropdown,
    SafeAreaView,
    Button,
} from '../../../components/FiplyComponents'
import JobContext from '../../../../api/context/jobs/JobContext'
import { MaterialIcons } from '@expo/vector-icons'
import { Checkbox, RadioButton, Chip } from 'react-native-paper'
import Header from '../../../components/headers/Header'
import Paragraph from '../../../components/questionnaire/Paragraph'
import MultipleCheckbox from '../../../components/questionnaire/MultipleCheckbox'
import MultipleRadioButton from '../../../components/questionnaire/MultipleRadioButton'
import { NavigationContainer } from '@react-navigation/native'

const QuestionnaireScreen = ({ navigation }) => {
    const { getQuestionaire, questionnaire, job, jobResponses, setJobResponses, toggleAppliedJob } =
        useContext(JobContext)

    const handleSubmit = () => {
        //console.log(jobResponses)
        navigation.pop()
        //toggleAppliedJob(id, 'apply', jobResponses)
    }

    const renderList = ({ item, index }) => <View>{renderQuestionList(item, index + 1)}</View>

    const handleChange = (val, itemId) =>
        setJobResponses(
            jobResponses.map((res) => {
                if (itemId == res.question_id) {
                    return { ...res, answer: val }
                }
                return res
            })
        )

    const renderQuestionList = (item, index) => {
        switch (item.type) {
            case '1':
                return (
                    <Paragraph
                        item={item}
                        index={index}
                        onChangeText={(val) => handleChange(val, item.id)}
                    />
                )
            case '2':
                return (
                    <MultipleCheckbox
                        item={item}
                        index={index}
                        onChangeText={(val) => handleChange(val, item.id)}
                    />
                )
            case '3':
                return (
                    <MultipleRadioButton
                        item={item}
                        index={index}
                        onChangeText={(val) => handleChange(val, item.id)}
                    />
                )
            default:
                return (
                    <Paragraph
                        item={item}
                        index={index}
                        onChangeText={(val) => handleChange(val, item.id)}
                    />
                )
        }
    }

    useEffect(() => {
        getQuestionaire(job.id)
    }, [])

    return (
        <SafeAreaView>
            <Header title={'Questionnaire'} onBackPress={() => navigation.pop()} />
            <Container padding={10}>
                <FlatList
                    data={questionnaire}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={questionnaire}
                    renderItem={renderList}
                    ListFooterComponent={() => (
                        <Button
                            title="Submit"
                            style={{ marginVertical: 10 }}
                            onPress={handleSubmit}
                            disabled={
                                !jobResponses.every(
                                    (val) =>
                                        (val.answer && !Array.isArray(val.answer)) ||
                                        val.answer.length > 0
                                )
                            }
                        />
                    )}
                />
            </Container>
        </SafeAreaView>
    )
}

export default QuestionnaireScreen

const styles = StyleSheet.create({})
