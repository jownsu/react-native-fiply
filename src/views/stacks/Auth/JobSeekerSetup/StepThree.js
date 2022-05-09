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
import useDocumentPicker from '../../../../utils/useDocumentPicker'
import useDocumentScanner from '../../../../utils/useDocumentScanner'

const StepThree = ({ navigation }) => {
    const [validId, setValidId] = useState('')
    const { uploadValidIds, loading } = useRegister()

    const { validIds, getValidIds, loading: validIdLoading } = useValidIDs()
    const { pickDocument } = useDocumentPicker()
    const { openScanner } = useDocumentScanner()
    const [frontUri, setFrontUri] = useState('')
    const [backUri, setBackUri] = useState('')

    const onUploadFrontBtnPress = () => {
        pickDocument(
            (response, uri) => {
                setFrontUri(uri)
            },
            ['image/*']
        )
    }
    const onScanFrontBtnPress = () => {
        openScanner(({ imgUri }) => {
            setFrontUri(imgUri)
        })
    }

    const onUploadBackBtnPress = () => {
        pickDocument(
            (response, uri) => {
                setBackUri(uri)
            },
            ['image/*']
        )
    }
    const onScanBackBtnPress = () => {
        openScanner(({ imgUri }) => {
            setBackUri(imgUri)
        })
    }

    const onProceedPress = () => {
        if (frontUri !== '' && backUri !== '' && validId !== '') {
            uploadValidIds(
                {
                    front: frontUri,
                    back: backUri,
                    valid_id: validId,
                },
                () => {
                    navigation.navigate('Done')
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
                    <StepIndicator />
                    <StepIndicator active />
                </View>
                <Container padding={20}>
                    <Text color={Colors.secondary} size={24} weight="medium" center>
                        Step 3
                    </Text>

                    <View style={{ marginVertical: 20 }}>
                        <Text weight="bold" size={21}>
                            Almost there!
                        </Text>
                        <Text>Select one valid ID to scan</Text>
                    </View>

                    <Dropdown
                        label={'Valid ID'}
                        value={validId}
                        data={validIds}
                        style={{ marginBottom: 20 }}
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
                                resizeMode={'contain'}
                            />
                            <Text>Scan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onUploadFrontBtnPress}>
                            <Image
                                source={require('../../../../assets/img/addfile.png')}
                                style={styles.imgScan}
                                resizeMode={'contain'}
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
                                resizeMode={'contain'}
                            />
                            <Text>Scan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onUploadBackBtnPress}>
                            <Image
                                source={require('../../../../assets/img/addfile.png')}
                                style={styles.imgScan}
                                resizeMode={'contain'}
                            />
                            <Text>Upload</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        {frontUri ? (
                            <View style={styles.uploadContainer}>
                                <Text weight="medium">Front</Text>
                                <Image
                                    source={{ uri: frontUri }}
                                    style={styles.uploadedImg}
                                    resizeMode={'contain'}
                                />
                            </View>
                        ) : null}
                        {backUri ? (
                            <View style={styles.uploadContainer}>
                                <Text weight="medium">Back</Text>
                                <Image
                                    source={{ uri: backUri }}
                                    style={styles.uploadedImg}
                                    resizeMode={'contain'}
                                />
                            </View>
                        ) : null}
                    </View>

                    <Button
                        title="Proceed"
                        disabled={validId && frontUri && backUri && !loading ? false : true}
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

export default StepThree

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
        width: 75,
        height: 75,
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
