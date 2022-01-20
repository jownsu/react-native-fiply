import React from 'react';
import { View, FlatList } from 'react-native'
import MultipleCheckbox from './questionnaire/MultipleCheckbox'
import MultipleRadioButton from './questionnaire/MultipleRadioButton'
import Paragraph from './questionnaire/Paragraph';

const Questionnaire = ({data}) => {

    const renderQuestion = (item, index) => {
        switch (item.questionType) {
            case 'paragraph':
                return <Paragraph item={item} index={index} /> 
            case 'radiobutton':
                return <MultipleRadioButton item={item} index={index} />
            case 'checkbox':
                return <MultipleCheckbox item={item} index={index} />
            default:
                return <Paragraph item={item} index={index} /> 
        }
    }


  return (
    <View>
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
                return(
                    <View>
                        { renderQuestion(item, index + 1) }
                    </View>
                )
            }}
        />
    </View>
  );
};

export default Questionnaire;
