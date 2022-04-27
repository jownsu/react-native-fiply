import React, { useState, useContext } from 'react'
import AuthContext from '../context/auth/AuthContext'
import api from '../api'

const useEmploymentType = () => {
    const { user } = useContext(AuthContext)
    const [employmentTypes, setEmploymentTypes] = useState([])
    const [loading, setLoading] = useState(false)

    const getEmploymentTypes = async (search = '') => {
        setLoading(true)
        await api()
            .get(`/employmentTypes?search=${search}`)
            .then((res) => setEmploymentTypes(res.data.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return {
        employmentTypes,
        loading,
        getEmploymentTypes,
    }
}

export default useEmploymentType
