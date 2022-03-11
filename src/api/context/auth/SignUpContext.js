import React, { useReducer, createContext } from 'react'
import SignUpReducer from './SignUpReducer'

const SignUpContext = createContext()

export const SignUpProvider = ({ children }) => {
    const initialState = {
        email: '',
        password: '',
        password_confirmation: '',
        firstname: '',
        lastname: '',
        job_preference: {},
    }

    const [state, dispatch] = useReducer(SignUpReducer, initialState)

    const getAllSignUpData = () => {
        return {
            ...state,
        }
    }

    const getBasicUserInfo = () => {
        return {
            email: state.email,
            password: state.password,
            password_confirmation: state.password_confirmation,
            firstname: state.firstname,
            lastname: state.lastname,
            code: state.code,
        }
    }

    const setBasicUserInfo = (data) => dispatch({ type: 'SET_BASIC_USER_INFO', payload: data })

    const getJobPreference = () => {
        return { job_preference: state.job_preference }
    }

    const setJobPreference = (data) => dispatch({ type: 'SET_JOB_PREFERENCE', payload: data })

    return (
        <SignUpContext.Provider
            value={{
                ...state,
                setBasicUserInfo,
                setJobPreference,
                getBasicUserInfo,
                getJobPreference,
                getAllSignUpData,
            }}
        >
            {children}
        </SignUpContext.Provider>
    )
}

export default SignUpContext
