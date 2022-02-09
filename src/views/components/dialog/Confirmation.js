import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Dialog, Portal, Button } from 'react-native-paper'
import { Text } from '../FiplyComponents';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../../utils/Colors';

const Confirmation = ({
        visible = false, 
        onDismiss = () => {}, 
        onOkPress = () => {},
        dialogText = '',    
    }) => {

    return (
        <View>
            <Portal>
                <Dialog style={styles.dialogContainer} visible={visible} onDismiss={onDismiss}>
                    <Dialog.Content>
                        <Text weight='medium'>{dialogText}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={onOkPress} color={Colors.red}>
                            Ok
                        </Button>
                        <Button onPress={onDismiss} color={Colors.black}>Cancel</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
        );
    };

const styles = StyleSheet.create({
    dialogContainer:{

    }
})

export default Confirmation