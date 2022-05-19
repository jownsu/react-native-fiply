import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Dialog, Portal } from 'react-native-paper'
import { Text, Container } from '../FiplyComponents'
import Colors from '../../../utils/Colors'
import { MaterialIcons } from '@expo/vector-icons'

const InterviewAction = ({
    visible = false,
    onDismiss = () => {},
    onPassedPress = () => {},
    onFailedPress = () => {},
}) => {
    const [remarks, setRemarks] = useState('')

    return (
        <View>
            <Portal>
                <Dialog style={styles.dialogContainer} visible={visible} onDismiss={onDismiss}>
                    <MaterialIcons
                        name="close"
                        size={24}
                        style={styles.closeBtn}
                        color={Colors.red}
                        onPress={onDismiss}
                    />
                    <Container padding={20}>
                        <Text
                            weight="semi-bold"
                            size={16}
                            color={Colors.primary}
                            center
                            style={{ marginBottom: 5 }}
                        >
                            Approval
                        </Text>
                        <Text weight="semi-bold">Remarks</Text>
                        <View style={styles.txtInputContainer}>
                            <TextInput
                                style={styles.txtInputStyle}
                                value={remarks}
                                onChangeText={(text) => setRemarks(text)}
                                multiline
                                textAlignVertical="top"
                                placeholder="Remarks..."
                            />
                        </View>
                    </Container>
                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            style={[
                                styles.submitBtn,
                                {
                                    backgroundColor: Colors.white,
                                },
                            ]}
                            activeOpacity={0.7}
                            onPress={() => {
                                onFailedPress(remarks)
                                onDismiss()
                            }}
                        >
                            <Text center weight="medium" color={Colors.red} size={16}>
                                Failed
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.submitBtn,
                                {
                                    backgroundColor: Colors.primary,
                                },
                            ]}
                            activeOpacity={0.7}
                            // onPress={() => onSubmitPress(remarks)}
                            onPress={() => {
                                onPassedPress(remarks)
                                onDismiss()
                            }}
                        >
                            <Text center weight="medium" color={Colors.white} size={16}>
                                Passed
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    dialogContainer: {
        borderRadius: 10,
        minHeight: 400,
        paddingTop: 20,
        overflow: 'hidden',
    },
    txtInputContainer: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 5,
    },
    txtInputStyle: {
        fontFamily: 'EncodeSansExpaded-Light',
        flex: 1,
    },
    submitBtn: {
        flex: 1,
        paddingVertical: 15,
        marginTop: 15,
    },
    closeBtn: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    dateTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerContainer: {
        flexDirection: 'row',
    },
})

export default InterviewAction
