import React, { useState, useContext, useReducer, createContext } from 'react'
import AuthContext from '../auth/AuthContext'
import api from '../../api'
import FollowReducer from './FollowReducer'

const FollowContext = createContext()

export const FollowProvider = ({ children }) => {
    const { user } = useContext(AuthContext)

    const initialState = {
        followers: {
            data: [],
            links: {
                next: '',
            },
            meta: {
                total: 0,
            },
        },
        following: {
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

    const [state, dispatch] = useReducer(FollowReducer, initialState)
    const [snackBarMessage, setSnackBarMessage] = useState(null)

    const getFollowers = async (id = 'me', search = '') => {
        setLoading()
        let searchQuery = ''
        if (search != '') {
            searchQuery = `?search=${search}`
        }

        await api({ token: user.token })
            .get(`/${id}/followers${searchQuery}`)
            .then((res) => {
                dispatch({ type: 'GET_FOLLOWERS', payload: res.data })
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const moreFollowers = async (reset = false) => {
        if (state.followers.links.next) {
            setLoading()
            await api({ token: user.token })
                .get(state.followers.links.next)
                .then((res) => {
                    reset
                        ? dispatch({ type: 'GET_FOLLOWERS', payload: res.data })
                        : dispatch({ type: 'MORE_FOLLOWERS', payload: res.data })
                })
                .catch((err) => console.log(err))
                .finally(() => stopLoading())
        }
    }

    const getFollowing = async (id = 'me', search = '') => {
        setLoading()
        let searchQuery = ''
        if (search != '') {
            searchQuery = `?search=${search}`
        }
        await api({ token: user.token })
            .get(`/${id}/following${searchQuery}`)
            .then((res) => {
                dispatch({ type: 'GET_FOLLOWING', payload: res.data })
            })
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const moreFollowing = async (reset = false) => {
        if (state.following.links.next) {
            setLoading()
            await api({ token: user.token })
                .get(state.following.links.next)
                .then((res) => {
                    reset
                        ? dispatch({ type: 'GET_FOLLOWING', payload: res.data })
                        : dispatch({ type: 'MORE_FOLLOWING', payload: res.data })
                })
                .catch((err) => console.log(err))
                .finally(() => stopLoading())
        }
    }

    const follow = async (id, type = 'followingItem') => {
        await api({ token: user.token })
            .post('/follow', { user_id: id })
            .then((res) => {
                if (res.data.data) {
                    type == 'followingItem'
                        ? dispatch({ type: 'SET_TO_PENDING_FROM_FOLLOWING_ITEM', payload: id })
                        : dispatch({ type: 'SET_TO_PENDING_FROM_FOLLOWER_ITEM', payload: id })
                }
                setSnackBarMessage(res.data.message)
            })
            .catch((err) => setSnackBarMessage(err.message))
            .finally(() => stopLoading())
    }

    const unFollow = async (id, is_me = false, type = 'followingItem') => {
        await api({ token: user.token })
            .post('/unFollow', { user_id: id })
            .then((res) => {
                if (res.data.data) {
                    if (is_me) {
                        dispatch({ type: 'REMOVE_FOLLOWING', payload: id })
                    } else {
                        type == 'followingItem'
                            ? dispatch({ type: 'SET_TO_FOLLOW_FROM_FOLLOWING_ITEM', payload: id })
                            : dispatch({ type: 'SET_TO_FOLLOW_FROM_FOLLOWER_ITEM', payload: id })
                    }
                }
                setSnackBarMessage(res.data.message)
            })
            .catch((err) => setSnackBarMessage(err.message))
            .finally(() => stopLoading())
    }

    const cancelFollowRequest = async (id, type = 'followingItem') => {
        await api({ token: user.token })
            .post('/unFollow', { user_id: id })
            .then((res) => {
                if (res.data.data) {
                    type == 'followingItem'
                        ? dispatch({ type: 'SET_TO_FOLLOW_FROM_FOLLOWING_ITEM', payload: id })
                        : dispatch({ type: 'SET_TO_FOLLOW_FROM_FOLLOWER_ITEM', payload: id })
                    setSnackBarMessage('Cancelled follow request')
                }
            })
            .catch((err) => setSnackBarMessage(err.message))
            .finally(() => stopLoading())
    }

    const removeFollower = async (id) => {
        await api({ token: user.token })
            .post('/removeFollower', { user_id: id })
            .then((res) => {
                if (res.data.data) {
                    dispatch({ type: 'REMOVE_FOLLOWER', payload: id })
                }
                setSnackBarMessage(res.data.message)
            })
            .catch((err) => setSnackBarMessage(err.message))
            .finally(() => stopLoading())
    }

    const hideSnackBar = () => setSnackBarMessage(null)

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    const stopLoading = () => dispatch({ type: 'STOP_LOADING' })

    return (
        <FollowContext.Provider
            value={{
                ...state,
                getFollowers,
                moreFollowers,
                getFollowing,
                moreFollowing,
                unFollow,
                follow,
                removeFollower,
                cancelFollowRequest,
                hideSnackBar,
                snackBarMessage,
            }}
        >
            {children}
        </FollowContext.Provider>
    )
}

export default FollowContext
