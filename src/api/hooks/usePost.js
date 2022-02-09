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

    const morePosts = async(reset = false) => {
        if(nextPath){
            setLoading(true)
            await api({token: user.token}).get(nextPath)
                .then(res => {
                    reset 
                        ? setPosts(res.data.data)
                        : setPosts([...posts, ...res.data.data])
                    setNextPath(res.data.links.next)
                })
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
        }
    }

    const createPost = async(content = '', image = null) => {
        setLoading(true)
        await api({token: user.token}).post('/posts', {content, image})
            .then(res => setPosts([res.data.data, ...posts]))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    const updatePost = async(id, data) => {
        setLoading(true)
        await api({token: user.token}).post(`/posts/${id}`, {...data, _method: 'PUT'})
            .then(res => {
                setPosts(posts.map(item => {
                    if(item.id == res.data.data.id){
                        return {...item, ...res.data.data}
                    }
                    return item
                }))
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    const deletePost = async(id) => {
        setLoading(true)
        await api({token: user.token}).delete(`/posts/${id}`)
            .then(res => {
                console.log(res.data.data)
                setPosts(posts.filter(item => item.id != id))
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    


    return {posts, getPosts, morePosts, createPost, updatePost, deletePost, loading};
};

export default usePost;
