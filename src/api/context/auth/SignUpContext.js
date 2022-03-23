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
        birthday: '',
        language: '',
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
            birthday: state.birthday,
            language: state.language,
            code: state.code,
        }
    }

    const setUserInfo1 = (data) => dispatch({ type: 'SET_USER_INFO_1', payload: data })

    const setUserInfo2 = (data) => dispatch({ type: 'SET_USER_INFO_2', payload: data })

    const getJobPreference = () => {
        return { job_preference: state.job_preference }
    }

    const setJobPreference = (data) => dispatch({ type: 'SET_JOB_PREFERENCE', payload: data })

    return (
        <SignUpContext.Provider
            value={{
                ...state,
                setUserInfo1,
                setUserInfo2,
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
