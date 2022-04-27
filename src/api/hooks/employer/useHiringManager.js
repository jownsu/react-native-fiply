import React, { useState, useContext } from 'react'
import AuthContext from '../../context/auth/AuthContext'
import api from '../../api'

const useHiringManager = () => {
    const { user } = useContext(AuthContext)
    const [hiringManagers, setHiringManagers] = useState([])
    const [loading, setLoading] = useState(false)

    const getHiringManagers = async (search = '') => {
        setLoading(true)
        await api({ token: user.token })
            .get(`/me/hiringManagers`)
            .then((res) => setHiringManagers(res.data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return {
        hiringManagers,
        loading,
        getHiringManagers,
    }
}

export default useHiringManager
