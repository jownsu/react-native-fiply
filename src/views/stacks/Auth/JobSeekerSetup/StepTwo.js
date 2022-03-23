import React from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView, Container, Text, Button } from '../../../components/FiplyComponents'
import Colors from '../../../../utils/Colors'
import StepIndicator from '../../../components/StepIndicator'
import { FontAwesome5 } from '@expo/vector-icons'

const StepTwo = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 35,
                }}
            >
                <StepIndicator />
                <StepIndicator active />
            </View>
            <Container center padding={20}>
                <Text color={Colors.secondary} size={24} weight="medium" center>
                    Step 2
                </Text>

                <View style={{ marginVertical: 30 }}>
                    <Text weight="bold" size={26}>
                        Almost there!
                    </Text>
                    <Text size={16}>Upload your CV to make it much easier to get hired.</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.optionBtn}>
                        <Image
                            source={require('../../../../assets/img/addfile.png')}
                            style={styles.imgAddFile}
                        />
                        <Text color={Colors.black} weight="medium" center>
                            Upload File
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionBtn}>
                        <Image
                            source={require('../../../../assets/img/scan.png')}
                            style={styles.imgScan}
                        />
                        <Text color={Colors.black} weight="medium" center>
                            Scan Image
                        </Text>
                    </TouchableOpacity>
                </View>

                <Button
                    title="Proceed"
                    style={{ marginTop: 75, marginBottom: 35 }}
                    onPress={() => navigation.navigate('SemiVerified')}
                />

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Text>Learn more about verification levels </Text>
                    <FontAwesome5 name="chevron-right" size={16} color={Colors.primary} />
                </View>
            </Container>
        </SafeAreaView>
    )
}

export default StepTwo

const styles = StyleSheet.create({
    optionBtn: {
        borderWidth: 2,
        borderColor: Colors.primary,
        borderStyle: 'dashed',
        backgroundColor: Colors.primaryLight,
        borderRadius: 15,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 120,
        width: 150,
    },
    imgScan: {
        width: 90,
        height: 76,
    },
    imgAddFile: {
        width: 85,
        height: 76,
    },
})
