const ProfileReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USER_INFO':
            return {
                ...state,
                userInfo: action.payload,
                loading: false,
            }

        case 'UPDATE_PROFILE':
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

        case 'ADD_EXPERIENCE':
            return {
                ...state,
                experiences: [...state.experiences, action.payload],
                loading: false,
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
                loading: false,
            }

        case 'DELETE_EXPERIENCE':
            return {
                ...state,
                experiences: [...state.experiences.filter((item) => item.id != action.payload)],
                loading: false,
            }

        case 'GET_EDUCATIONAL_BACKGROUNDS':
            return {
                ...state,
                educationalBackgrounds: action.payload,
                loading: false,
            }

        case 'ADD_EDUCATIONAL_BACKGROUND':
            return {
                ...state,
                educationalBackgrounds: [...state.educationalBackgrounds, action.payload],
                loading: false,
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
                loading: false,
            }

        case 'DELETE_EDUCATIONAL_BACKGROUND':
            return {
                ...state,
                educationalBackgrounds: [
                    ...state.educationalBackgrounds.filter((item) => item.id != action.payload),
                ],
                loading: false,
            }

        case 'GET_JOB_PREFERENCE':
            return {
                ...state,
                jobPreference: action.payload,
                loading: false,
            }

        case 'UPDATE_JOB_PREFERENCE':
            return {
                ...state,
                jobPreference: action.payload,
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
                loading: false,
            }

        case 'SET_TO_FOLLOW':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    is_following_pending: false,
                    is_following: false,
                },
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
