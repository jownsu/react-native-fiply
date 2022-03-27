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

    const uploadResume = async (doc, onUpload = () => {}) => {
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
            .then(() => onUpload())
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    const uploadValidIds = async (uploadData, onUpload = () => {}) => {
        setLoading(true)

        let fd = new FormData()

        fd.append('valid_id_image_front', {
            uri: uploadData.front,
            type: mime.getType(uploadData.front),
            name: uploadData.front.split('/').pop(),
        })
        fd.append('valid_id_image_back', {
            uri: uploadData.back,
            type: mime.getType(uploadData.back),
            name: uploadData.back.split('/').pop(),
        })
        fd.append('valid_id', uploadData.valid_id)

        fd.append('_method', 'PUT')

        await api({ token: user.token })
            .post('/uploadValidId', fd, config)
            .then(() => onUpload())
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return {
        createExperience,
        createEducationalBackground,
        uploadResume,
        uploadValidIds,
        loading,
    }
}

export default useRegister
