import { StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import { Text, TextInput, InputDropdown } from './FiplyComponents'
import Colors from '../../utils/Colors'

const CreateQuestionnaire = ({data}) => {
  return (
    <View>
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
                    <View>

                    </View>
                )}
            ListFooterComponent={() => (
                <View style={styles.questionContainer}>
                    <TextInput 
                        label='Question'
                        roundness={10}
                        style={{ height: 35, fontSize: 14 }}

                        dense
                    />
                </View>
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
        borderColor: Colors.light
    },

});
