import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react'


const usePickImage = () => {

    const [pickUri, setPickUri] = useState('')
    const [loading, setLoading] = useState(false)

    const pickImage = async () => {
        setLoading(true)
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3, 3],
          quality: .5,
        }).then(response => {
            if (!response.cancelled){
                    setPickUri(response.uri)
            }
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    };

    return { pickImage, pickUri, setPickUri, loading }

}

export default usePickImage

