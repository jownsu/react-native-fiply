import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
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

const StepThree = ({ navigation }) => {
    const [validId, setValidId] = useState('')
    const { uploadValidIds, loading } = useRegister()

    const { validIds, getValidIds, loading: validIdLoading } = useValidIDs()
    const { pickDocument } = useDocumentPicker()
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

    const onUploadBackBtnPress = () => {
        pickDocument(
            (response, uri) => {
                setBackUri(uri)
            },
            ['image/*']
        )
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
                    <Text>Select one valid ID to scan</Text>
                </View>

                <Dropdown
                    label={'Valid ID'}
                    value={validId}
                    data={validIds}
                    style={{ marginBottom: 25 }}
                    onSubmit={(text) => setValidId(text)}
                    isLoading={validIdLoading}
                    noTextInput
                    dropdownIcon
                />

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.optionBtn} onPress={onUploadFrontBtnPress}>
                        <Image
                            source={require('../../../../assets/img/addfile.png')}
                            style={styles.imgScan}
                        />
                        <Text color={Colors.black} center weight="medium" style={{ marginTop: 5 }}>
                            Upload Front
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionBtn} onPress={onUploadBackBtnPress}>
                        <Image
                            source={require('../../../../assets/img/addfile.png')}
                            style={styles.imgScan}
                        />
                        <Text color={Colors.black} center weight="medium" style={{ marginTop: 5 }}>
                            Upload Back
                        </Text>
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
