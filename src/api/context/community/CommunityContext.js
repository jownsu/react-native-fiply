import React, { useContext, useReducer, createContext, useState } from 'react'
import AuthContext from '../auth/AuthContext'
import CommunityReducer from './CommunityReducer'

import api from '../../api'

const CommunityContext = createContext()

export const CommunityProvider = ({ children }) => {
    const { user } = useContext(AuthContext)

    const initialState = {
        users: {
            data: [],
            links: {
                next: '',
            },
            meta: {
                total: 0,
            },
        },
        followedUsers: {
            data: [],
            links: {
                next: '',
            },
            meta: {
                total: 0,
            },
        },
        followerRequests: {
            data: [],
            links: {
                next: '',
            },
            meta: {
                total: 0,
            },
        },
        pendingRequests: {
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
    const [state, dispatch] = useReducer(CommunityReducer, initialState)
    const [snackBarMessage, setSnackBarMessage] = useState(null)

    const getUsers = async ($q = '') => {
        setLoading()
        await api({ token: user.token })
            .get(`/users${$q}`)
            .then((res) => dispatch({ type: 'GET_USERS', payload: res.data }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const searchUsers = async (search = '') => {
        setLoading()
        await api({ token: user.token })
            .get(`/users?search=${search}`)
            .then((res) => dispatch({ type: 'GET_USERS', payload: res.data }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const moreUsers = async (reset = false) => {
        if (state.users.links.next) {
            setLoading()
            await api({ token: user.token })
                .get(state.users.links.next)
                .then((res) => {
                    reset
                        ? dispatch({ type: 'GET_USERS', payload: res.data })
                        : dispatch({ type: 'MORE_USERS', payload: res.data })
                })
                .catch((err) => console.log(err))
                .finally(() => stopLoading())
        }
    }

    const getFollowedUsers = async () => {
        setLoading()
        await api({ token: user.token })
            .get('/me/following')
            .then((res) => dispatch({ type: 'GET_FOLLOWED_USERS', payload: res.data }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const moreFollowedUsers = async (reset = false) => {
        if (state.followedUsers.links.next) {
            setLoading()
            await api({ token: user.token })
                .get(state.followedUsers.links.next)
                .then((res) => {
                    reset
                        ? dispatch({ type: 'GET_FOLLOWED_USERS', payload: res.data })
                        : dispatch({ type: 'MORE_FOLLOWED_USERS', payload: res.data })
                })
                .catch((err) => console.log(err))
                .finally(() => stopLoading())
        }
    }

    const getFollowerRequests = async () => {
        setLoading()
        await api({ token: user.token })
            .get('/me/followerRequests')
            .then((res) => dispatch({ type: 'GET_FOLLOWER_REQUESTS', payload: res.data }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const moreFollowerRequests = async (reset = false) => {
        if (state.followerRequests.links.next) {
            setLoading()
            await api({ token: user.token })
                .get(state.followerRequests.links.next)
                .then((res) => {
                    console.log(res)
                    reset
                        ? dispatch({ type: 'GET_FOLLOWER_REQUESTS', payload: res.data })
                        : dispatch({ type: 'MORE_FOLLOWER_REQUESTS', payload: res.data })
                })
                .catch((err) => console.log(err))
                .finally(() => stopLoading())
        }
    }

    const getPendingRequests = async () => {
        setLoading()
        await api({ token: user.token })
            .get('/me/followPendings')
            .then((res) => dispatch({ type: 'GET_PENDING_REQUESTS', payload: res.data }))
            .catch((err) => console.log(err))
            .finally(() => stopLoading())
    }

    const morePendingRequests = async (reset = false) => {
        if (state.pendingRequests.links.next) {
            setLoading()
            await api({ token: user.token })
                .get(state.pendingRequests.links.next)
                .then((res) => {
                    console.log(res)
                    reset
                        ? dispatch({ type: 'GET_PENDING_REQUESTS', payload: res.data })
                        : dispatch({ type: 'MORE_PENDING_REQUESTS', payload: res.data })
                })
                .catch((err) => console.log(err))
                .finally(() => stopLoading())
        }
    }

    const acceptFollower = async (id) => {
        await api({ token: user.token })
            .post('/acceptFollowRequest', { user_id: id })
            .then((res) => {
                dispatch({ type: 'REMOVE_FOLLOWER_REQUEST', payload: id })
                setSnackBarMessage(res.data.message)
            })
            .catch((err) => setSnackBarMessage(err.message))
            .finally(() => stopLoading())
    }

    const follow = async (id) => {
        await api({ token: user.token })
            .post('/follow', { user_id: id })
            .then((res) => {
                if (res.data.data) {
                    dispatch({ type: 'REMOVE_USER', payload: id })
                }
                setSnackBarMessage(res.data.message)
            })
            .catch((err) => setSnackBarMessage(err.message))
            .finally(() => stopLoading())
    }

    const unFollow = async (id) => {
        await api({ token: user.token })
            .post('/unFollow', { user_id: id })
            .then((res) => {
                if (res.data.data) {
                    dispatch({ type: 'REMOVE_PENDING_REQUEST', payload: id })
                }
                setSnackBarMessage(res.data.message)
            })
            .catch((err) => setSnackBarMessage(err.message))
            .finally(() => stopLoading())
    }

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    const stopLoading = () => dispatch({ type: 'STOP_LOADING' })

    const hideSnackBar = () => setSnackBarMessage(null)

    return (
        <CommunityContext.Provider
            value={{
                ...state,
                getUsers,
                moreUsers,
                searchUsers,
                getFollowedUsers,
                moreFollowedUsers,
                getFollowerRequests,
                moreFollowerRequests,
                acceptFollower,
                getPendingRequests,
                morePendingRequests,
                follow,
                unFollow,
                snackBarMessage,
                hideSnackBar,
            }}
        >
            {children}
        </CommunityContext.Provider>
    )
}

export default CommunityContext
