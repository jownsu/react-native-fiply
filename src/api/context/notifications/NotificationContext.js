import React, { useContext, useReducer, createContext } from 'react'
import AuthContext from '../auth/AuthContext'
import NotificationReducer from './NotificationReducer'

import api from '../../api'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const { user } = useContext(AuthContext)

    const initialState = {
        notifications: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(NotificationReducer, initialState)

    const getNotifications = async () => {
        setLoading()
        await api({ token: user.token })
            .get(`/me/notifications`)
            .then((res) => {
                dispatch({ type: 'GET_NOTIFICATIONS', payload: res.data.data })
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const deleteNotification = async (id) => {
        setLoading()
        await api({ token: user.token })
            .delete(`/me/notifications/${id}`)
            .then(() => dispatch({ type: 'DELETE_NOTIFICATION', payload: id }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    const stopLoading = () => dispatch({ type: 'STOP_LOADING' })

    return (
        <NotificationContext.Provider
            value={{
                ...state,
                getNotifications,
                deleteNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext
