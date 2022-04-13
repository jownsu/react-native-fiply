import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

const usePickImage = () => {
    const [pickUri, setPickUri] = useState('')
    const [loading, setLoading] = useState(false)

    const pickImage = async (aspect, onUpload = () => {}) => {
        setLoading(true)

        const imgPickerConfig = {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
        }

        const test = aspect == false ? {} : { aspect: aspect }

        await ImagePicker.launchImageLibraryAsync({ ...imgPickerConfig, ...test })
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
