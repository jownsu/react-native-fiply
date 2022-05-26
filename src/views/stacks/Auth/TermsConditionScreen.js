import React, { useState } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import Colors from '../../../utils/Colors'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import {
    Text,
    FiplyLogo,
    WaveHeader,
    Container,
    Button,
    SafeAreaView,
} from '../../components/FiplyComponents'

import Back from '../../components/Back'

const TermsConditionScreen = ({ navigation }) => {
    return (
        <SafeAreaView flex>
            <ScrollView>
                <Container padding={20}>
                    <Ionicons
                        name="ios-checkmark-done-sharp"
                        size={150}
                        color={Colors.primary}
                        style={{ alignSelf: 'center' }}
                    />
                    <Text size={32} weight="semi-bold">
                        Terms & Condition
                    </Text>
                    <Text size={24} weight="medium">
                        1.1 Contract
                    </Text>
                    <Text>
                        When you use our Services you agree to all of these terms. Your use of our
                        Services is also subject to our Cookie Policy and our Privacy Policy, which
                        covers how we collect, use, share, and store your personal information. You
                        agree that by clicking “Join Now”, “Agree”, “Sign Up” or similar,
                        registering, accessing or using our services (described below), you are
                        agreeing to enter into a legally binding contract with Fiply (even if you
                        are using our Services on behalf of a company). If you do not agree to this
                        contract (“Contract” or “User Agreement”), do not click “Join Now” (or
                        similar) and do not access or otherwise use any of our Services. If you wish
                        to terminate this contract, at any time you can do so by closing your
                        account and no longer accessing or using our Services.
                    </Text>
                    <Text size={21} weight="medium">
                        1.2 Services
                    </Text>
                    <Text>
                        This Contract applies to Fiply.tech, Fiply-branded apps and other
                        Fiply-related sites, apps, communications and other services that state that
                        they are offered under this Contract (“Services”) Fiply You are entering
                        into this Contract with Fiply (also referred to as “we” and “us”)
                    </Text>
                    <Text size={24} weight="medium">
                        2. Obligations
                    </Text>
                    <Text size={21} weight="medium">
                        2.1 Your account
                    </Text>
                    <Text>
                        Members are account holders. You agree to: (1) use a strong password and
                        keep it confidential; (2) not transfer any part of your account (e.g.,
                        connections) As between you and others (including your employer), your
                        account belongs to you. However, if the Services were purchased by another
                        party for you to use (e.g. Recruiter seat bought by your employer), the
                        party paying for such Service has the right to control access to and get
                        reports on your use of such paid Service; however, they do not have rights
                        to your personal account.
                    </Text>
                    <Button
                        title="Continue"
                        style={{ marginVertical: 30 }}
                        onPress={() => {
                            navigation.pop()
                        }}
                    />
                </Container>
            </ScrollView>
        </SafeAreaView>
    )
}

export default TermsConditionScreen

const styles = StyleSheet.create({})
