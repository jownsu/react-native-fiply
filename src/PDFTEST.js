import { StyleSheet, Dimensions, Text, View } from 'react-native'
import React from 'react'
import Pdf from 'react-native-pdf'

const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true }

const TestScreen1 = () => {
    return (
        <View style={styles.container}>
            <Pdf
                source={source}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`)
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`)
                }}
                onError={(error) => {
                    console.log(error)
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`)
                }}
                style={styles.pdf}
            />
        </View>
    )
}

export default TestScreen1

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
