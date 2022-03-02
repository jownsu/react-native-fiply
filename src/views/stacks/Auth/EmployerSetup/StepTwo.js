import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import ChooseCertificate from '../../../components/modals/ChooseCertificate'
import { SafeAreaView, Container, Text, Button } from '../../../components/FiplyComponents'
import Colors from '../../../../utils/Colors'
import StepIndicator from '../../../components/StepIndicator'
import { FontAwesome5 } from '@expo/vector-icons'

const StepTwo = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false)

    return (
        <SafeAreaView>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 35,
                }}
            >
                <StepIndicator />
                <StepIndicator active />
            </View>
            <Container center padding={20}>
                <Text color={Colors.secondary} size={24} weight="medium" center>
                    Step 2
                </Text>

                <View style={{ marginVertical: 30 }}>
                    <Text weight="medium" size={15}>
                        You are almost there...
                    </Text>
                    <Text>
                        Take a photo of recommended certificates or upload attachment file to
                        semi-verify your account.
                    </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.optionBtn} onPress={() => setShowModal(true)}>
                        <Text color={Colors.primary} center weight="medium">
                            Take certificate photo
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionBtn} onPress={() => setShowModal(true)}>
                        <Text color={Colors.primary} center weight="medium">
                            Upload attachment file
                        </Text>
                    </TouchableOpacity>
                </View>

                <Button
                    title="Proceed"
                    style={{ marginTop: 75, marginBottom: 35 }}
                    onPress={() => navigation.navigate('SemiVerified')}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text>Learn more about verification levels </Text>
                    <FontAwesome5 name="chevron-right" size={16} color={Colors.primary} />
                </View>
            </Container>

            <ChooseCertificate visible={showModal} onBackPress={() => setShowModal(false)} />
        </SafeAreaView>
    )
}

export default StepTwo

const styles = StyleSheet.create({
    optionBtn: {
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 10,
        height: 100,
        paddingBottom: 15,
        justifyContent: 'flex-end',
    },
})
