import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import {
    SafeAreaView,
    Container,
    Text,
    Button,
    Dropdown,
} from '../../../components/FiplyComponents'
import useValidIDs from '../../../../api/hooks/useValidIDs'
import Colors from '../../../../utils/Colors'
import StepIndicator from '../../../components/StepIndicator'
import { FontAwesome5 } from '@expo/vector-icons'
import useRegister from '../../../../api/hooks/auth/useRegister'
import useDocumentScanner from '../../../../utils/useDocumentScanner'
import usePickImage from '../../../../utils/usePIckImage'

const StepTwo = ({ navigation }) => {
    const [validId, setValidId] = useState('')
    const { uploadCompanyValidIds, loading } = useRegister()

    const { validIds, getValidIds, loading: validIdLoading } = useValidIDs()
    const { pickImage, pickUri } = usePickImage()

    const { openScanner } = useDocumentScanner()
    const [frontUri, setFrontUri] = useState('')
    const [backUri, setBackUri] = useState('')

    const onUploadFrontBtnPress = () => {
        pickImage([], (uri) => {
            setFrontUri(uri)
        })
    }

    const onScanFrontBtnPress = () => {
        openScanner(({ imgUri }) => {
            setFrontUri(imgUri)
        })
    }

    const onUploadBackBtnPress = () => {
        pickImage([], (uri) => {
            setBackUri(uri)
        })
    }

    const onScanBackBtnPress = () => {
        openScanner(({ imgUri }) => {
            setBackUri(imgUri)
        })
    }

    const onProceedPress = () => {
        if (frontUri !== '' && backUri !== '' && validId !== '') {
            uploadCompanyValidIds(
                {
                    front: frontUri,
                    back: backUri,
                    valid_id: validId,
                },
                () => {
                    navigation.navigate('StepThree')
                }
            )
        }
    }

    useEffect(() => {
        getValidIds()
    }, [])

    return (
        <SafeAreaView flex>
            <ScrollView style={{ flex: 1 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginVertical: 20,
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
                        <Text weight="bold" size={21}>
                            Almost there!
                        </Text>
                    </View>

                    <Dropdown
                        label={'Select Valid ID'}
                        value={validId}
                        data={validIds}
                        style={{ marginBottom: 25 }}
                        onSubmit={(text) => setValidId(text)}
                        isLoading={validIdLoading}
                        noTextInput
                        dropdownIcon
                    />

                    <Text weight="medium" size={16} center>
                        Front
                    </Text>
                    <View style={styles.optionBtn}>
                        <TouchableOpacity onPress={onScanFrontBtnPress}>
                            <Image
                                source={require('../../../../assets/img/scan.png')}
                                style={styles.imgScan}
                            />
                            <Text>Scan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onUploadFrontBtnPress}>
                            <Image
                                source={require('../../../../assets/img/addfile.png')}
                                style={styles.imgScan}
                            />
                            <Text>Upload</Text>
                        </TouchableOpacity>
                    </View>
                    <Text weight="medium" size={16} center>
                        Back
                    </Text>
                    <View style={styles.optionBtn}>
                        <TouchableOpacity onPress={onScanBackBtnPress}>
                            <Image
                                source={require('../../../../assets/img/scan.png')}
                                style={styles.imgScan}
                            />
                            <Text>Scan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onUploadBackBtnPress}>
                            <Image
                                source={require('../../../../assets/img/addfile.png')}
                                style={styles.imgScan}
                            />
                            <Text>Upload</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        {frontUri ? (
                            <View style={styles.uploadContainer}>
                                <Text weight="medium">Front</Text>
                                <Image source={{ uri: frontUri }} style={styles.uploadedImg} />
                            </View>
                        ) : null}
                        {backUri ? (
                            <View style={styles.uploadContainer}>
                                <Text weight="medium">Back</Text>
                                <Image source={{ uri: backUri }} style={styles.uploadedImg} />
                            </View>
                        ) : null}
                    </View>

                    <Button
                        title="Proceed"
                        disabled={validId && !loading ? false : true}
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
            </ScrollView>
        </SafeAreaView>
    )
}

export default StepTwo

const styles = StyleSheet.create({
    optionBtn: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 15,
        marginVertical: 10,
        borderStyle: 'dashed',
        height: 120,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    imgScan: {
        width: 73,
        height: 68,
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
