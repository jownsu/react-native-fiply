import React, { useState, useContext, useReducer, createContext } from 'react'
import AuthContext from '../auth/AuthContext'
import api from '../../api'
import ProfileReducer from './ProfileReducer'

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
                        description: profileData.description,
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

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    return (
        <ProfileContext.Provider
            value={{
                ...state,
                getUserInfo,
                getExperiences,
                getEducationalBackgrounds,
            }}
        >
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileContext
