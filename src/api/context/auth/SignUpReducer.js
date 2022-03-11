const SignUpReducer = (state, action) => {
    switch (action.type) {
        case 'SET_BASIC_USER_INFO':
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
                password_confirmation: action.payload.password_confirmation,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                code: action.payload.code,
            }
        case 'SET_JOB_PREFERENCE':
            return {
                ...state,
                job_preference: { ...action.payload },
            }
        default:
            return state
    }
}

export default SignUpReducer
