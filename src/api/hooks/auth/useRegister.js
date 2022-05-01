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

    const createExperience = async (data, onCreate = () => {}) => {
        setLoading(true)
        await api({ token: user.token })
            .post(`/me/experiences`, data)
            .then((res) => onCreate())
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    const createEducationalBackground = async (data, onCreate = () => {}) => {
        setLoading()
        await api({ token: user.token })
            .post(`/me/educationalBackgrounds`, data)
            .then((res) => onCreate())
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

    const uploadCompanyValidIds = async (uploadData, onUpload = () => {}) => {
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
            .post('/uploadCompanyId', fd, config)
            .then(() => onUpload())
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    const uploadCompanyCertificate = async (uploadData, onUpload = () => {}) => {
        setLoading(true)

        let fd = new FormData()

        fd.append('certificate_image', {
            uri: uploadData.certificate_image,
            type: mime.getType(uploadData.certificate_image),
            name: uploadData.certificate_image.split('/').pop(),
        })
        fd.append('certificate', uploadData.certificate)

        fd.append('_method', 'PUT')

        await api({ token: user.token })
            .post('/uploadCertificate', fd, config)
            .then(() => onUpload())
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    const createHiringManager = async (data, onCreate = () => {}) => {
        setLoading(true)
        let fd = new FormData()

        if (data.avatar) {
            fd.append('avatar', {
                uri: data.avatar,
                type: mime.getType(data.avatar),
                name: data.avatar.split('/').pop(),
            })
        }

        fd.append('firstname', data.firstname)
        fd.append('lastname', data.lastname)
        fd.append('email', data.email)
        fd.append('contact_no', data.contact_no)
        fd.append('code', data.code)
        await api({
            token: user.token,
            hiring_token: user.companyToken,
            hiring_id: user.company,
        })
            .post(`/hiringManagers`, fd)
            .then((res) => onCreate())
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return {
        createExperience,
        createEducationalBackground,
        uploadResume,
        uploadValidIds,
        uploadCompanyValidIds,
        uploadCompanyCertificate,
        createHiringManager,
        loading,
    }
}

export default useRegister
