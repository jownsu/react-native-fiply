import React, { useReducer, createContext } from 'react'
import SignUpReducer from './SignUpReducer'

const SignUpContext = createContext()

export const SignUpProvider = ({ children }) => {
    const initialState = {
        email: '',
        password: '',
        password_confirmation: '',
        profile: {},
        company: {},
        job_preference: {},
        applicant_preference: {},
        experience: {},
        educational_background: {},
        document: {},
    }

    const [state, dispatch] = useReducer(SignUpReducer, initialState)

    const getAllSignUpData = () => {
        return {
            ...state,
        }
    }

    // const getBasicUserInfo = () => {
    //     return {
    //         email: state.email,
    //         password: state.password,
    //         password_confirmation: state.password_confirmation,
    //         firstname: state.firstname,
    //         lastname: state.lastname,
    //         birthday: state.birthday,
    //         language: state.language,
    //         code: state.code,
    //     }
    // }

    const setUserInfo = (data) => dispatch({ type: 'SET_USER_INFO', payload: data })

    const setProfile = (data) => dispatch({ type: 'SET_PROFILE', payload: data })

    const setCompany = (data) => dispatch({ type: 'SET_COMPANY', payload: data })

    // const getJobPreference = () => {
    //     return { job_preference: state.job_preference }
    // }

    const setJobPreference = (data) => dispatch({ type: 'SET_JOB_PREFERENCE', payload: data })

    const setApplicantPreference = (data) =>
        dispatch({ type: 'SET_APPLICANT_PREFERENCE', payload: data })

    const setExperience = (data) => dispatch({ type: 'SET_EXPERIENCE', payload: data })

    // const getExperience = () => {
    //     return state.experience
    // }

    const setEducationalBackground = (data) =>
        dispatch({ type: 'SET_EDUCATIONAL_BACKGROUND', payload: data })

    // const getEducationalBackground = () => {
    //     return state.educational_background
    // }

    return (
        <SignUpContext.Provider
            value={{
                ...state,
                setUserInfo,
                setProfile,
                setJobPreference,
                setApplicantPreference,
                setCompany,
                // getBasicUserInfo,
                // getJobPreference,
                getAllSignUpData,
                setExperience,
                // getExperience,
                setEducationalBackground,
                // getEducationalBackground,
            }}
        >
            {children}
        </SignUpContext.Provider>
    )
}

export default SignUpContext
