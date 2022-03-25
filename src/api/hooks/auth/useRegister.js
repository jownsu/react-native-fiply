import React, { useState, useContext } from 'react'
import AuthContext from '../../context/auth/AuthContext'
import api from '../../api'
import mime from 'mime'

const useRegister = () => {
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const config = {
        onUploadProgress: function (progressEvent) {
            const { loaded, total } = progressEvent

            let percent = Math.floor((loaded * 100) / total)

            console.log(percent)
        },
    }

    const createExperience = async (data) => {
        setLoading(true)
        await api({ token: user.token })
            .post(`/experiences`, data)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    const createEducationalBackground = async (data) => {
        setLoading()
        await api({ token: user.token })
            .post(`/educationalBackgrounds`, data)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    const uploadResume = async (doc) => {
        setLoading(true)

        let fd = new FormData()

        fd.append('resume', {
            uri: doc,
            type: mime.getType(doc),
            name: doc.split('/').pop(),
        })

        fd.append('_method', 'PUT')

        await api({ token: user.token })
            .post('/uploadResume', fd, config)
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return {
        createExperience,
        createEducationalBackground,
        uploadResume,
        loading,
    }
}

export default useRegister
