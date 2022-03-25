import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native'
import ChooseID from '../../../components/modals/ChooseID'
import {
    SafeAreaView,
    Container,
    Text,
    Button,
    Dropdown,
} from '../../../components/FiplyComponents'
import useValidIDs from '../../../../api/hooks/useValidIDs'
import Colors from '../../../../utils/Colors'
import StepIndicator from '../../../components/StepIndicator'
import { FontAwesome5 } from '@expo/vector-icons'
import SignUpContext from '../../../../api/context/auth/SignUpContext'

const StepThree = ({ navigation }) => {
    const [showIdModal, setShowIdModal] = useState(false)
    const [validId, setValidId] = useState('')
    const { validIds, getValidIds, loading } = useValidIDs()

    useEffect(() => {
        getValidIds()
    }, [])

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
                <StepIndicator />
                <StepIndicator active />
            </View>
            <Container center padding={20}>
                <Text color={Colors.secondary} size={24} weight="medium" center>
                    Step 3
                </Text>

                <View style={{ marginVertical: 30 }}>
                    <Text weight="bold" size={21}>
                        Almost there!
                    </Text>
                    <Text>Select one valid ID to scan</Text>
                </View>
                <TouchableOpacity style={styles.optionBtn}>
                    <Image
                        source={require('../../../../assets/img/scan.png')}
                        style={styles.imgScan}
                    />
                    <Text color={Colors.black} center weight="medium" style={{ marginTop: 5 }}>
                        Scan
                    </Text>
                </TouchableOpacity>

                <Dropdown
                    label={'Valid ID'}
                    value={validId}
                    data={validIds}
                    style={{ marginBottom: 5 }}
                    onSubmit={(text) => setValidId(text)}
                    // onTextInputPress={() => getEmploymentTypes()}
                    isLoading={loading}
                    noTextInput
                    dropdownIcon
                    // error={
                    //     touched.employment_type && errors.employment_type ? true : false
                    // }
                    // errorMsg={
                    //     touched.employment_type && errors.employment_type
                    //         ? errors.employment_type
                    //         : ''
                    // }
                />

                <Button
                    title="Proceed"
                    style={{ marginTop: 75, marginBottom: 35 }}
                    onPress={() => navigation.navigate('StepFour')}
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

            <ChooseID visible={showIdModal} onBackPress={() => setShowIdModal(false)} />
        </SafeAreaView>
    )
}

export default StepThree

const styles = StyleSheet.create({
    optionBtn: {
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 15,
        marginHorizontal: 10,
        marginBottom: 30,
        borderStyle: 'dashed',
        backgroundColor: Colors.primaryLight,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgScan: {
        width: 100,
        height: 86,
    },
})
