import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { Text, ActivityIndicator } from '../../components/FiplyComponents'
import ProfileContext from '../../../api/context/profile/ProfileContext'
import Pdf from 'react-native-pdf'
import Header from '../../components/headers/Header'
import Colors from '../../../utils/Colors'
import { MaterialIcons } from '@expo/vector-icons'
import { ProgressBar, Snackbar } from 'react-native-paper'

import useDocumentPicker from '../../../utils/useDocumentPicker'

const ResumeScreen = ({ navigation }) => {
    const { userInfo, resume, getResume, uploadResume, loading, snackBarMessage, hideSnackBar } =
        useContext(ProfileContext)
    const { pickDocument } = useDocumentPicker()

    useEffect(() => {
        if (!resume) {
            getResume(userInfo.id)
        }
    }, [])

    const onUploadBtnPress = () => {
        pickDocument(
            (response, uri) => {
                uploadResume(uri)
            },
            ['application/pdf']
        )
    }

    return (
        <View style={styles.container}>
            <Header
                title={'Resume'}
                style={{ backgroundColor: Colors.white }}
                onBackPress={() => navigation.pop()}
                rightIcon={
                    userInfo.is_me
                        ? () => (
                              <TouchableOpacity activeOpacity={0.7} onPress={onUploadBtnPress}>
                                  <MaterialIcons
                                      name="upload-file"
                                      size={24}
                                      color={Colors.secondary}
                                  />
                              </TouchableOpacity>
                          )
                        : null
                }
            />
            <ProgressBar indeterminate color={Colors.secondary} visible={loading} />

            {resume ? (
                <Pdf
                    source={{
                        uri: resume,
                        cache: true,
                    }}
                    // onLoadComplete={(numberOfPages, filePath) => {
                    //     console.log(`Number of pages: ${numberOfPages}`)
                    // }}
                    // onPageChanged={(page, numberOfPages) => {
                    //     console.log(`Current page: ${page}`)
                    // }}
                    onError={(error) => {
                        console.log(error)
                    }}
                    // onPressLink={(uri) => {
                    //     console.log(`Link pressed: ${uri}`)
                    // }}
                    style={styles.pdf}
                />
            ) : (
                <Text>No Resume</Text>
            )}

            <ActivityIndicator visible={loading} />

            <Snackbar
                visible={snackBarMessage ? true : false}
                onDismiss={() => hideSnackBar()}
                duration={3000}
                style={{ backgroundColor: Colors.black }}
            >
                <Text color={Colors.white}>{snackBarMessage}</Text>
            </Snackbar>
        </View>
    )
}

export default ResumeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})
