import React, { useContext, useReducer, createContext, useState } from 'react'
import AuthContext from '../../auth/AuthContext'
import DashboardReducer from './DashboardReducer'
import mime from 'mime'

import api from '../../../api'

const DashboardContext = createContext()

export const DashboardProvider = ({ children }) => {
    const { user } = useContext(AuthContext)

    const initialState = {
        total_hiring_manager: 0,
        total_job_posts: 0,
        loading: false,
    }
    const [state, dispatch] = useReducer(DashboardReducer, initialState)
    const [snackBarMessage, setSnackBarMessage] = useState(null)

    const getDashboard = async () => {
        setLoading()
        await api({ token: user.token })
            .get('/dashboard')
            .then((res) => dispatch({ type: 'SET_DASHBOARD', payload: res.data.data }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const createHiringManager = async (data, callback = () => {}) => {
        setLoading()

        let fd = new FormData()

        if (data.avatar) {
            fd.append('avatar', {
                uri: data.avatar,
                type: mime.getType(data.avatar),
                name: data.avatar.split('/').pop(),
            })
        }

        fd.append('firstname', data.firstname)
        fd.append('lastname', data.lastname)
        fd.append('email', data.email)
        fd.append('contact_no', data.contact_no)
        fd.append('code', data.code)

        await api({ token: user.token, hiring_token: user.companyToken, hiring_id: user.company })
            .post('/hiringManagers', fd)
            .then((res) => {
                dispatch({ type: 'ADD_HIRING_MANAGER' })
                setSnackBarMessage('Hiring Manager Added')
                callback()
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    const stopLoading = () => dispatch({ type: 'STOP_LOADING' })

    const hideSnackBar = () => setSnackBarMessage(null)

    return (
        <DashboardContext.Provider
            value={{
                ...state,
                createHiringManager,
                getDashboard,
                snackBarMessage,
                hideSnackBar,
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
}

export default DashboardContext
