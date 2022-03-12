import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView, Container, Text, Button } from '../components/FiplyComponents'
import React from 'react'
import Colors from '../../utils/Colors'

const LandingScreen = ({ navigation }) => {
    return (
        <SafeAreaView flex>
            <Container padding={20} flex>
                <View style={styles.sectionContainer}>
                    <View style={{ position: 'absolute', bottom: 0, left: 0 }}>
                        <Text size={18} color={Colors.primary} weight="medium">
                            Discover Career
                        </Text>
                        <Text size={18} color={Colors.primary} weight="medium">
                            Opportunites
                        </Text>
                    </View>

                    <Image
                        source={require('../../assets/img/joboffer.png')}
                        resizeMode="contain"
                        style={{ ...styles.img, alignSelf: 'flex-end' }}
                    />
                </View>
                <View style={styles.sectionContainer}>
                    <Image
                        source={require('../../assets/img/connect.png')}
                        resizeMode="contain"
                        style={styles.img}
                    />
                    <View style={{ position: 'absolute', top: 0, right: 0 }}>
                        <Text size={18} color={Colors.secondary} weight="medium">
                            Connect With
                        </Text>
                        <Text size={18} color={Colors.secondary} center weight="medium">
                            Other
                        </Text>
                        <Text size={18} color={Colors.secondary} weight="medium">
                            Professionals
                        </Text>
                    </View>
                </View>
                <View style={styles.section2Container}>
                    <View style={{ position: 'absolute', top: 0 }}>
                        <Text size={18} weight="medium" center>
                            ALL OVER
                        </Text>
                        <Text size={18} weight="medium" center>
                            THE WORLD
                        </Text>
                    </View>
                    <Image
                        source={require('../../assets/img/world.png')}
                        resizeMode="contain"
                        style={{ ...styles.img, marginTop: 20 }}
                    />
                </View>
                <View style={styles.footer}>
                    <Button
                        title={'Join Now'}
                        style={{ marginBottom: 10 }}
                        onPress={() => navigation.navigate('SignInScreen')}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('SignUpStack')}>
                        <Text weight="semi-bold" center color={Colors.grey}>
                            ALREADY HAVE AN ACCOUNT?
                        </Text>
                    </TouchableOpacity>
                </View>
            </Container>
        </SafeAreaView>
    )
}

export default LandingScreen

const styles = StyleSheet.create({
    sectionContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    img: {
        height: 200,
        width: 200,
    },
    section2Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        paddingVertical: 10,
    },
})
