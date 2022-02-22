import React, { useState, useContext } from 'react'
import { AuthContext } from '../../providers/AuthProvider'
import api from '../api'
import mime from 'mime'

const usePost = () => {
    const { user } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [nextPath, setNextPath] = useState('')
    const [loading, setLoading] = useState(false)

    const getPosts = async (path = 'posts', userId = '') => {
        setLoading(true)
        await api({ token: user.token })
            .get(`/${userId}${path}`)
            .then((res) => {
                let data = res.data.data
                setPosts(data)
                setNextPath(res.data.links.next)
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    const morePosts = async (reset = false) => {
        if (nextPath) {
            setLoading(true)
            await api({ token: user.token })
                .get(nextPath)
                .then((res) => {
                    reset
                        ? setPosts(res.data.data)
                        : setPosts((prevPosts) => [
                              ...prevPosts,
                              ...res.data.data,
                          ])
                    setNextPath(res.data.links.next)
                })
                .catch((err) => console.log(err))
                .finally(() => setLoading(false))
        }
    }

    const createPost = async (postData) => {
        //postData = content, image
        setLoading(true)
        let fd = new FormData()

        if (postData.image) {
            const imageUri =
                'file:///' + postData.image.split('file:/').join('')
            fd.append('image', {
                uri: imageUri,
                type: mime.getType(imageUri),
                name: imageUri.split('/').pop(),
            })
        }

        fd.append('content', postData.content)

        await api({ token: user.token })
            .post('/posts', fd)
            .then((res) => setPosts([res.data.data, ...posts]))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    const updatePost = async (id, postData) => {
        setLoading(true)
        const fd = new FormData()

        if (postData.image) {
            const imageUri =
                'file:///' + postData.image.split('file:/').join('')
            fd.append('image', {
                uri: imageUri,
                type: mime.getType(imageUri),
                name: imageUri.split('/').pop(),
            })
        }

        fd.append('content', postData.content)
        fd.append('_method', 'PUT')

        await api({ token: user.token })
            .post(`/posts/${id}`, fd)
            .then((res) => {
                setPosts(
                    posts.map((item) => {
                        if (item.id == res.data.data.id) {
                            return { ...item, ...res.data.data }
                        }
                        return item
                    })
                )
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    const deletePost = async (id) => {
        setLoading(true)
        await api({ token: user.token })
            .delete(`/posts/${id}`)
            .then((res) => {
                console.log(res.data.data)
                setPosts(posts.filter((item) => item.id != id))
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    //UPVOTES

    const toggleUpVote = async (id) => {
        setLoading(true)
        await api({ token: user.token })
            .post(`/posts/${id}/upVotes`)
            .then((res) => {
                setPosts((prevPost) =>
                    prevPost.map((item) => {
                        if (item.id == id) {
                            return {
                                ...item,
                                is_upVoted: res.data.data,
                                upVotes_count: res.data.data
                                    ? item.upVotes_count + 1
                                    : item.upVotes_count - 1,
                            }
                        }
                        return item
                    })
                )
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    }

    return {
        posts,
        getPosts,
        morePosts,
        createPost,
        updatePost,
        deletePost,
        loading,
        setLoading,
        toggleUpVote,
    }
}

export default usePost
