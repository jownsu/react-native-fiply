import { StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { Text, ActivityIndicator } from '../../../components/FiplyComponents'
import Pdf from 'react-native-pdf'
import Header from '../../../components/headers/Header'
import Colors from '../../../../utils/Colors'
import JobContext from '../../../../api/context/EMPLOYER/job/JobContext'
import { ProgressBar, Snackbar } from 'react-native-paper'

const ResumeScreen = ({ navigation }) => {
    const { response, loading } = useContext(JobContext)

    return (
        <View style={styles.container}>
            <Header
                title={'Resume'}
                style={{ backgroundColor: Colors.white }}
                onBackPress={() => navigation.pop()}
            />
            <ProgressBar indeterminate color={Colors.secondary} visible={loading} />

            {response.resume ? (
                <Pdf
                    source={{
                        uri: response.resume,
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
})
