import { StyleSheet, View } from 'react-native'
import { Text } from '../FiplyComponents'
import { Checkbox } from 'react-native-paper'
import Colors from '../../../utils/Colors'

import React, { useState } from 'react';

const MultipleCheckbox = ({item, index}) => {
    const [indexCB, setIndexCB] = useState([])

    const handleOnPress = (i) => {
        if(indexCB.includes(i)){
            setIndexCB(indexCB.filter(item => item != i))
        }else{
            setIndexCB([...indexCB, i])
        }
    }

  return (
    <View style={styles.container}>
        <Text weight='medium' style={styles.question}>{index}. {item.question}</Text>
        <View style={styles.optionsContainer}>
            {item.options.map((item, index) => (
                    <View key={index} style={styles.options}>
                        <Checkbox
                            status={indexCB.includes(index) ? 'checked' : 'unchecked'}
                            onPress={() => handleOnPress(index)}
                        />
                        <Text>{item}</Text>
                    </View>
            ))}
        </View>
    </View>
  );
};

export default MultipleCheckbox;

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
