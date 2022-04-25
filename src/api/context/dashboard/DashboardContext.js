import React, { useContext, useReducer, createContext, useState } from 'react'
import AuthContext from '../auth/AuthContext'
import DashboardReducer from './DashboardReducer'

import api from '../../api'

const DashboardContext = createContext()

export const DashboardProvider = ({ children }) => {
    const { user } = useContext(AuthContext)

    const initialState = {
        loading: false,
    }
    const [state, dispatch] = useReducer(DashboardReducer, initialState)
    const [snackBarMessage, setSnackBarMessage] = useState(null)

    const setLoading = () => dispatch({ type: 'SET_LOADING' })

    const stopLoading = () => dispatch({ type: 'STOP_LOADING' })

    const hideSnackBar = () => setSnackBarMessage(null)

    return (
        <DashboardContext.Provider
            value={{
                ...state,
                snackBarMessage,
                hideSnackBar,
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
}

export default DashboardContext
