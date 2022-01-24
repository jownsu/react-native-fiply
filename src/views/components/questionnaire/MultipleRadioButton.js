import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Colors from '../../../utils/Colors'
import { Text } from '../FiplyComponents'
import { RadioButton } from 'react-native-paper';

const MultipleRadioButton = ({item, index}) => {
    const [indexRB, setindexRB] = useState()

  return (
    <View style={styles.container}>
        <Text weight='medium' style={styles.question}>{index ? index + ' . ' : ''}{item.question}</Text>
        <View style={styles.optionsContainer}>

        { item.options.map((item, index) => (
                <View key={index} style={styles.options}>
                    <RadioButton
                        value="" 
                        status={index == indexRB ? 'checked' : 'unchecked'}
                        onPress={() => setindexRB(index)}
                    />
                    <Text>{item}</Text>
                </View>
        ))}
        </View>
    </View>
  );
};

export default MultipleRadioButton;

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
    },
    optionsContainer:{
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    options:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%'
    }
});
