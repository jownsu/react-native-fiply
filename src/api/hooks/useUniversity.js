import React, { useState, useContext } from 'react'
import AuthContext from '../context/auth/AuthContext'
import api from '../api'

const useUniversity = () => {
    const { user } = useContext(AuthContext)
    const [universities, setUniversities] = useState([])
    const [loading, setLoading] = useState(false)

    const getUniversities = async () => {
        setLoading(true)
        await api()
            .get(`/universities`)
            .then((res) => setUniversities(res.data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return {
        universities,
        loading,
        getUniversities,
    }
}

export default useUniversity
