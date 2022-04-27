import React, { useState, useContext } from 'react'
import AuthContext from '../context/auth/AuthContext'
import api from '../api'

const useValidIDs = () => {
    const { user } = useContext(AuthContext)
    const [validIds, setValidIds] = useState([])
    const [loading, setLoading] = useState(false)

    const getValidIds = async () => {
        setLoading(true)
        await api()
            .get(`/validIds`)
            .then((res) => setValidIds(res.data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return {
        validIds,
        loading,
        getValidIds,
    }
}

export default useValidIDs
