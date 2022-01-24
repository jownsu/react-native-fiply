import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Text, TextInput, Dropdown, Button } from './FiplyComponents'
import Colors from '../../utils/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import { Checkbox, RadioButton, Chip } from 'react-native-paper'
import Paragraph from './questionnaire/Paragraph'
import MultipleCheckbox from './questionnaire/MultipleCheckbox'
import MultipleRadioButton from './questionnaire/MultipleRadioButton'

const CreateQuestionnaire = ({onSubmit = () => {}}) => {
    const questionTypeList = [
        {
            id: '1',
            name: 'Paragraph'
        },
        {
            id: '2',
            name: 'Multiple Choice'
        },
        {
            id: '3',
            name: 'Radio Button'
        },
    ]
    
    const [error, setError] = useState({question: false, option: false})
    const [questionType, setQuestionType] = useState('Paragraph')
    const [question, setQuestion] = useState('')
    const [options, setOptions] = useState([])
    const [currentOption, setCurrentOption] = useState('')
    const [questionList, setQuestionList] = useState([])


    const handleAdd = () => {
        if(isError()) return

        setQuestionList([...questionList, { question, questionType, options }])
        resetForm()
    }

    const isError = () => {
        let err = false
        if(question == ''){
            setError({...error, question: true})
            err = true
        } 

        if(options.length <= 0 && questionType != 'Paragraph'){
            setError({...error, option: true})
            err = true
        }

        return err
        
    }

    const handleAddOption = () => {
        if(currentOption == '') return

        setOptions([...options, currentOption])
        setCurrentOption('')
        setError({...error, option: false})
    }

    const handleRemomveOption = (item) => {
        setOptions(options.filter(i => i != item))
    }

    const resetForm = () => {
        setQuestion('')
        setQuestionType('Paragraph')
        setOptions([])
        setError({question: false, option: false})
    }

    const renderRadioButtonOptions = () => {
        return ( 
            <View>
                <View style={styles.selectedOptionsContainer}>
                    {options.map((item, index) => (
                            <Chip 
                                key={index}
                                onClose={() => handleRemomveOption(item)}
                                style={{ margin: 2 }}
                            >
                                {item}
                            </Chip>
                        ))
                    }
                </View>
                <View style={styles.multipleChoiceOptionContainer}>
                    <RadioButton 
                        status='checked'
                    />
                    <TextInput 
                        mode='flat'
                        label='Options' 
                        style={{ height: 50, width: 150}}
                        value={currentOption}
                        error={error.option}
                        errorMsg={error.option ? 'Add atleast one option' : null}
                        onChangeText={setCurrentOption}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>  
                    <TouchableOpacity onPress={() => handleAddOption()}>
                        <Text color={Colors.secondary}>Add Other Option</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderMultipleChoiceOptions = () => {
        return ( 
            <View>
                <View style={styles.selectedOptionsContainer}>
                    {options.map((item, index) => (
                            <Chip 
                                key={index}
                                onClose={() => handleRemomveOption(item)}
                                style={{ margin: 2 }}
                            >
                                {item}
                            </Chip>
                        ))
                    }
                </View>

                <View style={styles.multipleChoiceOptionContainer}>

                    <Checkbox 
                        status='checked'
                    />
                    <TextInput 
                        mode='flat'
                        label='Options' 
                        style={{ height: 50, width: 150}}
                        onChangeText={setCurrentOption}
                        value={currentOption}
                        error={error.option}
                        errorMsg={error.option ? 'Add atleast one option' : null}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>  
                    <TouchableOpacity onPress={() => handleAddOption()}>
                        <Text color={Colors.secondary}>Add Option</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderParagraphOption = () => {
        return (
            <View style={styles.paragraphOptionContainer}>
                <Text>Long answer text</Text>
            </View>
        ) 
    }

    const renderQuestionType = (type) => {

        switch (type) {
            case 'Paragraph':
                return renderParagraphOption()
            case 'Multiple Choice':
                return renderMultipleChoiceOptions()
            case 'Radio Button':
                return renderRadioButtonOptions()
            default:
                break;
        }
    }

    const renderQuestionList = (item, index) => {

        switch (item.questionType) {
            case 'Paragraph':
                return <Paragraph item={item} index={index} disabled />
            case 'Multiple Choice':
                return <MultipleCheckbox item={item} index={index} disabled />
            case 'Radio Button':
                return <MultipleRadioButton item={item} index={index} disabled />
            default:
                return <Paragraph item={item} index={index} disabled />
        }
    }

  return (
            <View style={{ flex: 1 }}>
                <View style={styles.questionContainer}>
                <TextInput 
                    label='Question'
                    roundness={10}
                    style={{ height: 35, fontSize: 14, marginBottom: 5 }}
                    value={question}
                    onChangeText={setQuestion}
                    dense
                    error={error.question}
                    onBlur={() => {
                        if(question == ''){
                            setError({...error, question: true})
                        }else{
                            setError({...error, question: false})
                        }
                    }}
                    errorMsg={error.question ? 'Question is required' : null}
                />
                <Dropdown 
                    data={questionTypeList}
                    value={questionType}
                    onChangeText={text => setQuestionType(text)}
                    noTextInput
                    dropdownIcon
                    textInputStyle={{ height: 30, width: 150, fontSize: 12 }}
                    iconStyle={{ marginTop: 15 }}
                    iconSize={18}
                    style={{ marginBottom: 15 }}
                />
                { renderQuestionType(questionType) }
                <TouchableOpacity activeOpacity={.7} style={styles.addBtn} onPress={() => handleAdd()}>
                    <MaterialIcons name="add-circle-outline" size={28} color={Colors.primary} />
                </TouchableOpacity>
            </View>
                <FlatList
                    data={questionList}
                    keyExtractor={(item, index) => index.toString()}
                    extraData={questionList}
                    renderItem={({item, index}) => (
                            <View>
                                {renderQuestionList(item, index + 1)}
                            </View>
                        )}
                    ListFooterComponent={() => (
                            <Button 
                                title='Submit' 
                                style={{ marginVertical: 10 }} 
                                onPress={() => onSubmit(questionList)} 
                                disabled={questionList.length <= 0 ? true : false}
                            />
                    )}
                />


    </View>
  );
};

export default CreateQuestionnaire;

const styles = StyleSheet.create({
    questionContainer:{
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.light,
        padding: 15,
        borderRadius: 10,
        marginVertical: 10
    },
    addBtn:{
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    multipleChoiceOptionContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    paragraphOptionContainer:{
        padding: 10, 
        borderBottomWidth: 1, 
        borderColor: Colors.light, 
        marginVertical: 10
    },
    selectedOptionsContainer:{
        flexDirection: 'row',
        flexWrap: 'wrap'
    }

});
