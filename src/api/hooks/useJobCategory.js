import React, { useState, useContext } from 'react'
import AuthContext from '../context/auth/AuthContext'
import api from '../api'

const useJobCategory = () => {
    const { user } = useContext(AuthContext)
    const [jobCategories, setJobCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const getJobCategories = async () => {
        setLoading(true)
        await api()
            .get(`/jobCategories`)
            .then((res) => setJobCategories(res.data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return {
        jobCategories,
        loading,
        getJobCategories,
    }
}

export default useJobCategory
