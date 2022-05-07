import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Dialog, Portal, Avatar } from 'react-native-paper'
import { Text, Container } from '../FiplyComponents'
import Colors from '../../../utils/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import moment from 'moment'
import DateTimePicker from '@react-native-community/datetimepicker'

const Approval = ({ visible = false, onDismiss = () => {}, onSubmitPress = () => {} }) => {
    const [remarks, setRemarks] = useState('')
    const [meetingTime, setMeetingTime] = useState('')
    const [meetingDate, setMeetingDate] = useState('')
    const [meetingDateTime, setMeetingDateTime] = useState(new Date())

    const [date, setDate] = useState(new Date())
    const [showDatePicker, setShowDatePicker] = useState({ modal: false, type: '' })
    const onChange = (event, selectedDate, callback) => {
        setShowDatePicker(Platform.OS === 'ios')
        if (selectedDate) {
            let stringDate = selectedDate.toLocaleDateString()
            callback(stringDate)
        }
    }
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
                            Application Approval
                        </Text>
                        <View style={styles.dateTimeContainer}>
                            <TouchableOpacity
                                style={{ marginVertical: 5 }}
                                onPress={() => setShowDatePicker({ modal: true, type: 'date' })}
                            >
                                <Text color={Colors.secondary}>Set Date: </Text>
                            </TouchableOpacity>
                            {meetingDate ? <Text>{meetingDate}</Text> : null}
                        </View>

                        <View style={styles.dateTimeContainer}>
                            <TouchableOpacity
                                style={{ marginVertical: 5 }}
                                onPress={() => setShowDatePicker({ modal: true, type: 'time' })}
                            >
                                <Text color={Colors.secondary}>Set Time: </Text>
                            </TouchableOpacity>
                            {meetingTime ? <Text>{meetingTime}</Text> : null}
                        </View>

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
                                    backgroundColor:
                                        remarks && meetingDate && meetingTime
                                            ? Colors.primary
                                            : Colors.grey,
                                },
                            ]}
                            disabled={!(remarks && meetingDate && meetingTime)}
                            activeOpacity={0.7}
                            // onPress={() => onSubmitPress(remarks)}
                            onPress={() => {
                                onSubmitPress({
                                    remarks: remarks,
                                    meet_date: new Date(meetingDate + ' ' + meetingTime),
                                })
                                onDismiss()
                            }}
                        >
                            <Text center weight="medium" color={Colors.white} size={16}>
                                Submit
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {showDatePicker.modal && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={showDatePicker.type}
                            display="spinner"
                            onChange={(e, val) =>
                                onChange(e, val, (strVal) => {
                                    if (showDatePicker.type == 'date') {
                                        setMeetingDate(moment(strVal, 'MM/DD/YYYY').format('LL'))
                                    } else {
                                        //moment(strVal, 'MM/DD/YYYY').format('LL')
                                        setMeetingTime(moment(val).format('LT'))
                                    }
                                })
                            }
                            // onChange={(e, val) =>
                            //     onChange(e, val, (strVal) => {
                            //         setFieldValue('birthday', strVal)
                            //     })
                            // }
                        />
                    )}
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
})

export default Approval
