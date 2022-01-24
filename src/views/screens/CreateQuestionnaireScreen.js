import { StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView, Text, Container } from '../components/FiplyComponents'
import Header from '../components/headers/Header'
import Colors from '../../utils/Colors'
import CreateQuestionnaire from '../components/CreateQuestionnaire'

const CreateQuestionnaireScreen = ({ navigation }) => {
  return (
    <SafeAreaView flex>
        <View style={{ backgroundColor: Colors.white, position: 'absolute',top: 0, height: 50, width: '100%'  }}/>
        <Header
            title='Create a questionnaire'
            style={{ backgroundColor: Colors.white }}
            onBackPress={() => navigation.pop()}
        />
        <Container>
            <CreateQuestionnaire 
                onSubmit={questions => console.log(questions)}
            />
        </Container>
    </SafeAreaView>
    );
};

export default CreateQuestionnaireScreen;

const styles = StyleSheet.create({});
