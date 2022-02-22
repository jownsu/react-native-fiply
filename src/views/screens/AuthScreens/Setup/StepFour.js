import React from 'react'
import { View } from 'react-native'
import {
    SafeAreaView,
    Container,
    Text,
    Button,
} from '../../../components/FiplyComponents'
import Colors from '../../../../utils/Colors'
import StepIndicator from '../../../components/StepIndicator'
import { FontAwesome5 } from '@expo/vector-icons'

const StepFour = ({ navigation }) => {
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
                <StepIndicator />
                <StepIndicator active />
            </View>
            <Container padding={20}>
                <Text
                    color={Colors.secondary}
                    size={24}
                    weight="medium"
                    center
                    style={{ marginVertical: 50 }}
                >
                    Step 4
                </Text>
                <View>
                    <Text weight="medium" size={15}>
                        You are almost there...
                    </Text>
                    <Text>
                        Finally, please take a selfie to verify that it is you.
                    </Text>
                </View>

                <Text weight="medium" style={{ marginVertical: 10 }}>
                    Note:{' '}
                </Text>

                <Text style={{ marginBottom: 10 }}>
                    {'\u25CF'} Make sure you're in a well-lit area so the camera
                    can accurately scan your face.
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    {'\u25CF'} Make sure you're not photographing in direct
                    sunlight to avoid overexposure.
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    {'\u25CF'} Make sure you're fully facing the camera and your
                    head is within the on-screen circle.
                </Text>
                <Text style={{ marginBottom: 10 }}>
                    {'\u25CF'} Before snapping your selfie, take off any masks
                    or sunglasses.
                </Text>

                <Button
                    title="Take a selfie"
                    style={{ marginTop: 25, marginBottom: 75 }}
                    onPress={() => navigation.navigate('Done')}
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
        </SafeAreaView>
    )
}

export default StepFour
