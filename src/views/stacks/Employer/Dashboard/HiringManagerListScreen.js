import { StyleSheet, View, FlatList, Image } from 'react-native'
import React from 'react'
import { Text, Container, SafeAreaView } from '../../../components/FiplyComponents'
import { Avatar } from 'react-native-paper'
import Header from '../../../components/headers/Header'
import SearchBar from '../../../components/headers/SearchBar'
import { MaterialIcons } from '@expo/vector-icons'
import Colors from '../../../../utils/Colors'
import HiringManagerItem from '../../../components/lists/HiringManagerItem'

const HiringManagerListScreen = ({ navigation }) => {
    const renderItem = ({ item }) => (
        <HiringManagerItem
            item={item}
            onItemPress={() => navigation.navigate('HiringManagerScreen')}
        />
    )

    return (
        <SafeAreaView statusBarColor={Colors.white}>
            <Header
                title={'Hiring Managers'}
                style={{ backgroundColor: Colors.white }}
                onBackPress={() => navigation.pop()}
                rightIcon={() => <MaterialIcons name="menu" size={24} color={Colors.black} />}
            />
            <SearchBar style={{ marginVertical: 10 }} />

            <FlatList
                data={[
                    {
                        id: 1,
                        name: 'Margarette De Etits',
                        email: 'margarette@gmail.com',
                        avatar: require('../../../../assets/img/members/hular.jpg'),
                    },
                    {
                        id: 2,
                        name: 'Rold de Susej',
                        email: 'rold@gmail.com',
                        avatar: require('../../../../assets/img/members/tumanon.jpg'),
                    },
                ]}
                renderItem={renderItem}
            />
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
