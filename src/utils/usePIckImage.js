import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

const usePickImage = () => {
    const [pickUri, setPickUri] = useState('')
    const [loading, setLoading] = useState(false)

    const pickImage = async (aspect = [1, 1], onUpload = () => {}) => {
        setLoading(true)
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: aspect,
            quality: 0.5,
        })
            .then((response) => {
                if (!response.cancelled) {
                    const imageUri = 'file:///' + response.uri.split('file:/').join('')
                    onUpload(imageUri)
                    setPickUri(imageUri)
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }

    return { pickImage, pickUri, setPickUri, loading }
}

export default usePickImage
