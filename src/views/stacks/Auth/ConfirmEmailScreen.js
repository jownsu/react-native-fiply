import React, { useState, useContext } from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import AuthContext from '../../../api/context/auth/AuthContext'
import SignUpContext from '../../../api/context/auth/SignUpContext'

import {
    Text,
    FiplyLogo,
    WaveHeader,
    Container,
    Button,
    SafeAreaView,
} from '../../components/FiplyComponents'

const ConfirmEmailScreen = ({ navigation }) => {
    const { signup, loading } = useContext(AuthContext)
    const { getAllSignUpData, email } = useContext(SignUpContext)

    const [code, setCode] = useState([])

    const numberPress = (num) => {
        if (code.length <= 5) {
            setCode([...code, num])
        }
    }

    const handleDelete = () => {
        setCode(code.slice(0, code.length - 1))
    }

    const handleDeleteAll = () => {
        setCode([])
    }

    const handleConfirm = () => {
        const SignUpdata = getAllSignUpData()
        // console.log({ ...SignUpdata, code: code.join('') })
        signup({ ...SignUpdata, code: code.join('') }, () => navigation.navigate('BasicUser'))
        setCode([])
    }

    return (
        <SafeAreaView flex>
            <WaveHeader waveimg={require('../../../assets/img/waves/3.png')} />
            <Container center padding={20}>
                {/* <FiplyLogo style={{ marginBottom: 10 }} /> */}
                {/* <Text center>Code was sent in {signUpData.email}</Text> */}
                <Image
                    source={require('../../../assets/img/mail.png')}
                    style={styles.img}
                    resizeMode="center"
                />

                <Text center>
                    We sent a verification code on {email}. Please enter the verification below.
                </Text>
                <View style={styles.textInputContainer}>
                    <View style={styles.textInputView}>
                        <Text style={styles.textInsideView}>{code[0]}</Text>
                    </View>

                    <View style={styles.textInputView}>
                        <Text style={styles.textInsideView}>{code[1]}</Text>
                    </View>

                    <View style={styles.textInputView}>
                        <Text style={styles.textInsideView}>{code[2]}</Text>
                    </View>

                    <View style={styles.textInputView}>
                        <Text style={styles.textInsideView}>{code[3]}</Text>
                    </View>

                    <View style={styles.textInputView}>
                        <Text style={styles.textInsideView}>{code[4]}</Text>
                    </View>

                    <View style={styles.textInputView}>
                        <Text style={styles.textInsideView}>{code[5]}</Text>
                    </View>
                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.buttonProperty}
                        onPress={() => {
                            numberPress(1)
                        }}
                    >
                        <Text style={styles.textButton}>1</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonProperty}
                        onPress={() => {
                            numberPress(2)
                        }}
                    >
                        <Text style={styles.textButton}>2</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonProperty}
                        onPress={() => {
                            numberPress(3)
                        }}
                    >
                        <Text style={styles.textButton}>3</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.buttonProperty}
                        onPress={() => {
                            numberPress(4)
                        }}
                    >
                        <Text style={styles.textButton}>4</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonProperty}
                        onPress={() => {
                            numberPress(5)
                        }}
                    >
                        <Text style={styles.textButton}>5</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonProperty}
                        onPress={() => {
                            numberPress(6)
                        }}
                    >
                        <Text style={styles.textButton}>6</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.buttonProperty}
                        onPress={() => {
                            numberPress(7)
                        }}
                    >
                        <Text style={styles.textButton}>7</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonProperty}
                        onPress={() => {
                            numberPress(8)
                        }}
                    >
                        <Text style={styles.textButton}>8</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonProperty}
                        onPress={() => {
                            numberPress(9)
                        }}
                    >
                        <Text style={styles.textButton}>9</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonView}>
                    <TouchableOpacity
                        style={styles.buttonProperty}
                        onPress={() => {
                            handleDeleteAll()
                        }}
                    >
                        <Text style={styles.textButton}>C</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonProperty}
                        onPress={() => {
                            numberPress(0)
                        }}
                    >
                        <Text style={styles.textButton}>0</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonProperty}
                        onPress={() => {
                            handleDelete()
                        }}
                    >
                        <Text style={styles.textButton}>DEL</Text>
                    </TouchableOpacity>
                </View>

                <Button
                    title={'Confirm'}
                    style={{ marginVertical: 20 }}
                    disabled={code.length != 6}
                    onPress={handleConfirm}
                    loading={loading}
                />
            </Container>
        </SafeAreaView>
    )
}

export default ConfirmEmailScreen

const styles = StyleSheet.create({
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonProperty: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        height: 60,
        width: 60,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: 'green',
        margin: 5,
    },
    textButton: {
        fontSize: 18,
    },
    textInputView: {
        height: 45,
        width: 45,
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 20,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInsideView: {
        margin: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    textInputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        height: 150,
        width: 167,
        alignSelf: 'center',
        borderWidth: 1,
        marginBottom: 10,
    },
})
