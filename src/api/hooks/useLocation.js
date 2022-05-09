import React, { useState, useContext } from 'react'
import AuthContext from '../context/auth/AuthContext'
import api from '../api'

const useLocation = () => {
    const { user } = useContext(AuthContext)
    const [locations, setLocations] = useState([])
    const [loading, setLoading] = useState(false)

    const getLocations = async () => {
        setLoading(true)
        await api()
            .get(`/locations`)
            .then((res) => setLocations(res.data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return {
        locations,
        loading,
        getLocations,
    }
}

export default useLocation
