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
        jobPreference: {},
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
                        account_level: profileData.account_level,
                    }

                    setUser({ ...user, ...userData })

                    SecureStore.getItemAsync('user').then((response) => {
                        let storeUser = JSON.parse(response)
                        storeUser = { ...storeUser, ...userData }
                        SecureStore.setItemAsync('user', JSON.stringify(storeUser))
                    })
                }

                dispatch({ type: 'GET_USER_INFO', payload: profileData })
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const updateProfile = async (data) => {
        setLoading()
        await api({ token: user.token })
            .put(`/me`, {
                ...data,
                firstname: data.firstname ? data.firstname : state.userInfo.firstname,
                middlename: data.middlename ? data.middlename : state.userInfo.middlename,
                lastname: data.lastname ? data.lastname : state.userInfo.lastname,
            })
            .then((res) => {
                dispatch({ type: 'UPDATE_PROFILE', payload: data })
                setUser({ ...user, ...data })

                SecureStore.getItemAsync('user').then((response) => {
                    let storeUser = JSON.parse(response)
                    storeUser = { ...storeUser, ...data }
                    SecureStore.setItemAsync('user', JSON.stringify(storeUser))
                })

                setSnackBarMessage('Updated')
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const getExperiences = async (id = 'me') => {
        setLoading()
        await api({ token: user.token })
            .get(`/${id}/experiences`)
            .then((res) => dispatch({ type: 'GET_EXPERIENCES', payload: res.data.data }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const getEducationalBackgrounds = async (id = 'me') => {
        setLoading()
        await api({ token: user.token })
            .get(`/${id}/educationalBackgrounds`)
            .then((res) =>
                dispatch({ type: 'GET_EDUCATIONAL_BACKGROUNDS', payload: res.data.data })
            )
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const getJobPreference = async (id = 'me') => {
        setLoading()
        await api({ token: user.token })
            .get(`/${id}/jobPreferences`)
            .then((res) => dispatch({ type: 'GET_JOB_PREFERENCE', payload: res.data.data }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const updateJobPreference = async (data) => {
        setLoading()
        await api({ token: user.token })
            .put(`/jobPreferences/${state.jobPreference.id}`, data)
            .then((res) => {
                dispatch({ type: 'UPDATE_JOB_PREFERENCE', payload: res.data.data })
                setSnackBarMessage('Updated')
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const createExperience = async (data) => {
        setLoading()
        await api({ token: user.token })
            .post(`/experiences`, data)
            .then((res) => {
                dispatch({ type: 'ADD_EXPERIENCE', payload: res.data.data })
                setSnackBarMessage('Addded')
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const updateExperience = async (data) => {
        setLoading()
        await api({ token: user.token })
            .put(`/experiences/${data.id}`, data)
            .then((res) => {
                dispatch({ type: 'UPDATE_EXPERIENCE', payload: res.data.data })
                setSnackBarMessage('Updated')
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const deleteExperience = async (id) => {
        setLoading()
        await api({ token: user.token })
            .delete(`/experiences/${id}`)
            .then((res) => {
                dispatch({ type: 'DELETE_EXPERIENCE', payload: id })
                setSnackBarMessage('Deleted')
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const createEducationalBackground = async (data) => {
        setLoading()
        await api({ token: user.token })
            .post(`/educationalBackgrounds`, data)
            .then((res) => {
                dispatch({ type: 'ADD_EDUCATIONAL_BACKGROUND', payload: res.data.data })
                setSnackBarMessage('Added')
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const updateEducationalBackground = async (data) => {
        setLoading()
        await api({ token: user.token })
            .put(`/educationalBackgrounds/${data.id}`, data)
            .then((res) => {
                dispatch({ type: 'UPDATE_EDUCATIONAL_BACKGROUND', payload: res.data.data })
                setSnackBarMessage('Updated')
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const deleteEducationalBackground = async (id) => {
        setLoading()
        await api({ token: user.token })
            .delete(`/educationalBackgrounds/${id}`)
            .then((res) => {
                dispatch({ type: 'DELETE_EDUCATIONAL_BACKGROUND', payload: id })
                setSnackBarMessage('Deleted')
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const uploadResume = async (doc) => {
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
                dispatch({ type: 'SET_RESUME', payload: res.data })
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
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
            .finally(() => stopLoading())
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
            .finally(() => stopLoading())
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
            .finally(() => stopLoading())
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
            .finally(() => stopLoading())
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
            .finally(() => stopLoading())
    }

    const setAudience = async (data) => {
        await api({ token: user.token })
            .put('/me/setAudience', { is_public: data })
            .then((res) => {
                dispatch({
                    type: 'SET_AUDIENCE',
                    payload: data,
                })
                setSnackBarMessage(`Audience Updated to ${data ? 'Public' : 'Only Followers'}`)
            })
            .catch((err) => setSnackBarMessage(err.message))
            .finally(() => stopLoading())
    }

    const hideSnackBar = () => setSnackBarMessage(null)

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    const stopLoading = () => dispatch({ type: 'STOP_LOADING' })

    return (
        <ProfileContext.Provider
            value={{
                ...state,
                getUserInfo,
                getExperiences,
                getEducationalBackgrounds,
                getJobPreference,
                createEducationalBackground,
                createExperience,
                updateProfile,
                updateJobPreference,
                updateExperience,
                deleteExperience,
                updateEducationalBackground,
                deleteEducationalBackground,
                uploadResume,
                uploadAvatar,
                uploadCover,
                follow,
                unFollow,
                cancelFollowRequest,
                setAudience,
                snackBarMessage,
                hideSnackBar,
            }}
        >
            <FollowProvider>{children}</FollowProvider>
        </ProfileContext.Provider>
    )
}

export default ProfileContext
