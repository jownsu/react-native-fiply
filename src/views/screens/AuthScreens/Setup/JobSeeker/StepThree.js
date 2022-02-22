import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import ChooseID from '../../../../components/modals/ChooseID'
import {
    SafeAreaView,
    Container,
    Text,
    Button,
} from '../../../../components/FiplyComponents'
import Colors from '../../../../../utils/Colors'
import StepIndicator from '../../../../components/StepIndicator'
import { FontAwesome5 } from '@expo/vector-icons'

const StepThree = ({ navigation }) => {
    const [showIdModal, setShowIdModal] = useState(false)

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
                <StepIndicator />
                <StepIndicator active />
            </View>
            <Container center padding={20}>
                <Text color={Colors.secondary} size={24} weight="medium" center>
                    Step 3
                </Text>

                <View style={{ marginVertical: 30 }}>
                    <Text weight="medium" size={15}>
                        You are almost there...
                    </Text>
                    <Text>
                        Take diploma photo and any valid ID to fully verify your
                        account
                    </Text>
                    <Text>
                        <Text weight="medium">Note: </Text>for{' '}
                        <Text weight="medium">STUDENTS</Text> take photo of
                        registration form and school ID
                    </Text>
                </View>

                <View
                    style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                    <TouchableOpacity style={styles.optionBtn}>
                        <Text color={Colors.primary} center weight="medium">
                            Take diploma / registration form photo
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.optionBtn}
                        onPress={() => setShowIdModal(true)}
                    >
                        <Text color={Colors.primary} center weight="medium">
                            Take ID photo
                        </Text>
                    </TouchableOpacity>
                </View>

                <Button
                    title="Proceed"
                    style={{ marginTop: 75, marginBottom: 35 }}
                    onPress={() => navigation.navigate('StepFour')}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text>Learn more about verification levels </Text>
                    <FontAwesome5
                        name="chevron-right"
                        size={16}
                        color={Colors.primary}
                    />
                </View>
            </Container>

            <ChooseID
                visible={showIdModal}
                onBackPress={() => setShowIdModal(false)}
            />
        </SafeAreaView>
    )
}

export default StepThree

const styles = StyleSheet.create({
    optionBtn: {
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 10,
        height: 100,
        justifyContent: 'flex-end',
    },
})
