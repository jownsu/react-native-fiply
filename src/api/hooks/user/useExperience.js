import React, { useState, useContext } from 'react'
import { AuthContext } from '../../../providers/AuthProvider'
import api from '../../api'

const useExperience = () => {
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [experiences, setExperiences] = useState([])

  const getExperiences = async() => {
    setLoading(true)
    await api({token: user.token}).get('/users/experiences')
            .then(res => setExperiences(res.data.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
  }

  return { getExperiences, experiences, loading };
};

export default useExperience;

