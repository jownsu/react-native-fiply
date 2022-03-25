import React, { useState, useContext } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Alert } from 'react-native'
import { SafeAreaView, Container, Text, Button } from '../../../components/FiplyComponents'
import Colors from '../../../../utils/Colors'
import StepIndicator from '../../../components/StepIndicator'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons'
import SignUpContext from '../../../../api/context/auth/SignUpContext'
import useRegister from '../../../../api/hooks/auth/useRegister'

import useCamera from '../../../../utils/useCamera'
import useDocumentPicker from '../../../../utils/useDocumentPicker'

const StepTwo = ({ navigation }) => {
    const { createExperience, createEducationalBackground, uploadResume, loading } = useRegister()
    const { experience, educational_background } = useContext(SignUpContext)
    const { captureImage } = useCamera()
    const { pickDocument } = useDocumentPicker()
    const [resumeUri, setResumeUri] = useState('')
    const [uploadedFile, setUploadedFile] = useState({})

    const onUploadBtnPress = () => {
        pickDocument((uri, response) => {
            setUploadedFile(response)
            setResumeUri(uri)
        })
    }

    const onScanImagePress = () => {
        captureImage((uri, response) => {
            setUploadedFile(response)
            setResumeUri(uri)
        })
    }

    const onProceedPress = () => {
        if (Object.keys(experience).length !== 0) {
            createExperience(experience)
        }

        if (Object.keys(educational_background).length !== 0) {
            createEducationalBackground(educational_background)
        }

        if (resumeUri !== '') {
            uploadResume(resumeUri)
        }

        navigation.navigate('SemiVerified')
    }

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
                    <Text weight="bold" size={26}>
                        Almost there!
                    </Text>
                    <Text size={16}>Upload your CV to make it much easier to get hired.</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.optionBtn} onPress={onUploadBtnPress}>
                        <Image
                            source={require('../../../../assets/img/addfile.png')}
                            style={styles.imgAddFile}
                        />
                        <Text color={Colors.black} weight="medium" center>
                            Upload File
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionBtn} onPress={onScanImagePress}>
                        <Image
                            source={require('../../../../assets/img/scan.png')}
                            style={styles.imgScan}
                        />
                        <Text color={Colors.black} weight="medium" center>
                            Scan Image
                        </Text>
                    </TouchableOpacity>
                </View>

                {resumeUri !== '' && uploadedFile.type == 'image' && (
                    <View style={styles.uploadContainer}>
                        <Image source={{ uri: resumeUri }} style={styles.uploadedImg} />
                    </View>
                )}

                {resumeUri !== '' && uploadedFile.name && (
                    <View style={styles.uploadContainer}>
                        <FontAwesome
                            name="file-image-o"
                            size={24}
                            color={Colors.black}
                            style={{ marginRight: 15 }}
                        />
                        <Text numberOfLines={1} adjustsFontSizeToFit>
                            {uploadedFile.name}
                        </Text>
                    </View>
                )}

                <Button
                    title="Proceed"
                    style={{ marginTop: 75, marginBottom: 35 }}
                    disabled={resumeUri === '' ? true : false}
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

export default StepTwo

const styles = StyleSheet.create({
    optionBtn: {
        borderWidth: 2,
        borderColor: Colors.primary,
        borderStyle: 'dashed',
        backgroundColor: Colors.primaryLight,
        borderRadius: 15,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        width: 150,
    },
    imgScan: {
        width: 90,
        height: 76,
    },
    imgAddFile: {
        width: 85,
        height: 76,
    },
    uploadContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    uploadedImg: {
        borderRadius: 10,
        height: 75,
        width: 75,
    },
})
