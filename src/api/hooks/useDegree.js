import React, { useState, useContext } from 'react'
import AuthContext from '../context/auth/AuthContext'
import api from '../api'

const useDegree = () => {
    const { user } = useContext(AuthContext)
    const [degrees, setDegrees] = useState([])
    const [loading, setLoading] = useState(false)

    const getDegrees = async (search = '') => {
        setLoading(true)
        await api({ token: user.token })
            .get(`/degrees?limit=5&search=${search}`)
            .then((res) => setDegrees(res.data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return {
        degrees,
        loading,
        getDegrees,
    }
}

export default useDegree
