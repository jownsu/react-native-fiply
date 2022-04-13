import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import { Avatar, Snackbar } from 'react-native-paper'
import {
    Text,
    SafeAreaView,
    Container,
    SecondaryButton,
    TextInput,
    Dropdown,
} from '../../components/FiplyComponents'
import EditEducationalBackgroundAction from '../../components/modals/profile/EditEducationalBackgroundAction'
import CardInfo from '../../components/profile/CardInfo'
import ProfileContext from '../../../api/context/profile/ProfileContext'
import Header from '../../components/headers/Header'
import Colors from '../../../utils/Colors'
import Confirmation from '../../components/dialog/Confirmation'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

const EditEducationalBackgroundScreen = ({ navigation }) => {
    const {
        educationalBackgrounds,
        getEducationalBackgrounds,
        updateEducationalBackground,
        createEducationalBackground,
        deleteEducationalBackground,
        snackBarMessage,
        hideSnackBar,
        loading,
    } = useContext(ProfileContext)
    const [showEditModal, setShowEditModal] = useState({ modal: false, type: '' })
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [selectedEducationalBackground, setSelectedEducationalBackground] = useState({})

    useEffect(() => {
        if (educationalBackgrounds.length == 0) {
            getEducationalBackgrounds()
        }
    }, [])

    const renderItem = ({ item }) => (
        <CardInfo
            key={item.id}
            headers={['University', 'Degree', 'Field of Study', 'Starting Date', 'Completion Date']}
            infos={{
                university: item.university,
                degree: item.degree,
                fieldOfStudy: item.field_of_study,
                startingDate: item.starting_date,
                completionDate: item.completion_date,
            }}
            showAction
            onEditPress={() => {
                setSelectedEducationalBackground(item)
                setShowEditModal({ modal: true, type: 'edit' })
            }}
            onDeletePress={() => {
                setSelectedEducationalBackground(item)
                setShowDeleteConfirmation(true)
            }}
        />
    )

    return (
        <SafeAreaView statusBarColor={Colors.white} flex>
            <Header
                title={'Edit Educational Background'}
                style={{ backgroundColor: Colors.white }}
                onBackPress={() => navigation.pop()}
                rightIcon={() => (
                    <MaterialIcons
                        name="add"
                        size={24}
                        color={Colors.primary}
                        onPress={() => setShowEditModal({ modal: true, type: 'add' })}
                    />
                )}
            />
            <Container padding={10}>
                <FlatList data={educationalBackgrounds} renderItem={renderItem} />
            </Container>

            {/* MODAL */}

            <EditEducationalBackgroundAction
                visible={showEditModal.modal}
                type={showEditModal.type}
                onDismiss={() => {
                    setSelectedEducationalBackground({})
                    setShowEditModal({ modal: false, type: '' })
                }}
                data={selectedEducationalBackground}
                onUpdatePress={(values) => {
                    updateEducationalBackground(values)
                    setShowEditModal({ modal: false, type: '' })
                    setSelectedEducationalBackground({})
                }}
                onAddPress={(values) => {
                    createEducationalBackground(values)
                    setShowEditModal({ modal: false, type: '' })
                    setSelectedEducationalBackground({})
                }}
                loading={loading}
            />

            <Confirmation
                visible={showDeleteConfirmation}
                dialogText="Are you sure to delete this educational background? It cannot be undone."
                onDismiss={() => setShowDeleteConfirmation(false)}
                onOkPress={() => {
                    deleteEducationalBackground(selectedEducationalBackground.id)
                    setShowDeleteConfirmation(false)
                    setSelectedEducationalBackground({})
                }}
            />

            <Snackbar
                visible={snackBarMessage ? true : false}
                onDismiss={() => hideSnackBar()}
                duration={3000}
                style={{ backgroundColor: Colors.black }}
            >
                <Text color={Colors.white}>{snackBarMessage}</Text>
            </Snackbar>
        </SafeAreaView>
    )
}

export default EditEducationalBackgroundScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        marginVertical: 5,
        paddingVertical: 25,
        paddingHorizontal: 10,
    },
    headerContainer: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})
