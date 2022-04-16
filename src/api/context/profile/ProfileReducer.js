const ProfileReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USER_INFO':
            return {
                ...state,
                userInfo: action.payload,
            }

        case 'UPDATE_PROFILE':
            return {
                ...state,
                userInfo: { ...state.userInfo, ...action.payload },
            }

        case 'GET_EXPERIENCES':
            return {
                ...state,
                experiences: action.payload,
            }

        case 'ADD_EXPERIENCE':
            return {
                ...state,
                experiences: [...state.experiences, action.payload],
            }

        case 'UPDATE_EXPERIENCE':
            return {
                ...state,
                experiences: [
                    ...state.experiences.map((item) => {
                        if (item.id == action.payload.id) {
                            return { ...item, ...action.payload }
                        }
                        return item
                    }),
                ],
            }

        case 'DELETE_EXPERIENCE':
            return {
                ...state,
                experiences: [...state.experiences.filter((item) => item.id != action.payload)],
            }

        case 'GET_EDUCATIONAL_BACKGROUNDS':
            return {
                ...state,
                educationalBackgrounds: action.payload,
            }

        case 'ADD_EDUCATIONAL_BACKGROUND':
            return {
                ...state,
                educationalBackgrounds: [...state.educationalBackgrounds, action.payload],
            }

        case 'UPDATE_EDUCATIONAL_BACKGROUND':
            return {
                ...state,
                educationalBackgrounds: [
                    ...state.educationalBackgrounds.map((item) => {
                        if (item.id == action.payload.id) {
                            return { ...item, ...action.payload }
                        }
                        return item
                    }),
                ],
            }

        case 'DELETE_EDUCATIONAL_BACKGROUND':
            return {
                ...state,
                educationalBackgrounds: [
                    ...state.educationalBackgrounds.filter((item) => item.id != action.payload),
                ],
            }

        case 'GET_JOB_PREFERENCE':
            return {
                ...state,
                jobPreference: action.payload,
            }

        case 'UPDATE_JOB_PREFERENCE':
            return {
                ...state,
                jobPreference: action.payload,
            }

        case 'UPDATE_AVATAR':
            return {
                ...state,
                userInfo: { ...state.userInfo, avatar: action.payload },
            }

        case 'UPDATE_COVER':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    cover: action.payload,
                },
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

        case 'SET_AUDIENCE':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    is_public: action.payload,
                },
            }

        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            }

        case 'STOP_LOADING':
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}

export default ProfileReducer
