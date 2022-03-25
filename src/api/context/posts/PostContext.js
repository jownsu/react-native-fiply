import React, { useState, useContext, useReducer, createContext } from 'react'
import AuthContext from '../auth/AuthContext'
import api from '../../api'
import mime from 'mime'
import PostReducer from './PostReducer'
import { CommentProvider } from '../comments/CommentContext'

const PostContext = createContext()

export const PostProvider = ({ children }) => {
    const { user } = useContext(AuthContext)

    const initialState = {
        posts: [],
        nextPath: '',
        loading: false,
    }
    const [state, dispatch] = useReducer(PostReducer, initialState)

    const getPosts = async (path = 'posts', userId = '') => {
        setLoading()
        await api({ token: user.token })
            .get(`/${userId}${path}`)
            .then((res) => dispatch({ type: 'GET_POSTS', payload: res.data }))
            .catch((err) => console.log(err))
    }

    const morePosts = async (reset = false) => {
        if (state.nextPath) {
            setLoading()
            await api({ token: user.token })
                .get(state.nextPath)
                .then((res) => {
                    reset
                        ? dispatch({ type: 'GET_POSTS', payload: res.data })
                        : dispatch({ type: 'MORE_POSTS', payload: res.data })
                })
                .catch((err) => console.log(err))
        }
    }

    const createPost = async (postData) => {
        //postData = content, image
        setLoading()
        let fd = new FormData()

        if (postData.image) {
            fd.append('image', {
                uri: postData.image,
                type: mime.getType(postData.image),
                name: postData.image.split('/').pop(),
            })
        }

        fd.append('content', postData.content)

        await api({ token: user.token })
            .post('/posts', fd)
            .then((res) => dispatch({ type: 'ADD_POST', payload: res.data.data }))
            .catch((err) => console.log(err))
    }

    const updatePost = async (id, postData) => {
        setLoading()
        const fd = new FormData()

        if (postData.image) {
            fd.append('image', {
                uri: postData.image,
                type: mime.getType(postData.image),
                name: postData.image.split('/').pop(),
            })
        }

        fd.append('content', postData.content)
        fd.append('_method', 'PUT')

        await api({ token: user.token })
            .post(`/posts/${id}`, fd)
            .then((res) => dispatch({ type: 'UPDATE_POST', payload: res.data.data }))
            .catch((err) => console.log(err))
    }

    const deletePost = async (id) => {
        setLoading()
        await api({ token: user.token })
            .delete(`/posts/${id}`)
            .then((res) => dispatch({ type: 'DELETE_POST', payload: id }))
            .catch((err) => console.log(err))
    }

    //UPVOTES

    const toggleUpVote = async (id) => {
        setLoading()
        await api({ token: user.token })
            .post(`/posts/${id}/upVotes`)
            .then((res) =>
                dispatch({ type: 'TOGGLE_UPVOTE', payload: { id, data: res.data.data } })
            )
            .catch((err) => console.log(err))
    }

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    return (
        <PostContext.Provider
            value={{
                ...state,
                getPosts,
                morePosts,
                createPost,
                updatePost,
                deletePost,
                toggleUpVote,
            }}
        >
            <CommentProvider>{children}</CommentProvider>
        </PostContext.Provider>
    )
}

export default PostContext
