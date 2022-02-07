import React, { useState, useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import api from '../api';

const useComment = () => {
    const { user } = useContext(AuthContext)
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(false)
    
    const getComments = async(postId) => {
        setLoading(true)
        await api({token: user.token}).get(`/posts/${postId}/comments`)
            .then(res => setComments(res.data.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    const resetComments = () => setComments([])

    return { comments, getComments, resetComments, loading };
};

export default useComment;
