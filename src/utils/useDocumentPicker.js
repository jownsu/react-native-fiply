import * as DocumentPicker from 'expo-document-picker'
import { useState } from 'react'

const useDocumentPicker = () => {
    const [uri, setUri] = useState('')
    const [loading, setLoading] = useState(false)

    const pickDocument = async (
        onUpload = () => {},
        type = ['image/*', 'application/msword', 'application/pdf']
    ) => {
        setLoading(true)
        await DocumentPicker.getDocumentAsync({
            type: type,
            multiple: true,
        })
            .then((response) => {
                if (!response.cancelled) {
                    if (response.size > 5000000) {
                        alert('Uploaded file is too large, 5mb is the limit')
                    } else {
                        const imageUri = 'file:///' + response.uri.split('file:/').join('')
                        onUpload(response, imageUri)
                        setUri(imageUri)
                    }
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false))
    }

    return { pickDocument, uri, setUri, loading }
}

export default useDocumentPicker
