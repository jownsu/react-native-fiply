import React, { useState, useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import api from '../api';

const useComment = () => {
    const { user } = useContext(AuthContext)
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState(0)

    const [loading, setLoading] = useState(false)
    
    const getComments = async(postId) => {
        setLoading(true)
        setPostId(postId)
        await api({token: user.token}).get(`/posts/${postId}/comments`)
            .then(res => setComments(res.data.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    const createComment = async(comment = '') => {
        setLoading(true)
        await api({token: user.token}).post(`/posts/${postId}/comments`, {comment})
            .then(res => setComments([...comments, {...res.data.data, commented_by: user.fullname, avatar: user.avatar}]))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    const resetComments = () => {
        setComments([])
        setPostId(0)
    }

    return { comments, getComments, resetComments, createComment ,loading };
};

export default useComment;
