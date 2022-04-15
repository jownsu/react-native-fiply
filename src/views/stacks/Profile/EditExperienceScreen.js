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
import Confirmation from '../../components/dialog/Confirmation'

import EditExperienceAction from '../../components/modals/profile/EditExperienceAction'
import CardInfo from '../../components/profile/CardInfo'
import ProfileContext from '../../../api/context/profile/ProfileContext'
import Header from '../../components/headers/Header'
import Colors from '../../../utils/Colors'
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons'

const EditExperienceScreen = ({ navigation }) => {
    const {
        experiences,
        getExperiences,
        updateExperience,
        createExperience,
        deleteExperience,
        snackBarMessage,
        hideSnackBar,
        userInfo,
        loading,
    } = useContext(ProfileContext)
    const [showEditModal, setShowEditModal] = useState({ modal: false, type: '' })
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [selectedExperience, setSelectedExperience] = useState({})

    useEffect(() => {
        if (experiences.length == 0) {
            getExperiences()
        }
    }, [])

    const renderItem = ({ item }) => (
        <CardInfo
            key={item.id}
            headers={[
                'Company',
                'Location',
                'Title',
                'Employment Type',
                'Starting Date',
                'Completion Date',
            ]}
            infos={{
                company: item.company,
                location: item.location,
                title: item.job_title,
                employmentType: item.employment_type,
                startingDate: item.starting_date,
                completionDate: item.completion_date,
            }}
            showAction={userInfo.is_me}
            onEditPress={() => {
                setSelectedExperience(item)
                setShowEditModal({ modal: true, type: 'edit' })
            }}
            onDeletePress={() => {
                setSelectedExperience(item)
                setShowDeleteConfirmation(true)
            }}
        />
    )

    return (
        <SafeAreaView statusBarColor={Colors.white}>
            <Header
                title={userInfo.is_me ? 'Edit Work Experience' : 'Work Experiences'}
                style={{ backgroundColor: Colors.white }}
                onBackPress={() => navigation.pop()}
                rightIcon={
                    userInfo.is_me
                        ? () => (
                              <MaterialIcons
                                  name="add"
                                  size={24}
                                  color={Colors.primary}
                                  onPress={() => setShowEditModal({ modal: true, type: 'add' })}
                              />
                          )
                        : null
                }
            />
            <Container padding={10}>
                <FlatList data={experiences} renderItem={renderItem} />
            </Container>
            <EditExperienceAction
                visible={showEditModal.modal}
                type={showEditModal.type}
                onDismiss={() => {
                    setSelectedExperience({})
                    setShowEditModal({ modal: false, type: '' })
                }}
                data={selectedExperience}
                onUpdatePress={(values) => {
                    updateExperience(values)
                    setShowEditModal({ modal: false, type: '' })
                    setSelectedExperience({})
                }}
                onAddPress={(values) => {
                    createExperience(values)
                    setShowEditModal({ modal: false, type: '' })
                    setSelectedExperience({})
                }}
                loading={loading}
            />

            <Confirmation
                visible={showDeleteConfirmation}
                dialogText="Are you sure to delete this experience? It cannot be undone."
                onDismiss={() => setShowDeleteConfirmation(false)}
                onOkPress={() => {
                    deleteExperience(selectedExperience.id)
                    setShowDeleteConfirmation(false)
                    setSelectedExperience({})
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

export default EditExperienceScreen

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
