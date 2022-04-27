import React, { useState, useContext } from 'react'
import AuthContext from '../context/auth/AuthContext'
import api from '../api'

const usePositionLevel = () => {
    const { user } = useContext(AuthContext)
    const [positionLevels, setPositionLevels] = useState([])
    const [loading, setLoading] = useState(false)

    const getPositionLevels = async (search = '') => {
        setLoading(true)
        await api()
            .get(`/positionLevels?search=${search}`)
            .then((res) => setPositionLevels(res.data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return {
        positionLevels,
        loading,
        getPositionLevels,
    }
}

export default usePositionLevel
