import { Button, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import TesseractOcr, { LANG_ENGLISH, useEventListener } from 'react-native-tesseract-ocr'
import useCamera from './utils/useCamera'
import usePickImage from './utils/usePIckImage'

const DEFAULT_HEIGHT = 500
const DEFAULT_WITH = 600
const defaultPickerOptions = {
    cropping: true,
    height: DEFAULT_HEIGHT,
    width: DEFAULT_WITH,
}

const TestScreen = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [imgSrc, setImgSrc] = useState(null)
    const [text, setText] = useState('')
    const { captureImage } = useCamera()
    const [loading, setLoading] = useState(false)
    const { pickImage } = usePickImage()

    useEventListener('onProgressChange', (p) => {
        setProgress(p.percent / 100)
    })

    const recognizeFromPicker = async (options = defaultPickerOptions) => {
        try {
            pickImage(false, (uri) => {
                setImgSrc({ uri: uri })
                TesseractOcr.recognize(uri, LANG_ENGLISH, {})
                    .then((res) => {
                        console.log(res)
                        setText(res)
                    })
                    .catch((err) => console.log(err))
            })
        } catch (err) {
            if (err.message !== 'User cancelled image selection') {
                console.error(err)
            }
        }
    }

    const recognizeFromCamera = async (options = defaultPickerOptions) => {
        try {
            captureImage((response, uri) => {
                setImgSrc({ uri: uri })
                TesseractOcr.recognize(uri, LANG_ENGLISH, {})
                    .then((res) => {
                        console.log(res)
                        setText(res)
                    })
                    .catch((err) => console.log(err))
            })
        } catch (err) {
            if (err.message !== 'User cancelled image selection') {
                console.error(err)
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tesseract OCR example</Text>
            <Text style={styles.instructions}>Select an image source:</Text>
            <View style={styles.options}>
                <View style={styles.button}>
                    <Button
                        disabled={isLoading}
                        title="Camera"
                        onPress={() => {
                            recognizeFromCamera()
                        }}
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        disabled={isLoading}
                        title="Picker"
                        onPress={() => {
                            recognizeFromPicker()
                        }}
                    />
                </View>
                <ActivityIndicator animating={loading} />
            </View>
            {imgSrc && (
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={imgSrc} resizeMode="contain" />
                    {isLoading ? <Text>Loading...</Text> : <Text>{text}</Text>}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    options: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    button: {
        marginHorizontal: 10,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        marginVertical: 15,
        height: DEFAULT_HEIGHT / 2.5,
        width: DEFAULT_WITH / 2.5,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
})

export default TestScreen
