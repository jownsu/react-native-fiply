import React, { useState, useContext } from 'react'
import { AuthContext } from '../../../providers/AuthProvider'
import api from '../../api'

const useEducationalBackground = () => {
  const { user } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [educationalBackgrounds, setEducationalBackgrounds] = useState([])

  const getEducationalBackgrounds = async() => {
    setLoading(true)
    await api({token: user.token}).get('/users/educationalBackgrounds')
            .then(res => setEducationalBackgrounds(res.data.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
  }

  return { getEducationalBackgrounds, educationalBackgrounds, loading };
};

export default useEducationalBackground;

