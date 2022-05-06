import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, TouchableOpacity, FlatList, Dimensions, ScrollView } from 'react-native'
import { SafeAreaView, Container, Text, FiplyLogo } from '../../components/FiplyComponents'
import { Avatar } from 'react-native-paper'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'
import Colors from '../../../utils/Colors'
const { width } = Dimensions.get('screen')
import AuthContext from '../../../api/context/auth/AuthContext'
import useHiringManager from '../../../api/hooks/employer/useHiringManager'

const SelectUserScreen = ({ navigation }) => {
    const { hiringManagers, getHiringManagers } = useHiringManager()
    const { user, logout } = useContext(AuthContext)

    useEffect(() => {
        getHiringManagers()
    }, [])

    const renderItem = (item) => (
        <TouchableOpacity
            key={item.id}
            style={styles.userBtnContainer}
            onPress={() => {
                navigation.navigate('CodeScreen', { hiring_manager_id: item.id })
            }}
        >
            <View style={styles.userAvatarContainer}>
                <Avatar.Image
                    source={{ uri: item.avatar }}
                    size={65}
                    backgroundColor={Colors.white}
                />
            </View>
            <Text weight="medium" size={12}>
                {item.name}
            </Text>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView flex>
            <FiplyLogo style={{ marginVertical: 30 }} />
            <ScrollView style={styles.container}>
                <Text weight="bold" size={21} center>
                    Choose User
                </Text>
                <View style={styles.usersContainer}>
                    <TouchableOpacity
                        style={[
                            styles.userBtnContainer,
                            { borderColor: Colors.primary, borderWidth: 2 },
                        ]}
                        onPress={() => {
                            navigation.navigate('CodeScreen', { isEmployerAdmin: true })
                        }}
                    >
                        <View style={styles.userAvatarContainer}>
                            <Avatar.Image
                                source={{ uri: user.avatar }}
                                size={65}
                                backgroundColor={Colors.white}
                            />
                        </View>
                        <Text weight="medium" size={12}>
                            {user.name}
                        </Text>
                    </TouchableOpacity>

                    {hiringManagers.map(renderItem)}
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                <FontAwesome5
                    name="sign-out-alt"
                    size={24}
                    color={Colors.red}
                    style={{ marginRight: 5 }}
                />
                <Text color={Colors.red} weight="medium">
                    Sign out
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default SelectUserScreen

const styles = StyleSheet.create({
    container: {},
    userBtnContainer: {
        borderWidth: 1,
        borderColor: Colors.grey,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 5,
        padding: 10,
        maxWidth: 150,
    },
    userAvatarContainer: {
        marginBottom: 5,
    },
    usersContainer: {
        marginVertical: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    logoutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
})
