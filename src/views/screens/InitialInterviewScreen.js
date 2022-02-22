import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { SafeAreaView, Container, Text } from '../components/FiplyComponents'
import Header from '../components/headers/Header'
import Questionnaire from '../components/Questionnaire'

const InitialInterviewScreen = ({ navigation, route }) => {
    // 1 = paragraph, 2 = radiobutton, 3 = checkbox, 4 = dropdown
    const { questions } = route.params

    return (
        <SafeAreaView statusBarColor={Colors.white}>
            <Header
                title="Initial Interview"
                centerTitle
                style={{ backgroundColor: Colors.white, marginBottom: 15 }}
                onBackPress={() => navigation.pop()}
            />
            <Container>
                {questions ? (
                    <View>
                        <Questionnaire data={questions} />
                    </View>
                ) : (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}
                    >
                        <Text weight="medium" size={18}>
                            No questions
                        </Text>
                        <Image
                            resizeMode="contain"
                            source={require('../../assets/img/nomessage.png')}
                        />
                    </View>
                )}
            </Container>
        </SafeAreaView>
    )
}

export default InitialInterviewScreen

const styles = StyleSheet.create({})
