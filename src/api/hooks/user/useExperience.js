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
            .then(res => {
              let data = res.data.data

              setExperiences(data)
              console.log(data) 

              // setExperiences({
              //   company: data.company,
              //   location: data.location,
              //   title: data.title,
              //   employment_type: data.employment_type,
              //   starting_date: data.starting_date,
              //   completion_date: data.completion_date,
              // })
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
  }

  return { getExperiences, experiences, loading };
};

export default useExperience;

