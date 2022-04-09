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

        case 'UPDATE_AVATAR':
            return {
                ...state,
                userInfo: { ...state.userInfo, avatar: action.payload },
                loading: false,
            }

        case 'UPDATE_COVER':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    cover: action.payload,
                },
                loading: false,
            }

        case 'SET_TO_PENDING':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    is_following_pending: true,
                },
            }

        case 'SET_TO_FOLLOW':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    is_following_pending: false,
                    is_following: false,
                },
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
