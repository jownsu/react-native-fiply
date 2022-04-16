import React, { useContext, useReducer, createContext } from 'react'
import AuthContext from '../auth/AuthContext'
import CommentReducer from './CommentReducer'

import api from '../../api'

const CommentContext = createContext()

export const CommentProvider = ({ children }) => {
    const { user } = useContext(AuthContext)

    const initialState = {
        comments: {
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

    const [state, dispatch] = useReducer(CommentReducer, initialState)

    const getComments = async (postId) => {
        setLoading()
        await api({ token: user.token })
            .get(`/posts/${postId}/comments`)
            .then((res) => {
                dispatch({ type: 'GET_COMMENTS', payload: res.data })
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const moreComments = async (reset = false) => {
        if (state.comments.links.next) {
            setLoading()
            await api({ token: user.token })
                .get(state.comments.links.next)
                .then((res) => {
                    reset
                        ? dispatch({ type: 'GET_COMMENTS', payload: res.data })
                        : dispatch({ type: 'MORE_COMMENTS', payload: res.data })
                })
                .catch((err) => console.log(err))
                .finally(() => stopLoading())
        }
    }

    const createComment = async (postId, comment = '') => {
        setLoading()
        await api({ token: user.token })
            .post(`/posts/${postId}/comments`, { comment })
            .then((res) =>
                dispatch({ type: 'ADD_COMMENT', payload: { data: res.data.data, user } })
            )
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const deleteComment = async (id) => {
        setLoading()
        await api({ token: user.token })
            .delete(`/comments/${id}`)
            .then((res) => dispatch({ type: 'DELETE_COMMENT', payload: id }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    const stopLoading = () => dispatch({ type: 'STOP_LOADING' })

    const resetComments = () => dispatch({ type: 'RESET_COMMENT' })

    return (
        <CommentContext.Provider
            value={{
                ...state,
                getComments,
                moreComments,
                resetComments,
                createComment,
                deleteComment,
            }}
        >
            {children}
        </CommentContext.Provider>
    )
}

export default CommentContext
