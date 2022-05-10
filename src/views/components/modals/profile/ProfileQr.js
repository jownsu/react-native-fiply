import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Dialog, Portal, Avatar } from 'react-native-paper'
import { Text } from '../../FiplyComponents'
import Colors from '../../../../utils/Colors'
import QRCode from 'react-native-qrcode-svg'

const ProfileQr = ({ visible = false, id = {}, onDismiss = () => {} }) => {
    return (
        <View>
            <Portal>
                <Dialog style={styles.dialogContainer} visible={visible} onDismiss={onDismiss}>
                    <QRCode
                        logo={require('../../../../assets/img/icon.png')}
                        logoBorderRadius={3}
                        logoMargin={0}
                        quietZone={10}
                        value={id.toString()}
                        color={Colors.light}
                        size={200}
                        backgroundColor={Colors.primary}
                    />
                </Dialog>
            </Portal>
        </View>
    )
}

export default ProfileQr

const styles = StyleSheet.create({
    dialogContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        marginVertical: 0,
        marginHorizontal: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        elevation: 0,
    },
})
