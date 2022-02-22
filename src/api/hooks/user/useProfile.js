import React, { useState, useContext } from 'react'
import { AuthContext } from '../../../providers/AuthProvider'
import api from '../../api'

const useProfile = () => {
    const { user, setUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState({})
    const [basicInfo, setBasicInfo] = useState({})
    const [contactInfo, setContactInfo] = useState({})

    const getUserInfo = async (id = 'me') => {
        setLoading(true)
        await api({ token: user.token })
            .get(`/${id}`)
            .then((res) => {
                let profileData = res.data.data
                let userData = {
                    id: profileData.id,
                    fullname: profileData.fullname,
                    status: profileData.status,
                    description: profileData.description,
                    avatar: profileData.avatar,
                }

                if (id == 'me') setUser({ ...user, ...userData })

                setProfile({
                    fullname: profileData.fullname,
                    email: profileData.email,
                    location: profileData.location,
                    status: profileData.status ?? 'Not Verified',
                    description: profileData.description,
                    avatar: profileData.avatar,
                })

                setBasicInfo({
                    gender: profileData.gender ?? 'Nothing to show',
                    age: profileData.age ?? 'Nothing to show',
                    birthday: profileData.birthday ?? 'Nothing to show',
                    language: profileData.language ?? 'Nothing to show',
                    status: profileData.status ?? 'Nothing to show',
                })

                setContactInfo({
                    mobile_no: profileData.mobile_no ?? 'Nothing to show',
                    telephone_no: profileData.telephone_no ?? 'Nothing to show',
                    email: profileData.email ?? 'Nothing to show',
                    website: profileData.website ?? 'Nothing to show',
                })
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return { getUserInfo, profile, basicInfo, contactInfo, loading }
}

export default useProfile
