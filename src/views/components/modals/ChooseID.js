import React from 'react'
import { StyleSheet, View, Modal } from 'react-native'
import { Container, Text } from '../FiplyComponents'
import Header from '../headers/Header'
import RecommendedList from '../lists/RecommendedList'

const ChooseID = ({ visible, onBackPress = () => {} }) => {
    const IdList = [
        { id: '1', name: 'UMID' },
        { id: '2', name: "Driver's License" },
        { id: '3', name: 'Philhealth Card' },
        { id: '4', name: 'SSS ID' },
        { id: '5', name: 'Passport' },
        { id: '6', name: "Voter's ID" },
        { id: '7', name: 'Other ID' },
    ]

    return (
        <Modal
            visible={visible}
            animationType="fade"
            onRequestClose={() => onBackPress()}
        >
            <Header title="Choose an ID" onBackPress={() => onBackPress()} />
            <Container center>
                <Text weight="medium" size={16} center>
                    Recommended ID
                </Text>
                <RecommendedList
                    onIdPress={(name) => alert(name)}
                    style={{ marginVertical: 50 }}
                    data={IdList}
                />
                <Text center>
                    Make sure your ID is valid and is not expired
                </Text>
            </Container>
        </Modal>
    )
}

export default ChooseID

const styles = StyleSheet.create({})
