import React, { useState, useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import api from '../api'

const useJob = () => {
    const { user } = useContext(AuthContext)
    const [jobs, setJobs] = useState([])
    const [nextPath, setNextPath] = useState('')
    const [loading, setLoading] = useState(false)

    const getJobs = async () => {
        setLoading(true)
        await api({ token: user.token })
            .get('/jobs')
            .then((res) => {
                let data = res.data.data
                setJobs(data)
                setNextPath(res.data.links.next)
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    const moreJobs = async (reset = false) => {
        if (nextPath) {
            setLoading(true)
            await api({ token: user.token })
                .get(nextPath)
                .then((res) => {
                    let data = res.data.data
                    reset
                        ? setJobs(data)
                        : setJobs((prevJobs) => [...prevJobs, ...data])
                    setNextPath(res.data.links.next)
                })
                .catch((err) => console.log(err))
                .finally(() => setLoading(false))
        }
    }

    const getSingleJob = async (id) => {
        setLoading(true)
        await api({ token: user.token })
            .get(`/jobs/${id}`)
            .then((res) => setJobs(res.data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return {
        jobs,
        getJobs,
        moreJobs,
        getSingleJob,
        loading,
        setLoading,
    }
}

export default useJob
