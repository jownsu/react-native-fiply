import React, { useContext, useReducer, createContext } from 'react'
import AuthContext from '../auth/AuthContext'
import CommentReducer from './CommentReducer'

import api from '../../api'

const CommentContext = createContext()

export const CommentProvider = ({ children }) => {
    const { user } = useContext(AuthContext)

    const initialState = {
        comments: [],
        details: {},
        loading: false,
    }

    const [state, dispatch] = useReducer(CommentReducer, initialState)

    const getComments = async (postId) => {
        setLoading()
        await api({ token: user.token })
            .get(`/posts/${postId}/comments`)
            .then((res) => dispatch({ type: 'GET_COMMENTS', payload: res.data }))
            .catch((err) => console.log(err))
    }

    const createComment = async (comment = '') => {
        setLoading()
        await api({ token: user.token })
            .post(`/posts/${state.details.post_id}/comments`, { comment })
            .then((res) =>
                dispatch({ type: 'ADD_COMMENT', payload: { data: res.data.data, user } })
            )
            .catch((err) => console.log(err))
    }

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    const resetComments = () => dispatch({ type: 'RESET_COMMENT' })

    return (
        <CommentContext.Provider
            value={{
                ...state,
                getComments,
                resetComments,
                createComment,
            }}
        >
            {children}
        </CommentContext.Provider>
    )
}

export default CommentContext
