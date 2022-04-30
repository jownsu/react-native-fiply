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
    const { getQuestionaire, questionnaire, job } = useContext(JobContext)

    const handleSubmit = () => {
        console.log(questionnaire)
    }

    const renderList = ({ item, index }) => <View>{renderQuestionList(item, index + 1)}</View>

    const renderQuestionList = (item, index) => {
        switch (item.type) {
            case '1':
                return <Paragraph item={item} index={index} />
            case '2':
                return <MultipleCheckbox item={item} index={index} />
            case '3':
                return <MultipleRadioButton item={item} index={index} />
            default:
                return <Paragraph item={item} index={index} />
        }
    }

    useEffect(() => {
        getQuestionaire(job.id)
    }, [])

    return (
        <SafeAreaView>
            <Header title={'Questionnaire'} onBackPress={() => navigation.pop()} />
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
                        disabled={!questionnaire.every((val) => val.answer)}
                    />
                )}
            />
        </SafeAreaView>
    )
}

export default QuestionnaireScreen

const styles = StyleSheet.create({})
