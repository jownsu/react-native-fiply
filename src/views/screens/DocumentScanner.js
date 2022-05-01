import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from '../components/FiplyComponents'
import { Button } from '../../views/components/FiplyComponents'
import useDocumentScanner from '../../utils/useDocumentScanner'
const DocumentScanner = () => {
    const { scannedUri, openScanner } = useDocumentScanner()

    return (
        <SafeAreaView flex>
            <Button title="Scan u dipshit" onPress={openScanner} />
            {scannedUri ? (
                <View style={{ flex: 1 }}>
                    <Image source={{ uri: scannedUri }} style={{ flex: 1 }} />
                </View>
            ) : null}
            {/* {scannedURI ? <Text>{scannedURI}</Text> : null} */}
        </SafeAreaView>
    )
}

export default DocumentScanner

const styles = StyleSheet.create({})
