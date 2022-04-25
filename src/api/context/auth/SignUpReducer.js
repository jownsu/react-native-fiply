const SignUpReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
                password_confirmation: action.payload.password_confirmation,
            }
        case 'SET_PROFILE':
            return {
                ...state,
                profile: {
                    ...action.payload,
                },
            }

        case 'SET_COMPANY':
            return {
                ...state,
                company: {
                    ...action.payload,
                },
            }
        case 'SET_JOB_PREFERENCE':
            return {
                ...state,
                job_preference: { ...action.payload },
            }
        case 'SET_APPLICANT_PREFERENCE':
            return {
                ...state,
                applicant_preference: { ...action.payload },
            }
        case 'SET_EXPERIENCE':
            return {
                ...state,
                experience: { ...action.payload },
            }
        case 'SET_EDUCATIONAL_BACKGROUND':
            return {
                ...state,
                educational_background: { ...action.payload },
            }
        default:
            return state
    }
}

export default SignUpReducer
