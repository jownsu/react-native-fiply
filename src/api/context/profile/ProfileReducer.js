const ProfileReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USER_INFO':
            return {
                ...state,
                userInfo: action.payload,
                loading: false,
            }

        case 'GET_EXPERIENCES':
            return {
                ...state,
                experiences: action.payload,
                loading: false,
            }

        case 'GET_EDUCATIONAL_BACKGROUNDS':
            return {
                ...state,
                educationalBackgrounds: action.payload,
                loading: false,
            }

        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }
}

export default ProfileReducer
