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
        jobInterviews: {
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
        applicantInterviews: {
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

    const getJobInterviews = async () => {
        setLoading()
        await api({
            token: user.token,
            hiring_token: hiringManager.token,
            hiring_id: hiringManager.id,
        })
            .get('/hm/jobs/interviews')
            .then((res) => dispatch({ type: 'SET_JOB_INTERVIEWS', payload: res.data }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const moreJobInterviews = async (reset = false) => {
        if (state.jobInterviews.links.next) {
            setLoading()
            await api({
                token: user.token,
                hiring_token: hiringManager.token,
                hiring_id: hiringManager.id,
            })
                .get(state.jobInterviews.links.next)
                .then((res) => {
                    reset
                        ? dispatch({ type: 'SET_JOB_INTERVIEWS', payload: res.data })
                        : dispatch({ type: 'MORE_JOB_INTERVIEWS', payload: res.data })
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

    const getApplicantInterviews = async (id) => {
        setLoading()
        await api({
            token: user.token,
            hiring_token: hiringManager.token,
            hiring_id: hiringManager.id,
        })
            .get(`/hm/jobs/${id}/applicantsInterview`)
            .then((res) => {
                dispatch({ type: 'SET_APPLICANT_INTERVIEWS', payload: res.data })
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const moreApplicantInterviews = async (reset = false) => {
        if (state.applicantInterviews.links.next) {
            setLoading()
            await api({
                token: user.token,
                hiring_token: hiringManager.token,
                hiring_id: hiringManager.id,
            })
                .get(state.applicantInterviews.links.next)
                .then((res) => {
                    reset
                        ? dispatch({ type: 'SET_APPLICANT_INTERVIEWS', payload: res.data })
                        : dispatch({ type: 'MORE_APPLICANT_INTERVIEWS', payload: res.data })
                })
                .catch((err) => console.log(err))
                .finally(() => stopLoading())
        }
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
                dispatch({ type: 'SET_APPLICANT_RESPONSE', payload: res.data.data })
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const approveApplicant = async (jobId, applyId, data, callback = () => {}) => {
        setLoading()
        await api({
            token: user.token,
            hiring_token: hiringManager.token,
            hiring_id: hiringManager.id,
        })
            .post(`/hm/jobs/${jobId}/response/${applyId}`, data)
            .then((res) => {
                console.log(res.data.data)
                callback()
                //dispatch({ type: 'SET_APPLICANT_RESPONSE', payload: res.data.data })
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const rejectApplicant = async (jobId, applyId, data = {}, callback = () => {}) => {
        setLoading()
        await api({
            token: user.token,
            hiring_token: hiringManager.token,
            hiring_id: hiringManager.id,
        })
            .post(`/hm/jobs/${jobId}/response/${applyId}/reject`, data)
            .then((res) => {
                console.log(res.data.data)
                callback()
                //dispatch({ type: 'SET_APPLICANT_RESPONSE', payload: res.data.data })
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const hireApplicant = async (jobId, applyId, data = {}, callback = () => {}) => {
        setLoading()
        await api({
            token: user.token,
            hiring_token: hiringManager.token,
            hiring_id: hiringManager.id,
        })
            .post(`/hm/jobs/${jobId}/response/${applyId}/hire`, data)
            .then((res) => {
                console.log(res.data.data)
                callback()
                //dispatch({ type: 'SET_APPLICANT_RESPONSE', payload: res.data.data })
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
                getJobInterviews,
                moreJobInterviews,
                getApplicantResponse,
                getApplicantInterviews,
                moreApplicantInterviews,
                approveApplicant,
                rejectApplicant,
                hireApplicant,
                snackBarMessage,
                hideSnackBar,
            }}
        >
            {children}
        </JobContext.Provider>
    )
}

export default JobContext
