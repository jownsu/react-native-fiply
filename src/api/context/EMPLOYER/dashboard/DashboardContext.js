import React, { useContext, useReducer, createContext, useState } from 'react'
import AuthContext from '../../auth/AuthContext'
import DashboardReducer from './DashboardReducer'
import mime from 'mime'

import api from '../../../api'

const DashboardContext = createContext()

export const DashboardProvider = ({ children }) => {
    const { user, hiringManager } = useContext(AuthContext)

    const initialState = {
        total_hiring_manager: 0,
        total_job_posts: 0,
        questionList: [],
        hiringManagers: [],
        hiringManager: {},
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

    const getHiringManagers = async () => {
        setLoading()
        await api({ token: user.token })
            .get('/me/hiringManagers')
            .then((res) => dispatch({ type: 'SET_HIRING_MANAGERS', payload: res.data.data }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const getHiringManager = async (id) => {
        setLoading()
        await api({ token: user.token })
            .get(`/me/hiringManagers/${id}`)
            .then((res) => {
                console.log(res.data.data)
                dispatch({ type: 'SET_HIRING_MANAGER', payload: res.data.data })
            })
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

        await api({
            token: user.token,
            hiring_token: user.companyToken,
            hiring_id: user.company,
        })
            .post('/ea/hiringManagers', fd)
            .then((res) => {
                dispatch({ type: 'ADD_HIRING_MANAGER', payload: res.data.data })
                setSnackBarMessage('Hiring Manager Added')
                callback()
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const updateHiringManager = async (id, data, callback = () => {}) => {
        setLoading()

        let fd = new FormData()

        if (data.avatar) {
            fd.append('avatar', {
                uri: data.avatar,
                type: mime.getType(data.avatar),
                name: data.avatar.split('/').pop(),
            })
        }

        fd.append('_method', 'PUT')
        fd.append('firstname', data.firstname)
        fd.append('lastname', data.lastname)
        fd.append('email', data.email)
        fd.append('contact_no', data.contact_no)
        fd.append('code', data.code)

        await api({
            token: user.token,
            hiring_token: user.companyToken,
            hiring_id: user.company,
        })
            .post(`/ea/hiringManagers/${id}`, fd)
            .then((res) => {
                console.log(res.data.data)
                dispatch({ type: 'UPDATE_HIRING_MANAGER', payload: res.data.data })
                setSnackBarMessage('Hiring Manager Updated')
                callback()
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const deleteHiringManager = async (id, callback = () => {}) => {
        setLoading()
        await api({
            token: user.token,
            hiring_token: user.companyToken,
            hiring_id: user.company,
        })
            .delete(`/ea/hiringManagers/${id}`)
            .then((res) => {
                dispatch({ type: 'DELETE_HIRING_MANAGER', payload: id })
                setSnackBarMessage('Hiring Manager Updated')
                callback()
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const createJob = async (data, callback = () => {}) => {
        setLoading()

        await api({
            token: user.token,
            hiring_token: hiringManager.token,
            hiring_id: hiringManager.id,
        })
            .post('/hm/jobs', data)
            .then((res) => {
                dispatch({ type: 'ADD_JOB' })
                setSnackBarMessage('Job Posted')
                callback()
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const addQuestion = (data) => dispatch({ type: 'ADD_QUESTION', payload: data })

    const removeQuestion = (data) => dispatch({ type: 'REMOVE_QUESTION', payload: data })

    const clearQuestion = (data) => dispatch({ type: 'CLEAR_QUESTION', payload: data })

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    const stopLoading = () => dispatch({ type: 'STOP_LOADING' })

    const hideSnackBar = () => setSnackBarMessage(null)

    return (
        <DashboardContext.Provider
            value={{
                ...state,
                createHiringManager,
                updateHiringManager,
                createJob,
                getDashboard,
                getHiringManagers,
                getHiringManager,
                deleteHiringManager,
                addQuestion,
                removeQuestion,
                clearQuestion,
                snackBarMessage,
                hideSnackBar,
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
}

export default DashboardContext
