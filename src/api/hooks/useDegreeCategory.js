import React, { useState } from 'react'
import AuthContext from '../context/auth/AuthContext'
import api from '../api'

const useDegreeCategory = () => {
    const [degreeCategories, setDegreeCategories] = useState([])
    const [loading, setLoading] = useState(false)

    const getDegreeCategories = async () => {
        setLoading(true)
        await api()
            .get(`/degreeCategories`)
            .then((res) => setDegreeCategories(res.data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return {
        degreeCategories,
        getDegreeCategories,
        loading,
    }
}

export default useDegreeCategory
