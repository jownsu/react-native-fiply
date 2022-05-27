import React, { useState, useContext, useReducer, createContext } from 'react'
import AuthContext from '../auth/AuthContext'
import { Alert } from 'react-native'
import api from '../../api'
import mime from 'mime'
import PostReducer from './PostReducer'
import { CommentProvider } from '../comments/CommentContext'

const PostContext = createContext()

export const PostProvider = ({ children }) => {
    const { user } = useContext(AuthContext)

    const initialState = {
        posts: {
            data: [],
            links: {
                next: '',
            },
            meta: {
                total: 0,
            },
        },
        upVotes: {
            data: [],
            links: {
                next: '',
            },
            meta: {
                total: 0,
            },
        },
        loading: false,
    }
    const [state, dispatch] = useReducer(PostReducer, initialState)
    const [snackBarMessage, setSnackBarMessage] = useState(null)

    const getPosts = async (path = 'posts', userId = '') => {
        setLoading()
        await api({ token: user.token })
            .get(`/${userId}${path}`)
            .then((res) => {
                dispatch({ type: 'RESET_POSTS' })
                dispatch({ type: 'GET_POSTS', payload: res.data })
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const morePosts = async (reset = false) => {
        if (state.posts.links.next) {
            setLoading()
            await api({ token: user.token })
                .get(state.posts.links.next)
                .then((res) => {
                    reset
                        ? dispatch({ type: 'GET_POSTS', payload: res.data })
                        : dispatch({ type: 'MORE_POSTS', payload: res.data })
                })
                .catch((err) => console.log(err))
                .finally(() => stopLoading())
        }
    }

    const createPost = async (postData, callback = () => {}) => {
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
        fd.append('is_public', postData.is_public ? 1 : 0)

        await api({ token: user.token })
            .post('/posts', fd)
            .then((res) => {
                dispatch({ type: 'ADD_POST', payload: res.data.data })
                callback()
                setSnackBarMessage('Posted')
            })
            .catch((err) => {
                if (err.message) {
                    Alert.alert('Not Available', err.message)
                }
            })
            .finally(() => stopLoading())
    }

    const updatePost = async (id, postData, callback = () => {}) => {
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
        fd.append('is_public', postData.is_public ? 1 : 0)
        fd.append('_method', 'PUT')

        await api({ token: user.token })
            .post(`/posts/${id}`, fd)
            .then((res) => {
                dispatch({ type: 'UPDATE_POST', payload: res.data.data })
                callback()
                setSnackBarMessage('Post Updated')
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const deletePost = async (id) => {
        setLoading()
        await api({ token: user.token })
            .delete(`/posts/${id}`)
            .then((res) => {
                dispatch({ type: 'DELETE_POST', payload: id })
                setSnackBarMessage('Post Deleted')
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const savePost = async (id, action = 'save') => {
        setLoading()
        await api({ token: user.token })
            .post(`/posts/${action}`, { post_id: id })
            .then((res) => {
                if (action == 'save') {
                    let message = res.data.data
                        ? 'Post has been saved'
                        : 'Post did not save because it is already saved'
                    setSnackBarMessage(message)
                }

                if (action == 'unSave') {
                    let message = res.data.data
                        ? 'Post has been removed'
                        : 'Post did not removed because it is not saved'
                    dispatch({ type: 'DELETE_POST', payload: id })
                    setSnackBarMessage(message)
                }
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    //UPVOTES

    const toggleUpVote = async (id) => {
        setLoading()
        await api({ token: user.token })
            .post(`/posts/upVote`, { post_id: id })
            .then((res) =>
                dispatch({ type: 'TOGGLE_UPVOTE', payload: { id, data: res.data.data } })
            )
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const getUpVotes = async (id) => {
        setLoading()
        await api({ token: user.token })
            .get(`/posts/${id}/upVotes`)
            .then((res) => {
                dispatch({ type: 'RESET_UPVOTES' })
                dispatch({ type: 'GET_UPVOTES', payload: res.data })
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const moreUpVotes = async (reset = false) => {
        if (state.upVotes.links.next) {
            setLoading()
            await api({ token: user.token })
                .get(state.upVotes.links.next)
                .then((res) => {
                    reset
                        ? dispatch({ type: 'GET_UPVOTES', payload: res.data })
                        : dispatch({ type: 'MORE_UPVOTES', payload: res.data })
                })
                .catch((err) => console.log(err))
                .finally(() => stopLoading())
        }
    }

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    const stopLoading = () => dispatch({ type: 'STOP_LOADING' })

    const hideSnackBar = () => setSnackBarMessage(null)

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
                savePost,
                getUpVotes,
                moreUpVotes,
                snackBarMessage,
                hideSnackBar,
            }}
        >
            <CommentProvider>{children}</CommentProvider>
        </PostContext.Provider>
    )
}

export default PostContext
