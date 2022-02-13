import { StyleSheet, View, Image } from 'react-native'
import { Text} from './FiplyComponents'

const NoData = ({noDataMessage = 'No Data'}) => {
  return (
    <View style={styles.container}>
        <Text weight='medium' size={18} center>{noDataMessage}</Text>
         <View style={styles.imgContainer}>
            <Image 
                source={ require('../../assets/img/nomessage.png') }
                style={styles.img}
            />
        </View>
    </View>
  )
}

export default NoData

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    imgContainer:{
        width: 300,
        height: 300,
    },
    img:{
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    loadingIcon:{
        
    }
});