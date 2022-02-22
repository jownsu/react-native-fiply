import React from 'react'
import { StyleSheet, View, Modal } from 'react-native'
import { Container, Text } from '../FiplyComponents'
import Header from '../headers/Header'
import RecommendedList from '../lists/RecommendedList'

const ChooseCertificate = ({ visible, onBackPress }) => {
    const CertificateList = [
        { id: '1', name: 'Business Permit' },
        { id: '2', name: 'Barangay Clearance' },
        { id: '3', name: 'DTI Business Registration Certificate' },
        { id: '4', name: 'SEC Registration Certificate' },
        { id: '5', name: 'Bureau of Internal Revenue TIN' },
    ]

    return (
        <Modal
            visible={visible}
            animationType="fade"
            onRequestClose={() => onBackPress()}
        >
            <Header title="Choose category" onBackPress={() => onBackPress()} />
            <Container center>
                <Text weight="medium" size={16} center>
                    Recommended Certificates
                </Text>
                <RecommendedList
                    onIdPress={(name) => alert(name)}
                    style={{ marginVertical: 50 }}
                    data={CertificateList}
                />
                <Text center>
                    Make sure your certificate is valid and is not expired
                </Text>
            </Container>
        </Modal>
    )
}

export default ChooseCertificate

const styles = StyleSheet.create({})
