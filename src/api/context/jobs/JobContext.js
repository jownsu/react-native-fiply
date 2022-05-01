import React, { useContext, useReducer, createContext } from 'react'
import AuthContext from '../auth/AuthContext'
import JobReducer from './JobReducer'
import api from '../../api'
import { Alert } from 'react-native'
const JobContext = createContext()

export const JobProvider = ({ children }) => {
    const { user } = useContext(AuthContext)

    const initialState = {
        job: {},
        jobs: {
            data: [],
            links: {
                next: '',
            },
            meta: {
                total: 0,
            },
        },
        savedJobs: {
            data: [],
            links: {
                next: '',
            },
            meta: {
                total: 0,
            },
        },
        appliedJobs: {
            data: [],
            links: {
                next: '',
            },
            meta: {
                total: 0,
            },
        },
        questionnaire: [],
        loading: false,
    }
    const [state, dispatch] = useReducer(JobReducer, initialState)

    const getJob = async (id) => {
        setLoading()
        await api({ token: user.token })
            .get(`/jobs/${id}`)
            .then((res) => dispatch({ type: 'GET_JOB', payload: res.data.data }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const getQuestionaire = async (id) => {
        setLoading()
        await api({ token: user.token })
            .get(`/jobs/${id}/questions`)
            .then((res) => dispatch({ type: 'SET_QUESTIONNAIRE', payload: res.data.data }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const getJobs = async () => {
        setLoading()
        await api({ token: user.token })
            .get('/jobs')
            .then((res) => dispatch({ type: 'GET_JOBS', payload: res.data }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const moreJobs = async (reset = false) => {
        if (state.jobs.links.next) {
            setLoading()
            await api({ token: user.token })
                .get(state.jobs.links.next)
                .then((res) => {
                    reset
                        ? dispatch({ type: 'GET_JOBS', payload: res.data })
                        : dispatch({ type: 'MORE_JOBS', payload: res.data })
                })
                .catch((err) => console.log(err))
                .finally(() => stopLoading())
        }
    }

    const getSavedJobs = async () => {
        setLoading()
        await api({ token: user.token })
            .get('/me/savedJobs')
            .then((res) => dispatch({ type: 'GET_SAVED_JOBS', payload: res.data }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const moreSavedJobs = async (reset = false) => {
        if (state.savedJobs.links.next) {
            setLoading()
            await api({ token: user.token })
                .get(state.savedJobs.links.next)
                .then((res) => {
                    reset
                        ? dispatch({ type: 'GET_SAVED_JOBS', payload: res.data })
                        : dispatch({ type: 'MORE_SAVED_JOBS', payload: res.data })
                })
                .catch((err) => console.log(err))
                .finally(() => stopLoading())
        }
    }

    const getAppliedJobs = async () => {
        setLoading()
        await api({ token: user.token })
            .get('/me/appliedJobs')
            .then((res) => dispatch({ type: 'GET_APPLIED_JOBS', payload: res.data }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const moreAppliedJobs = async (reset = false) => {
        if (state.appliedJobs.links.next) {
            setLoading()
            await api({ token: user.token })
                .get(state.appliedJobs.links.next)
                .then((res) => {
                    reset
                        ? dispatch({ type: 'GET_APPLIED_JOBS', payload: res.data })
                        : dispatch({ type: 'MORE_APPLIED_JOBS', payload: res.data })
                })
                .catch((err) => console.log(err))
                .finally(() => stopLoading())
        }
    }

    const toggleSavedJob = async (id, action = 'save') => {
        setLoading()

        let isSave = true

        await api({ token: user.token })
            .post(`/jobs/${action}`, { job_id: id })
            .then((res) => {
                if (action == 'save') {
                    isSave = res.data.data
                }

                if (action == 'unSave') {
                    isSave = !res.data.data
                }

                dispatch({
                    type: 'TOGGLE_SAVED_JOB',
                    payload: { data: isSave, id },
                })
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const toggleAppliedJob = async (id, action = 'apply') => {
        setLoading()

        let isapplied = true

        await api({ token: user.token })
            .post(`/jobs/${action}`, { job_id: id })
            .then((res) => {
                if (action == 'apply') {
                    isapplied = res.data.data
                }

                if (action == 'unApply') {
                    isapplied = !res.data.data
                }

                dispatch({
                    type: 'TOGGLE_APPLIED_JOB',
                    payload: { data: isapplied, id },
                })
            })
            .catch((err) => Alert.alert('Not Available', err.message))
            .finally(() => stopLoading())
    }

    const removeAppliedJob = async (id) => {
        setLoading()
        await api({ token: user.token })
            .post(`/jobs/apply`, { job_id: id })
            .then((res) =>
                dispatch({
                    type: 'REMOVE_APPLIED_JOB',
                    payload: { data: res.data.data, id },
                })
            )
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const removeSavedJob = async (id) => {
        setLoading()
        await api({ token: user.token })
            .post(`/jobs/unSave`, { job_id: id })
            .then((res) =>
                dispatch({
                    type: 'REMOVE_SAVED_JOB',
                    payload: { data: res.data.data, id },
                })
            )
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    const stopLoading = () => dispatch({ type: 'STOP_LOADING' })

    return (
        <JobContext.Provider
            value={{
                ...state,
                getJobs,
                moreJobs,
                getQuestionaire,
                getSavedJobs,
                moreSavedJobs,
                getAppliedJobs,
                moreAppliedJobs,
                getJob,
                toggleSavedJob,
                toggleAppliedJob,
                removeAppliedJob,
                removeSavedJob,
            }}
        >
            {children}
        </JobContext.Provider>
    )
}

export default JobContext
