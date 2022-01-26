import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView, Container, Text } from '../components/FiplyComponents'
import Header from '../components/headers/Header'
import Colors from '../../utils/Colors'
import { MaterialIcons } from '@expo/vector-icons'

const EditProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView flex statusBarColor={Colors.white} >
        <Header
            title='Edit Profile'
            style={{ backgroundColor: Colors.white }}
            onBackPress={() => navigation.pop()}
        />
        <Container>
            <View style={styles.editContainer}>
                <Text>About</Text>
                <View style={styles.editActionContainer}>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => {}}>
                        <MaterialIcons name="add-circle-outline" size={24} color={Colors.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => {}} >
                        <MaterialIcons name="edit" size={24} color={Colors.black} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text>Add or Edit About Sections</Text>

            <View style={styles.editContainer}>
                <Text>Activity</Text>
                <View style={styles.editActionContainer}>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => {}}>
                        <MaterialIcons name="add-circle-outline" size={24} color={Colors.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => {}} >
                        <MaterialIcons name="edit" size={24} color={Colors.black} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text>Add or Edit Activity Sections</Text>

            <View style={styles.editContainer}>
                <Text>About</Text>
                <View style={styles.editActionContainer}>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => {}}>
                        <MaterialIcons name="add-circle-outline" size={24} color={Colors.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => {}} >
                        <MaterialIcons name="edit" size={24} color={Colors.black} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text>Add or Edit About Sections</Text>

            <View style={styles.editContainer}>
                <Text>Background</Text>
                <View style={styles.editActionContainer}>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => {}}>
                        <MaterialIcons name="add-circle-outline" size={24} color={Colors.black} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionBtn} onPress={() => {}} >
                        <MaterialIcons name="edit" size={24} color={Colors.black} />
                    </TouchableOpacity>
                </View>
            </View>
            <Text>Add or Edit Background Sections</Text>

        </Container>
    </SafeAreaView>
);
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    editContainer:{
        flexDirection: 'row',
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.light
    },
    editActionContainer:{
        flexDirection: 'row',
    },
    actionBtn:{
        paddingHorizontal: 3
    }
});
