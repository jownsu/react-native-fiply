import React, { useContext, useReducer, createContext, useState } from 'react'
import AuthContext from '../../auth/AuthContext'
import JobReducer from './JobReducer'

import api from '../../../api'

const JobContext = createContext()

export const JobProvider = ({ children }) => {
    const { user, hiringManager } = useContext(AuthContext)

    const initialState = {
        jobs: {
            data: [],
            links: {
                next: '',
            },
            meta: {
                total: 0,
            },
        },
        job: {},
        applicants: {
            data: [],
            links: {
                next: '',
            },
            meta: {
                total: 0,
            },
        },
        response: {
            experiences: [],
            educational_backgrounds: [],
            job_responses: [],
        },
        loading: false,
    }
    const [state, dispatch] = useReducer(JobReducer, initialState)
    const [snackBarMessage, setSnackBarMessage] = useState(null)

    const getJobs = async () => {
        setLoading()
        await api({
            token: user.token,
            hiring_token: hiringManager.token,
            hiring_id: hiringManager.id,
        })
            .get('/hm/jobs')
            .then((res) => dispatch({ type: 'SET_JOBS', payload: res.data }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const moreJobs = async (reset = false) => {
        if (state.jobs.links.next) {
            setLoading()
            await api({
                token: user.token,
                hiring_token: hiringManager.token,
                hiring_id: hiringManager.id,
            })
                .get(state.jobs.links.next)
                .then((res) => {
                    reset
                        ? dispatch({ type: 'SET_JOBS', payload: res.data })
                        : dispatch({ type: 'MORE_JOBS', payload: res.data })
                })
                .catch((err) => console.log(err))
                .finally(() => stopLoading())
        }
    }

    const getJobDetails = async (id) => {
        setLoading()
        await api({
            token: user.token,
            hiring_token: hiringManager.token,
            hiring_id: hiringManager.id,
        })
            .get(`/hm/jobs/${id}`)
            .then((res) => dispatch({ type: 'SET_JOB_DETAILS', payload: res.data.data }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const getApplicants = async (id) => {
        setLoading()
        await api({
            token: user.token,
            hiring_token: hiringManager.token,
            hiring_id: hiringManager.id,
        })
            .get(`/hm/jobs/${id}/applicants`)
            .then((res) => {
                dispatch({ type: 'SET_APPLICANTS', payload: res.data })
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const moreApplicants = async (reset = false) => {
        if (state.applicants.links.next) {
            setLoading()
            await api({
                token: user.token,
                hiring_token: hiringManager.token,
                hiring_id: hiringManager.id,
            })
                .get(state.applicants.links.next)
                .then((res) => {
                    reset
                        ? dispatch({ type: 'SET_APPLICANTS', payload: res.data })
                        : dispatch({ type: 'MORE_APPLICANTS', payload: res.data })
                })
                .catch((err) => console.log(err))
                .finally(() => stopLoading())
        }
    }

    const getApplicantResponse = async (jobId, applyId) => {
        setLoading()
        await api({
            token: user.token,
            hiring_token: hiringManager.token,
            hiring_id: hiringManager.id,
        })
            .get(`/hm/jobs/${jobId}/response/${applyId}`)
            .then((res) => {
                console.log(res.data.data)
                dispatch({ type: 'SET_APPLICANT_RESPONSE', payload: res.data.data })
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    const stopLoading = () => dispatch({ type: 'STOP_LOADING' })

    const hideSnackBar = () => setSnackBarMessage(null)

    return (
        <JobContext.Provider
            value={{
                ...state,
                getJobs,
                moreJobs,
                getJobDetails,
                getApplicants,
                moreApplicants,
                getApplicantResponse,
                snackBarMessage,
                hideSnackBar,
            }}
        >
            {children}
        </JobContext.Provider>
    )
}

export default JobContext
