import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

const useCamera = () => {
    const [uri, setUri] = useState('')
    const [loading, setLoading] = useState(false)

    const verifyPermission = async () => {
        const result = await ImagePicker.requestCameraPermissionsAsync()
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant camera permissions to use this app.',
                [{ text: 'Okay' }]
            )
            return false
        }
        return true
    }

    const captureImage = async (onUpload = () => {}) => {
        if (!verifyPermission()) {
            return false
        }
        setLoading(true)
        await ImagePicker.launchCameraAsync()
            .then((response) => {
                if (!response.cancelled) {
                    const imageUri = 'file:///' + response.uri.split('file:/').join('')
                    onUpload(imageUri, response)
                    setUri(imageUri)
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }

    return { captureImage, uri, setUri, loading }
}

export default useCamera
