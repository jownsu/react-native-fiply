import RNGeniusScan from '@thegrizzlylabs/react-native-genius-scan'
import { useState } from 'react'

const useDocumentScanner = () => {
    const [imgUri, setImgUri] = useState()
    const [pdfUri, setPdfUri] = useState()
    const [loading, setLoading] = useState(false)

    const openScanner = (callback = () => {}) => {
        setLoading(true)
        RNGeniusScan.setLicenceKey(
            '533c5006525404020552075639525a0e4a095d135a454717045f440a4e555f520b58013d0903000551060304555a'
        )
            .then(() => {
                return RNGeniusScan.scanWithConfiguration({
                    source: 'camera',
                    multiPage: false,
                    pdfPageSize: 'a4',
                    defaultFlashMode: 'on',
                })
            })
            .then((result) => {
                // console.log(result)
                let IMG = result.scans[0].enhancedUrl
                let PDF = result.pdfUrl

                setImgUri(IMG)
                setPdfUri(PDF)
                callback({ imgUri: IMG, pdfUri: PDF })
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => setLoading(false))
    }

    return { imgUri, pdfUri, openScanner, loading }
}

export default useDocumentScanner
