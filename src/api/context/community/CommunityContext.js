import React, { useContext, useReducer, createContext } from 'react'
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
        loading: false,
    }
    const [state, dispatch] = useReducer(CommunityReducer, initialState)

    const getUsers = async () => {
        setLoading()
        await api({ token: user.token })
            .get('/users')
            .then((res) => dispatch({ type: 'GET_USERS', payload: res.data }))
            .catch((err) => console.log(err))
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
        }
    }

    const getFollowedUsers = async () => {
        setLoading()
        await api({ token: user.token })
            .get('/me/following')
            .then((res) => dispatch({ type: 'GET_FOLLOWED_USERS', payload: res.data }))
            .catch((err) => console.log(err))
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
        }
    }

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    return (
        <CommunityContext.Provider
            value={{
                ...state,
                getUsers,
                moreUsers,
                getFollowedUsers,
                moreFollowedUsers,
            }}
        >
            {children}
        </CommunityContext.Provider>
    )
}

export default CommunityContext
