import React, { useState, useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import api from '../api';

const usePost = () => {
    const { user } = useContext(AuthContext)
    const [posts, setPosts] = useState([]);
    const [nextPath, setNextPath] = useState('')
    const [loading, setLoading] = useState(false)
    
    const getPosts = async(path = 'posts', userId = '') => {
        setLoading(true)
        await api({token: user.token}).get(`/${userId}${path}`)
            .then(res => {
                setPosts(res.data.data)
                setNextPath(res.data.links.next)
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    const morePosts = async() => {
        if(nextPath){
            setLoading(true)
            await api({token: user.token}).get(nextPath)
                .then(res => {
                    setPosts([...posts, ...res.data.data])
                    setNextPath(res.data.links.next)
                })
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
        }

    }

    return {posts, getPosts, morePosts, loading};
};

export default usePost;
