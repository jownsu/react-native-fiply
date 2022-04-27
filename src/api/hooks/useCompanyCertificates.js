import React, { useState, useContext } from 'react'
import AuthContext from '../context/auth/AuthContext'
import api from '../api'

const useCompanyCertificates = () => {
    const { user } = useContext(AuthContext)
    const [certificates, setCertificates] = useState([])
    const [loading, setLoading] = useState(false)

    const getCertificates = async () => {
        setLoading(true)
        await api()
            .get(`/companyCertificates`)
            .then((res) => setCertificates(res.data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return {
        certificates,
        loading,
        getCertificates,
    }
}

export default useCompanyCertificates
