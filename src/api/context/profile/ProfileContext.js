import React, { useState, useContext, useReducer, createContext } from 'react'
import AuthContext from '../auth/AuthContext'
import api from '../../api'
import ProfileReducer from './ProfileReducer'
import * as SecureStore from 'expo-secure-store'
import mime from 'mime'

const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
    const { user, setUser } = useContext(AuthContext)

    const initialState = {
        userInfo: {},
        experiences: [],
        educationalBackgrounds: [],
        loading: false,
    }
    const [state, dispatch] = useReducer(ProfileReducer, initialState)

    const getUserInfo = async (id = 'me') => {
        setLoading()
        await api({ token: user.token })
            .get(`/${id}`)
            .then((res) => {
                let profileData = res.data.data

                if (id == 'me') {
                    let userData = {
                        id: profileData.id,
                        fullname: profileData.fullname,
                        status: profileData.status,
                        preview: profileData.preview,
                        avatar: profileData.avatar,
                    }

                    setUser({ ...user, ...userData })
                }

                dispatch({ type: 'GET_USER_INFO', payload: profileData })
            })
            .catch((err) => console.log(err))
    }

    const getExperiences = async (id = 'me') => {
        setLoading()
        await api({ token: user.token })
            .get(`/${id}/experiences`)
            .then((res) => dispatch({ type: 'GET_EXPERIENCES', payload: res.data.data }))
            .catch((err) => console.log(err))
    }

    const getEducationalBackgrounds = async (id = 'me') => {
        setLoading()
        await api({ token: user.token })
            .get(`/${id}/educationalBackgrounds`)
            .then((res) =>
                dispatch({ type: 'GET_EDUCATIONAL_BACKGROUNDS', payload: res.data.data })
            )
            .catch((err) => console.log(err))
    }

    const uploadAvatar = async (img) => {
        setLoading()

        let fd = new FormData()

        const imageUri = 'file:///' + img.split('file:/').join('')
        fd.append('avatar', {
            uri: imageUri,
            type: mime.getType(imageUri),
            name: imageUri.split('/').pop(),
        })

        fd.append('_method', 'PUT')

        await api({ token: user.token })
            .post('/me/uploadAvatar', fd)
            .then((res) => {
                let newAvatar = res.data.data
                setUser({ ...user, avatar: newAvatar })

                SecureStore.getItemAsync('user').then((response) => {
                    let storeUser = JSON.parse(response)
                    storeUser.avatar = newAvatar
                    SecureStore.setItemAsync('user', JSON.stringify(storeUser))
                })
                dispatch({ type: 'UPDATE_AVATAR', payload: res.data.data })
            })
            .catch((err) => console.log(err))
    }

    const uploadCover = async (img) => {
        setLoading()

        let fd = new FormData()

        const imageUri = 'file:///' + img.split('file:/').join('')
        fd.append('cover', {
            uri: imageUri,
            type: mime.getType(imageUri),
            name: imageUri.split('/').pop(),
        })

        fd.append('_method', 'PUT')

        await api({ token: user.token })
            .post('/me/uploadCover', fd)
            .then((res) => dispatch({ type: 'UPDATE_COVER', payload: res.data.data }))
            .catch((err) => console.log(err))
    }

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    return (
        <ProfileContext.Provider
            value={{
                ...state,
                getUserInfo,
                getExperiences,
                getEducationalBackgrounds,
                uploadAvatar,
                uploadCover,
            }}
        >
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileContext
