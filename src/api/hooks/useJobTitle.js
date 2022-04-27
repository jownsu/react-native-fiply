import React, { useState, useContext } from 'react'
import AuthContext from '../context/auth/AuthContext'
import api from '../api'

const useJobTitle = () => {
    const { user } = useContext(AuthContext)
    const [jobTitles, setJobTitles] = useState([])
    const [loading, setLoading] = useState(false)

    const getJobTitles = async (search = '') => {
        setLoading(true)
        await api()
            .get(`/jobTitles?limit=5&search=${search}`)
            .then((res) => setJobTitles(res.data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return {
        jobTitles,
        loading,
        getJobTitles,
    }
}

export default useJobTitle
