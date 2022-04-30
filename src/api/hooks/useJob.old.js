import React, { useState, useContext } from 'react'
import AuthContext from '../context/auth/AuthContext'
import api from '../api'

const useJob = () => {
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const createJob = async (data, onCreated = () => {}) => {
        setLoading(true)

        let fd = new FormData()

        if (data.image) {
            const imageUri = 'file:///' + data.image.split('file:/').join('')
            fd.append('image', {
                uri: imageUri,
                type: mime.getType(imageUri),
                name: imageUri.split('/').pop(),
            })
        }

        fd.append('title', data.title)
        fd.append('employment_type', data.employment_type)
        fd.append('position_level', data.position_level)
        fd.append('company', data.company)
        fd.append('location', data.location)
        fd.append('job_responsibilities', data.job_responsibilities)
        fd.append('qualifications', data.qualifications)

        await api({ token: user.token })
            .post('/jobs', fd)
            .then((res) => {
                console.log(res.data.data)
                onCreated()
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return {
        loading,
        createJob,
    }
}

export default useJob
