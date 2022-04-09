import React, { useState, useContext, useReducer, createContext } from 'react'
import AuthContext from '../auth/AuthContext'
import { FollowProvider } from '../follow/FollowContext'
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

    const config = {
        onUploadProgress: function (progressEvent) {
            const { loaded, total } = progressEvent

            let percent = Math.floor((loaded * 100) / total)

            console.log(percent)
        },
    }

    const [state, dispatch] = useReducer(ProfileReducer, initialState)
    const [snackBarMessage, setSnackBarMessage] = useState(null)

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

    const createExperience = async (data, setDispatch = false) => {
        setLoading()
        await api({ token: user.token })
            .post(`/experiences`, data)
            .then((res) => {
                setDispatch ?? dispatch({ type: 'SET_EXPERIENCE', payload: res.data.data })
            })
            .catch((err) => console.log(err))
    }

    const createEducationalBackground = async (data, setDispatch = false) => {
        setLoading()
        await api({ token: user.token })
            .post(`/educationalBackgrounds`, data)
            .then((res) => {
                setDispatch ??
                    dispatch({ type: 'SET_EDUCATIONAL_BACKGROUND', payload: res.data.data })
            })
            .catch((err) => console.log(err))
    }

    const uploadResume = async (doc, setDispatch = false) => {
        setLoading()

        let fd = new FormData()

        fd.append('resume', {
            uri: doc,
            type: mime.getType(doc),
            name: doc.split('/').pop(),
        })

        fd.append('_method', 'PUT')

        await api({ token: user.token })
            .post('/uploadResume', fd, config)
            .then((res) => {
                setDispatch ?? dispatch({ type: 'SET_RESUME', payload: res.data })
            })
            .catch((err) => console.log(err))
    }

    const uploadAvatar = async (img) => {
        setLoading()

        let fd = new FormData()

        fd.append('avatar', {
            uri: img,
            type: mime.getType(img),
            name: img.split('/').pop(),
        })

        fd.append('_method', 'PUT')

        await api({ token: user.token })
            .post('/uploadAvatar', fd, config)
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

        fd.append('cover', {
            uri: img,
            type: mime.getType(img),
            name: img.split('/').pop(),
        })

        fd.append('_method', 'PUT')

        await api({ token: user.token })
            .post('/uploadCover', fd, config)
            .then((res) => dispatch({ type: 'UPDATE_COVER', payload: res.data.data }))
            .catch((err) => console.log(err))
    }

    const follow = async () => {
        await api({ token: user.token })
            .post('/follow', { user_id: state.userInfo.id })
            .then((res) => {
                if (res.data.data) {
                    dispatch({ type: 'SET_TO_PENDING' })
                }
                setSnackBarMessage(res.data.message)
            })
            .catch((err) => setSnackBarMessage(err.message))
    }

    const unFollow = async () => {
        await api({ token: user.token })
            .post('/unFollow', { user_id: state.userInfo.id })
            .then((res) => {
                if (res.data.data) {
                    dispatch({ type: 'SET_TO_FOLLOW' })
                }
                setSnackBarMessage(res.data.message)
            })
            .catch((err) => setSnackBarMessage(err.message))
    }

    const cancelFollowRequest = async () => {
        await api({ token: user.token })
            .post('/unFollow', { user_id: state.userInfo.id })
            .then((res) => {
                if (res.data.data) {
                    dispatch({ type: 'SET_TO_FOLLOW' })
                    setSnackBarMessage('Cancelled follow request')
                }
            })
            .catch((err) => setSnackBarMessage(err.message))
    }
    const hideSnackBar = () => setSnackBarMessage(null)

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    return (
        <ProfileContext.Provider
            value={{
                ...state,
                getUserInfo,
                getExperiences,
                getEducationalBackgrounds,
                createEducationalBackground,
                createExperience,
                uploadResume,
                uploadAvatar,
                uploadCover,
                follow,
                unFollow,
                cancelFollowRequest,
                snackBarMessage,
                hideSnackBar,
            }}
        >
            <FollowProvider>{children}</FollowProvider>
        </ProfileContext.Provider>
    )
}

export default ProfileContext
