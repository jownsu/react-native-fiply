import * as DocumentPicker from 'expo-document-picker'
import { useState } from 'react'

const useDocumentPicker = () => {
    const [uri, setUri] = useState('')
    const [loading, setLoading] = useState(false)

    const pickDocument = async (onUpload = () => {}) => {
        setLoading(true)
        await DocumentPicker.getDocumentAsync()
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

    return { pickDocument, uri, setUri, loading }
}

export default useDocumentPicker
