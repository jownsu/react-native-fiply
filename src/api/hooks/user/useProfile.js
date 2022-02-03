import React, { useState, useContext } from 'react'
import { AuthContext } from '../../../providers/AuthProvider'
import * as SecureStore from 'expo-secure-store'
import api from '../../api'


const useProfile = () => {
    const { user, setUser } = useContext(AuthContext)
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState({})
    const [basicInfo, setBasicInfo] = useState({})
    const [contactInfo, setContactInfo] = useState({})    
    

    const getUserInfo = async() => {
        setLoading(true)
        await api({token: user.token}).get('/users')
            .then(res => {
              let profileData = res.data.data
              let userData = {
                id          : profileData.id,
                fullname    : profileData.fullname,
                status      : profileData.status,
                description : profileData.description,
                avatar      : profileData.avatar,
              }
              setUser({...user, ...userData});

              setProfile({
                  fullname: profileData.fullname,
                  email: profileData.email,
                  location: profileData.location,
                  status: profileData.status,
                  description: profileData.description,
                  avatar: profileData.avatar
              })

              setBasicInfo({
                  gender: profileData.gender,
                  age: profileData.age,
                  birthday: profileData.birthday,
                  language: profileData.language,
                  status: profileData.status
              })

              setContactInfo({
                mobile_no: profileData.mobile_no,
                telephone_no: profileData.telephone_no,
                email: profileData.email,
                website: profileData.website,
              })
            })
            .catch(err => console.log(err)) 
            .finally(() => setLoading(false))
    }

  return { getUserInfo, profile, basicInfo, contactInfo, loading }
};

export default useProfile;
