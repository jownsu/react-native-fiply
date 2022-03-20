const SignUpReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER_INFO_1':
            return {
                ...state,
                email: action.payload.email,
                password: action.payload.password,
                password_confirmation: action.payload.password_confirmation,
            }
        case 'SET_USER_INFO_2':
            return {
                ...state,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                birthday: action.payload.birthday,
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
