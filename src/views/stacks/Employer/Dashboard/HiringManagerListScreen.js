import { StyleSheet, View, FlatList, Image, RefreshControl } from 'react-native'
import React, { useContext } from 'react'
import { Text, Container, SafeAreaView } from '../../../components/FiplyComponents'
import { ProgressBar, Snackbar } from 'react-native-paper'
import Header from '../../../components/headers/Header'
import SearchBar from '../../../components/headers/SearchBar'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../../../../utils/Colors'
import DashboardContext from '../../../../api/context/EMPLOYER/dashboard/DashboardContext'
import HiringManagerItem from '../../../components/lists/HiringManagerItem'

const HiringManagerListScreen = ({ navigation }) => {
    const {
        hiringManagers,
        getHiringManager,
        getHiringManagers,
        loading,
        snackBarMessage,
        hideSnackBar,
    } = useContext(DashboardContext)

    const renderItem = ({ item }) => (
        <HiringManagerItem
            item={item}
            onItemPress={() => {
                getHiringManager(item.id)
                navigation.navigate('HiringManagerScreen')
            }}
        />
    )

    return (
        <SafeAreaView statusBarColor={Colors.white}>
            <Header
                title={'Hiring Managers'}
                style={{ backgroundColor: Colors.white }}
                onBackPress={() => navigation.pop()}
                // rightIcon={() => <MaterialIcons name="menu" size={24} color={Colors.black} />}
            />
            <ProgressBar indeterminate color={Colors.secondary} visible={loading} />

            {/* <SearchBar style={{ marginVertical: 10 }} /> */}

            <FlatList
                data={hiringManagers}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={() => getHiringManagers()} />
                }
                renderItem={renderItem}
            />
            <Snackbar
                visible={snackBarMessage ? true : false}
                onDismiss={() => hideSnackBar()}
                duration={3000}
                style={{ backgroundColor: Colors.black, elevation: 7, zIndex: 99 }}
            >
                <Text color={Colors.white}>{snackBarMessage}</Text>
            </Snackbar>
        </SafeAreaView>
    )
}

export default HiringManagerListScreen

const styles = StyleSheet.create({
    img: {
        marginRight: 10,
    },
    cardContainer: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderColor: Colors.light,
        elevation: 3,
        marginVertical: 2,
    },
    cardInfoContainer: {
        justifyContent: 'center',
        flex: 1,
    },
})
