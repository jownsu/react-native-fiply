import { StyleSheet, View } from 'react-native';
import React from 'react'
import Colors from '../../../utils/Colors'
import { TextInput, Text } from '../FiplyComponents'

const Paragraph = ({item, index, disabled = false}) => {
  return (
    <View style={styles.container}>
        <Text weight='medium' style={styles.question} >{index ? index + ' . ' : ''}{item.question}</Text>
        <TextInput
            label='Your answer'
            style={{ backgroundColor: Colors.white, maxHeight: 150}}
            dense
            multiline
            disabled={disabled}
        />
    </View>
  );
};

export default Paragraph;

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.white,
        padding: 15,
        borderWidth: 1,
        borderColor: Colors.light,
        borderRadius: 10,
        marginBottom: 5
    },
    question:{
        marginBottom: 25
    }
});
