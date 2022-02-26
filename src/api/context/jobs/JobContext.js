import React, { useContext, useReducer, createContext } from 'react'
import AuthContext from '../auth/AuthContext'
import JobReducer from './JobReducer'
import api from '../../api'

const JobContext = createContext()

export const JobProvider = ({ children }) => {
    const { user } = useContext(AuthContext)

    const initialState = {
        jobs: [],
        job: {},
        nextPath: '',
        loading: false,
    }
    const [state, dispatch] = useReducer(JobReducer, initialState)

    const getJobs = async () => {
        setLoading()
        await api({ token: user.token })
            .get('/jobs')
            .then((res) => dispatch({ type: 'GET_JOBS', payload: res.data }))
            .catch((err) => console.log(err))
    }

    const moreJobs = async (reset = false) => {
        if (state.nextPath) {
            setLoading()
            await api({ token: user.token })
                .get(state.nextPath)
                .then((res) => {
                    reset
                        ? dispatch({ type: 'GET_JOBS', payload: res.data })
                        : dispatch({ type: 'MORE_JOBS', payload: res.data })
                })
                .catch((err) => console.log(err))
        }
    }

    const getJob = async (id) => {
        setLoading()
        await api({ token: user.token })
            .get(`/jobs/${id}`)
            .then((res) => dispatch({ type: 'GET_JOB', payload: res.data.data }))
            .catch((err) => console.log(err))
    }

    const getSavedJobs = async () => {
        setLoading()
        await api({ token: user.token })
            .get('/me/savedJobs')
            .then((res) => dispatch({ type: 'GET_JOBS', payload: res.data }))
            .catch((err) => console.log(err))
    }

    const getAppliedJobs = async () => {
        setLoading()
        await api({ token: user.token })
            .get('/me/appliedJobs')
            .then((res) => dispatch({ type: 'GET_JOBS', payload: res.data }))
            .catch((err) => console.log(err))
    }

    const toggleSaveJob = async (id, remove = false) => {
        setLoading()
        const dispatchType = remove ? 'REMOVE_SAVED_APPLIED_JOB' : 'TOGGLE_SAVED_JOB'
        await api({ token: user.token })
            .post(`/jobs/${id}/saves`)
            .then((res) =>
                dispatch({
                    type: dispatchType,
                    payload: { data: res.data.data, id },
                })
            )
            .catch((err) => console.log(err))
    }

    const toggleApplyJob = async (id, remove = false) => {
        setLoading()
        const dispatchType = remove ? 'REMOVE_SAVED_APPLIED_JOB' : 'TOGGLE_APPLIED_JOB'
        await api({ token: user.token })
            .post(`/jobs/${id}/applies`)
            .then((res) =>
                dispatch({
                    type: dispatchType,
                    payload: { data: res.data.data, id },
                })
            )
            .catch((err) => console.log(err))
    }

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    return (
        <JobContext.Provider
            value={{
                ...state,
                getJobs,
                moreJobs,
                getJob,
                getSavedJobs,
                getAppliedJobs,
                toggleSaveJob,
                toggleApplyJob,
            }}
        >
            {children}
        </JobContext.Provider>
    )
}

export default JobContext
