import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import {
    SafeAreaView,
    Container,
    Text,
    Button,
    Dropdown,
} from '../../../components/FiplyComponents'
import useCompanyCertificates from '../../../../api/hooks/useCompanyCertificates'
import Colors from '../../../../utils/Colors'
import StepIndicator from '../../../components/StepIndicator'
import { FontAwesome5 } from '@expo/vector-icons'
import useRegister from '../../../../api/hooks/auth/useRegister'
import useDocumentPicker from '../../../../utils/useDocumentPicker'

const StepThree = ({ navigation }) => {
    const [certificate, setCertificate] = useState('')
    const { uploadCompanyCertificate, loading } = useRegister()

    const { certificates, getCertificates, loading: certificateLoading } = useCompanyCertificates()
    const { pickDocument } = useDocumentPicker()
    const [certificateUri, setcertificateUri] = useState('')

    const onUploadBtnPress = () => {
        pickDocument(
            (response, uri) => {
                setcertificateUri(uri)
            },
            ['image/*']
        )
    }

    const onProceedPress = () => {
        if (certificateUri !== '' && certificate !== '') {
            uploadCompanyCertificate(
                {
                    certificate_image: certificateUri,
                    certificate: certificate,
                },
                () => {
                    navigation.navigate('Done')
                }
            )
        }
    }

    useEffect(() => {
        getCertificates()
    }, [])

    return (
        <SafeAreaView flex>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 20,
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
                    <Text weight="bold" size={21}>
                        Almost there!
                    </Text>
                </View>

                <Dropdown
                    label={'Select a Certificate'}
                    value={certificate}
                    data={certificates}
                    style={{ marginBottom: 25 }}
                    onSubmit={(text) => setCertificate(text)}
                    isLoading={certificateLoading}
                    noTextInput
                    dropdownIcon
                />

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.optionBtn} onPress={onUploadBtnPress}>
                        <Image
                            source={require('../../../../assets/img/addfile.png')}
                            style={styles.imgScan}
                        />
                        <Text color={Colors.black} center weight="medium" style={{ marginTop: 5 }}>
                            Upload Certificate
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    {certificateUri ? (
                        <View style={styles.uploadContainer}>
                            <Text weight="medium">Certificate</Text>
                            <Image source={{ uri: certificateUri }} style={styles.uploadedImg} />
                        </View>
                    ) : null}
                </View>

                <Button
                    title="Proceed"
                    disabled={certificate && certificateUri && !loading ? false : true}
                    loading={loading}
                    style={{ marginTop: 75, marginBottom: 35 }}
                    onPress={onProceedPress}
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
        </SafeAreaView>
    )
}

export default StepThree

const styles = StyleSheet.create({
    optionBtn: {
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 15,
        marginHorizontal: 10,
        marginBottom: 30,
        borderStyle: 'dashed',
        backgroundColor: Colors.primaryLight,
        height: 150,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgScan: {
        width: 105,
        height: 96,
    },
    uploadContainer: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    uploadedImg: {
        borderRadius: 10,
        height: 75,
        width: 75,
    },
})
